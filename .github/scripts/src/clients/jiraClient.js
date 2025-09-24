let cachedConfig = null;

function getConfig() {
  if (cachedConfig) return cachedConfig;
  const host = process.env.JIRA_HOST; // e.g. https://your-domain.atlassian.net
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;

  if (!host || !email || !apiToken) {
    throw new Error("Missing JIRA config. Set JIRA_HOST, JIRA_EMAIL, and JIRA_API_TOKEN env vars.");
  }

  const auth = Buffer.from(`${email}:${apiToken}`).toString("base64");
  cachedConfig = { host: host.replace(/\/$/, ""), auth };
  return cachedConfig;
}

export async function fetchJiraIssue(issueKey) {
  const { host, auth } = getConfig();
  const url = `${host}/rest/api/3/issue/${encodeURIComponent(issueKey)}?fields=summary,description`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Accept": "application/json"
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Jira API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const title = data?.fields?.summary || issueKey;
  const description = flattenJiraDescription(data?.fields?.description) || "";
  const id = data?.id ? String(data.id) : undefined;
  const key = data?.key || undefined;
  const browseUrl = key ? `${host}/browse/${encodeURIComponent(key)}` : undefined;
  return { id, key, title, body: description, url: browseUrl };
}

function flattenJiraDescription(desc) {
  if (!desc) return "";
  // Jira Cloud description is in Atlassian Document Format (ADF)
  // We'll attempt a best-effort plain text extraction
  try {
    if (typeof desc === "string") return desc;
    if (desc?.content && Array.isArray(desc.content)) {
      const parts = [];
      for (const block of desc.content) {
        collectText(block, parts);
      }
      return parts.join("\n").trim();
    }
  } catch {
    // ignore and fallback below
  }
  return "";
}

function collectText(node, parts) {
  if (!node) return;
  if (node.type === "text" && node.text) {
    parts.push(node.text);
  }
  if (Array.isArray(node.content)) {
    for (const child of node.content) collectText(child, parts);
  }
}
