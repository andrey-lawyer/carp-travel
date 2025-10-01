// import fs from "node:fs";
//
// export function resolveIssueIdentifier() {
//   const provider = (process.env.ISSUE_PROVIDER || "github").toLowerCase();
//   // Try GitHub event payload when provider is github
//   if (provider === "github") {
//     try {
//       const eventPath = process.env.GITHUB_EVENT_PATH;
//       if (eventPath && fs.existsSync(eventPath)) {
//         const payload = JSON.parse(fs.readFileSync(eventPath, "utf8"));
//         const num = payload?.issue?.number || payload?.pull_request?.number;
//         if (num != null) return String(num);
//       }
//     } catch {
//       // ignore
//     }
//   }
//   // For Jira, require repository_dispatch with a Jira key in client_payload
//   if (provider === "jira") {
//     try {
//       const eventName = process.env.GITHUB_EVENT_NAME;
//       const eventPath = process.env.GITHUB_EVENT_PATH;
//       if (eventName === "repository_dispatch" && eventPath && fs.existsSync(eventPath)) {
//         const payload = JSON.parse(fs.readFileSync(eventPath, "utf8"));
//         const key = payload?.client_payload?.issue_key
//             || payload?.client_payload?.jira?.key
//             || payload?.client_payload?.key;
//         if (key && typeof key === "string") return key;
//       }
//     } catch {
//       // ignore
//     }
//     console.error("Jira key was not provided. Trigger this workflow via repository_dispatch with client_payload.issue_key (e.g., event_type 'jira_task').");
//     process.exit(1);
//   }
//   console.error("Unable to resolve issue identifier. For GitHub, run on issues (payload.issue.number). For Jira, trigger via repository_dispatch with client_payload.issue_key.");
//   process.exit(1);
// }

import fs from "fs";

export function resolveIssueIdentifier() {
  console.log("process.env.ISSUE_PROVIDER", process.env.ISSUE_PROVIDER);

  const provider = (process.env.ISSUE_PROVIDER || "github").toLowerCase();
  const eventName = process.env.GITHUB_EVENT_NAME;
  const eventPath = process.env.GITHUB_EVENT_PATH;

  if (!eventPath || !fs.existsSync(eventPath)) {
    console.error("GITHUB_EVENT_PATH not found.");
    process.exit(1);
  }

  let payload = null;
  try {
    payload = JSON.parse(fs.readFileSync(eventPath, "utf8"));

    console.log("eventPath", eventPath);
    console.log("payload", payload);
  } catch {
    console.error("Failed to parse event payload.");
    process.exit(1);
  }

  // ---------- GitHub ----------
  if (provider === "github") {
    const issue = payload?.issue || payload?.pull_request || {};
    return {
      provider: "github",
      id: issue.number ?? null,
      key: issue.number ? String(issue.number) : null,
      title: issue.title || "No title",
      description: issue.body || "",
      status: issue.state || null,
      event_type: eventName || null,
    };
  }

  // ---------- Jira ----------
  if (provider === "jira" && eventName === "repository_dispatch") {
    const clientPayload = payload?.client_payload || {};
    const issue = clientPayload.issue  || {};

    const fields = issue.fields || {};

    return {
      provider: "jira",
      id: issue.id || null,
      key:  issue.key || null,
      title: fields.summary,
      description: fields.description ,
      status: fields.status?.name || null,
      event_type: payload.event_type || null,
    };
  }

  console.error("Unable to resolve issue identifier.");
  process.exit(1);
}

