// import { createOctokitClient } from "../clients/githubClient.js";
//
// export async function getIssueFromGitHub(issueNumber) {
//     const octokit = await createOctokitClient();
//     const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
//
//     const { data } = await octokit.issues.get({
//         owner,
//         repo,
//         issue_number: issueNumber,
//     });
//     return data;
// }
//
// export async function getMockIssue() {
//     return {
//         title: "Измени стиль кнопок в навигации сайта так, чтобы их фон был красным",
//         body: "Измени стиль кнопок в навигации сайта так, чтобы их фон был красным",
//     };
// }

import { createOctokitClient } from "../clients/githubClient.js";
import { fetchJiraIssue } from "../clients/jiraClient.js";

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


export async function getIssue(idOrKey) {
    const provider = (process.env.ISSUE_PROVIDER || "github").toLowerCase();
    if (provider === "jira") {
        // For Jira, idOrKey is the issue key (e.g., PROJ-123) or numeric id
        const issue = await fetchJiraIssue(idOrKey);
        return {
            provider: "jira",
            id: issue.id || String(idOrKey),
            key: issue.key || null,
            displayId: issue.key || issue.id || String(idOrKey),
            title: issue.title,
            body: issue.body,
            url: issue.url || null,
        };
    }
    // Default: GitHub, idOrKey is the issue number
    const gh = await getIssueFromGitHub(idOrKey);
    return {
        provider: "github",
        id: gh?.id ? String(gh.id) : String(idOrKey),
        key: null,
        displayId: gh?.number != null ? `#${gh.number}` : `#${idOrKey}`,
        title: gh.title,
        body: gh.body || "",
        url: gh.html_url || null,
    };
}
