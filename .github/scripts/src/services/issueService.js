import fs from "fs";

export async function getIssue() {

    const provider = (process.env.ISSUE_PROVIDER || "github").toLowerCase();
    const eventName = process.env.GITHUB_EVENT_NAME;
    const eventPath = process.env.GITHUB_EVENT_PATH;

    if (!eventPath || !fs.existsSync(eventPath)) {
        console.error(`GITHUB_EVENT_PATH not found: ${eventPath}`);
        process.exit(1);
    }

    let payload = null;
    try {
        payload = JSON.parse(fs.readFileSync(eventPath, "utf8"));
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
            event_type: payload.action || null,
        };
    }

    console.error("Unable to resolve issue identifier.");
    process.exit(1);
}

