import { Octokit } from "@octokit/rest";
import OpenAI from "openai";

const issueNumber = process.argv[2];

if (!issueNumber) {
    console.error("Issue number is required!");
    process.exit(1);
}

// GitHub
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

// OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


// 1. Получаем Issue
async function getIssue() {
    const { data } = await octokit.issues.get({ owner, repo, issue_number: issueNumber });
    return data;
}

// 2. Генерируем PR через GPT
async function generatePR(issue) {
    const prompt = `
    Задача: ${issue.title}
    Описание: ${issue.body}
    Используй код из репозитория (доступно через ChromaDB), чтобы предложить изменения.
    Сформируй git patch и комментарий для Pull Request.
  `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
    });

    const prContent = response.choices[0].message.content;
    return prContent;
}

// 3. Создаём Pull Request
async function createPR(branchName, prBody) {
    // создаём новую ветку
    const mainRef = await octokit.git.getRef({ owner, repo, ref: "heads/main" });
    await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: mainRef.data.object.sha,
    });

    // создаём файл изменений (или патч)
    // для примера просто README.md добавляем
    await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: "README.md",
        message: `Update from Issue #${issueNumber}`,
        content: Buffer.from(prBody).toString("base64"),
        branch: branchName,
    });

    // создаём PR
    const { data: pr } = await octokit.pulls.create({
        owner,
        repo,
        head: branchName,
        base: "main",
        title: `AI PR for Issue #${issueNumber}`,
        body: prBody,
    });

    console.log(`Pull Request created: ${pr.html_url}`);
}

async function main() {
    const issue = await getIssue();
    const prBody = await generatePR(issue);
    const branchName = `ai-issue-${issueNumber}`;
    await createPR(branchName, prBody);
}

main().catch(console.error);
