import { Octokit } from "@octokit/rest";
import OpenAI from "openai";
import { CloudClient } from "chromadb"; // актуальный пакет

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

// ChromaDB
const chroma = new CloudClient({
    host: process.env.CHROMADB_HOST,
    port: parseInt(process.env.CHROMADB_PORT, 10),
    token: process.env.CHROMADB_TOKEN ,
});

// Получаем Issue
async function getIssue() {
    const { data } = await octokit.issues.get({
        owner,
        repo,
        issue_number: issueNumber,
    });
    return data;
}

// Поиск релевантного кода в ChromaDB
async function searchCode(query) {
    const collection = await chroma.collection("openai-crm-proxy"); // коллекция
    const results = await collection.query({
        queryTexts: [query],
        nResults: 5,
    });
    return results[0]?.documents || [];
}

// Генерация PR через GPT
async function generatePR(issue) {
    const relevantCode = await searchCode(issue.title);
    const prompt = `
Задача: ${issue.title}
Описание: ${issue.body}
Вот релевантный код из репозитория: ${relevantCode.join("\n\n")}
Предложи изменения и сформируй git patch (или файл изменений) и комментарий для Pull Request.
`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
    });

    return response.choices[0].message.content;
}

// Создаем Pull Request
async function createPR(branchName, prBody) {
    const mainRef = await octokit.git.getRef({
        owner,
        repo,
        ref: "heads/main",
    });

    await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: mainRef.data.object.sha,
    });

    // Для примера создаем README.md, можно заменить на реальные изменения
    await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: "README.md",
        message: `AI PR for Issue #${issueNumber}`,
        content: Buffer.from(prBody).toString("base64"),
        branch: branchName,
    });

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
