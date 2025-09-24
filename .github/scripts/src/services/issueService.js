import { createOctokitClient } from "../clients/githubClient.js";

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

export async function getMockIssue() {
    return {
        title: "Измени стиль кнопок в навигации сайта так, чтобы их фон был красным",
        body: "Измени стиль кнопок в навигации сайта так, чтобы их фон был красным",
    };
}
