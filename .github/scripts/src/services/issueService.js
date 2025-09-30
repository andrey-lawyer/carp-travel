import { createOctokitClient } from "../clients/githubClient.js";

/**
 * Fetches an issue from GitHub
 * @param {string|number} issueNumber - The GitHub issue number
 * @returns {Promise<Object>} The GitHub issue data
 */
export async function getIssueFromGitHub(issueNumber) {
    const octokit = await createOctokitClient();
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

    const { data } = await octokit.issues.get({
        owner,
        repo,
        issue_number: issueNumber,
    });
    return data;
}

/**
 * Processes a Jira webhook payload
 * @param {object} payload - The webhook payload from Jira
 * @returns {object} Normalized issue data
 */
function processJiraWebhook(payload) {
    if (!payload || !payload.issue) {
        throw new Error("Invalid Jira webhook payload: missing issue data");
    }

    const issue = payload.issue || {};
    const fields = issue.fields || {};
    
    return {
        provider: "jira",
        id: issue.id || "",
        key: issue.key || "",
        displayId: issue.key || "",
        title: fields.summary || "[No Title]",
        body: fields.description || "",
        url: `${process.env.JIRA_HOST || 'https://your-domain.atlassian.net'}/browse/${issue.key}`,
        status: fields.status?.name,
        issueType: fields.issuetype?.name,
        project: fields.project?.key,
        // Include raw fields for debugging (with sensitive data redacted)
        _raw: {
            ...payload,
            issue: { 
                ...issue, 
                fields: { 
                    ...fields, 
                    description: fields.description ? '[REDACTED]' : null 
                } 
            }
        }
    };
}

/**
 * Gets an issue from the appropriate provider
 * @param {string|number|object} idOrKey - Issue number (GitHub), key (Jira), or webhook payload
 * @returns {Promise<Object>} The issue data
 * @throws {Error} If the issue cannot be retrieved
 */
export async function getIssue(idOrKey) {
    const provider = (process.env.ISSUE_PROVIDER || "github").toLowerCase();

    if (provider === "jira") {
        if (!idOrKey) {
            throw new Error("Jira issue key or webhook payload is required");
        }
        
        if (typeof idOrKey === 'object') {
            return processJiraWebhook(idOrKey);
        }
        
        throw new Error(
            "Direct Jira key lookup is not supported. " +
            "Please use the webhook or local development setup."
        );
    }

    // Default: GitHub
    if (!idOrKey) {
        throw new Error("GitHub issue number is required");
    }
    
    const gh = await getIssueFromGitHub(idOrKey);
    return {
        provider: "github",
        id: String(gh?.id || idOrKey),
        key: null,
        displayId: `#${gh?.number || idOrKey}`,
        title: gh.title,
        body: gh.body || "",
        url: gh.html_url || null,
    };
}

