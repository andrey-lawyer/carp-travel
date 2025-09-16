import { Octokit } from "@octokit/rest";
import OpenAI from "openai";
import { ChromaClient } from "chromadb";
import https from "https";

const issueNumber = process.argv[2];

if (!issueNumber) {
    console.error("Issue number is required!");
    process.exit(1);
}

// GitHub
const octokit = await createOctokitClient();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

// OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ChromaDB (локальный сервер)
const chroma = new ChromaClient({
    path: `http://${process.env.CHROMADB_HOST}:${process.env.CHROMADB_PORT}`,
    fetchOptions: {
        headers: { Authorization: `Bearer ${process.env.CHROMADB_TOKEN}` },
        agent: new https.Agent({ rejectUnauthorized: false }),
    },
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

// Получаем эмбеддинг 1536 от OpenAI
async function getEmbedding(text) {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small", // 1536
        input: text,
    });
    return response.data[0].embedding;
}

// Поиск релевантного кода в ChromaDB
async function searchCode(query) {
    const collection = await chroma.getCollection({ name: "openai-carp-travel" });

    const embedding = await getEmbedding(query);

    const results = await collection.query({
        queryEmbeddings: [embedding],
        nResults: 20,
        include: ["documents", "metadatas", "distances"],
    });


    // Преобразуем в массив {path, content}
    const files = results.documents[0].map((doc, idx) => ({
        path: results.metadatas[0][idx]?.file_path || `unknown-${idx}.txt`,
        content: doc,
    }));

    console.log("🔍 Найденные файлы:", files.length);
    files.forEach(f => {
        console.log("Файл:", f.path);
        console.log("Содержимое (первые 300 символов):", f.content.slice(0, 300));
        console.log("----");
    });
    return files;
}

// Парсинг JSON из текста GPT
function parseGPTJSON(text) {
    const match = text.match(/\[.*\]/s); // ищем JSON массив
    if (!match) return [];
    try {
        return JSON.parse(match[0]);
    } catch (err) {
        console.error("Не удалось распарсить JSON от GPT:", err);
        console.log("GPT ответ:\n", text);
        return [];
    }
}

// Генерация изменений через GPT
async function generateChanges(issue, relevantFiles) {
    const prompt = `
Task: ${issue.title}
Description: ${issue.body}

Here are relevant code snippets from the repository:
${relevantFiles.map(f => `File: ${f.path}\n${f.content}`).join("\n\n")}

Please suggest modifications for each file to solve the task. 
Return the answer strictly in JSON format:
[
  {
    "path": "<file path>",
    "content": "<updated file content>"
  }
]
You may add additional files if necessary.
`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
    });

    return parseGPTJSON(response.choices[0].message.content);
}

// Создаем Pull Request
async function createPR(branchName, changes, issueTitle) {
    const masterRef = await octokit.git.getRef({ owner, repo, ref: "heads/master" });

    await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: masterRef.data.object.sha,
    });

    for (const file of changes) {
        try {
            const { data: fileData } = await octokit.repos.getContent({
                owner,
                repo,
                path: file.path,
                ref: "master",
            });

            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path: file.path,
                message: `AI PR for Issue #${issueNumber}`,
                content: Buffer.from(file.content).toString("base64"),
                branch: branchName,
                sha: fileData.sha,
            });
        } catch (err) {
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path: file.path,
                message: `AI PR for Issue #${issueNumber}`,
                content: Buffer.from(file.content).toString("base64"),
                branch: branchName,
            });
        }
    }

    const { data: pr } = await octokit.pulls.create({
        owner,
        repo,
        head: branchName,
        base: "master",
        title: `AI PR for Issue #${issueNumber}`,
        body: `AI предложенные изменения для задачи: ${issueTitle}`,
    });

    console.log(`Pull Request created: ${pr.html_url}`);
}

// Основной запуск
async function main() {
    const issue = await getIssue();
    const query = issue.body?.trim() ? issue.body : issue.title;
    const relevantFiles = await searchCode(query);
    const changes = await generateChanges(issue, relevantFiles);

    if (changes.length === 0) {
        console.log("GPT не предложил изменений для файлов.");
        return;
    }

    const branchName = `ai-issue-${issueNumber}`;
    await createPR(branchName, changes, issue.title);
}

main().catch(console.error);

async function createOctokitClient() {
    const githubToken = process.env.GITHUB_TOKEN;
    const ghPat = process.env.GH_PAT;

    if (!githubToken && !ghPat) {
        console.error("No GitHub token provided! Set GITHUB_TOKEN or GH_PAT.");
        process.exit(1);
    }

    // Пробуем сначала GITHUB_TOKEN
    let octokit = new Octokit({ auth: githubToken || ghPat });

    try {
        // Тестовый запрос, чтобы проверить доступ
        await octokit.repos.get({ owner: "OWNER_NAME", repo: "REPO_NAME" });
        return octokit;
    } catch (err) {
        if (githubToken && ghPat) {
            console.warn("GITHUB_TOKEN не имеет доступа, пробуем GH_PAT...");
            octokit = new Octokit({ auth: ghPat });
            return octokit;
        } else {
            throw err;
        }
    }
}




