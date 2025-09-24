import { Octokit } from "@octokit/rest";

let cachedOctokit = null;

export async function createOctokitClient() {
    if (cachedOctokit) return cachedOctokit;

    const githubToken = process.env.GITHUB_TOKEN;
    const ghPat = process.env.GH_PAT;

    if (!githubToken && !ghPat) {
        throw new Error("No GitHub token provided! Set GITHUB_TOKEN or GH_PAT.");
    }

    cachedOctokit = new Octokit({ auth: githubToken || ghPat });
    return cachedOctokit;
}
