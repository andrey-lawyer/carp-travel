import { Octokit } from "@octokit/rest";

export async function createOctokitClient() {
    const githubToken = process.env.GITHUB_TOKEN;
    const ghPat = process.env.GH_PAT;

    if (!githubToken && !ghPat) {
        throw new Error("No GitHub token provided! Set GITHUB_TOKEN or GH_PAT.");
    }

    return new Octokit({ auth: githubToken || ghPat });
}
