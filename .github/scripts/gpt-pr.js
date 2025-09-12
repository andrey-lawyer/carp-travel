import { Octokit } from "@octokit/rest";
import OpenAI from "openai";
import { ChromaClient } from "chromadb"; // локальный клиент
import https from "https";

const issueNumber = process.argv[2];

if (!issueNumber) {
    console.error("Issue number is required!");
    process.exit(1);
}

// GitHub
const octokit = new Octokit({ auth: process.env.GH_PAT });
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

// OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ChromaDB (локальный сервер)
const chroma = new ChromaClient({
    path: `http://${process.env.CHROMADB_HOST}:${process.env.CHROMADB_PORT}`,
    fetchOptions: {
        headers: {
            Authorization: `Bearer ${process.env.CHROMADB_TOKEN}`,
        },
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

// Поиск релевантного кода в ChromaDB
async function searchCode(query) {
    const collection = await chroma.getCollection({ name: "openai-carp-travel" });
    const results = await collection.query({
        queryTexts: [query],
        nResults: 5,
    });
    // возвращаем объекты {path, content}
    return results[0]?.documents.map((doc, idx) => ({
        path: results[0].metadatas[idx]?.path || `unknown-${idx}.txt`,
        content: doc,
    })) || [];
}

// Генерация изменений через GPT
async function generateChanges(issue, relevantFiles) {
    const prompt = `
Задача: ${issue.title}
Описание: ${issue.body}

Вот релевантные фрагменты кода из репозитория:
${relevantFiles.map(f => `Файл: ${f.path}\n${f.content}`).join("\n\n")}

Предложи изменения для каждого файла. 
Сформируй ответ в JSON формате:
[
  {
    "path": "<путь к файлу>",
    "content": "<новый код файла после изменений>"
  }
]
`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
    });

    try {
        return JSON.parse(response.choices[0].message.content);
    } catch (err) {
        console.error("Ошибка парсинга ответа GPT:", err);
        console.log(response.choices[0].message.content);
        return [];
    }
}

// Создаем Pull Request
async function createPR(branchName, changes) {
    // Берем SHA ветки master
    const masterRef = await octokit.git.getRef({
        owner,
        repo,
        ref: "heads/master",
    });

    // Создаем новую ветку
    await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: masterRef.data.object.sha,
    });

    // Применяем изменения к каждому файлу
    for (const file of changes) {
        try {
            const { data: fileData } = await octokit.repos.getContent({
                owner,
                repo,
                path: file.path,
                ref: "master",
            });

            // Если файл существует, обновляем с sha
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
            // Если файла нет, создаем новый без sha
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

    // Создаем PR
    const { data: pr } = await octokit.pulls.create({
        owner,
        repo,
        head: branchName,
        base: "master",
        title: `AI PR for Issue #${issueNumber}`,
        body: `AI предложенные изменения для задачи: ${issue.title}`,
    });

    console.log(`Pull Request created: ${pr.html_url}`);
}

// Основной запуск
async function main() {
    const issue = await getIssue();
    const relevantFiles = await searchCode(issue.title);
    const changes = await generateChanges(issue, relevantFiles);
    const branchName = `ai-issue-${issueNumber}`;
    await createPR(branchName, changes);
}

main().catch(console.error);


