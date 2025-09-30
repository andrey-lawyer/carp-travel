import { createOctokitClient } from "../clients/githubClient.js";

export async function createPR(branchName, changes, issueTitle, mockIssueNumber) {
    const octokit = await createOctokitClient();
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    const targetBranch = process.env.GITHUB_TARGET_BRANCH || "main";

    const masterRef = await octokit.git.getRef({ owner, repo,  ref: `heads/${targetBranch}`, });

    await octokit.git.createRef({
        owner, repo,
        ref: `refs/heads/${branchName}`,
        sha: masterRef.data.object.sha,
    });

    for (const file of changes) {
        try {
            const { data: fileData } = await octokit.repos.getContent({
                owner, repo, path: file.path, ref: targetBranch,
            });

            await octokit.repos.createOrUpdateFileContents({
                owner, repo, path: file.path,
                message: `AI PR for Issue #${mockIssueNumber}`,
                content: Buffer.from(file.content).toString("base64"),
                branch: branchName,
                sha: fileData.sha,
            });
        } catch {
            await octokit.repos.createOrUpdateFileContents({
                owner, repo, path: file.path,
                message: `AI PR for Issue #${mockIssueNumber}`,
                content: Buffer.from(file.content).toString("base64"),
                branch: branchName,
            });
        }
    }

    const { data: pr } = await octokit.pulls.create({
        owner, repo,
        head: branchName,
        base: targetBranch,
        title: `AI PR for Issue #${mockIssueNumber}`,
        body: `AI proposed changes for the task: ${issueTitle}`,
    });

    console.log(`Pull Request created: ${pr.html_url}`);
}
