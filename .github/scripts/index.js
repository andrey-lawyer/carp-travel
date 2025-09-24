// import {getIssueFromGitHub} from "./src/services/issueService.js";
// import {searchCode} from "./src/services/searchService.js";
// import {generateChanges} from "./src/services/gptService.js";
// import {createPR} from "./src/services/prService.js";
//
//
// const issueNumber = process.argv[2];
// if (!issueNumber) {
//   console.error("Issue number is required!");
//   process.exit(1);
// }
//
// async function main() {
//   const issue = await getIssueFromGitHub(issueNumber);
//   const query = issue.body?.trim() || issue.title;
//
//   const relevantFiles = await searchCode(query);
//   const changes = await generateChanges(issue, relevantFiles);
//
//   if (changes.length === 0) return console.log("Нет изменений");
//
//   await createPR(`ai-issue-${issueNumber}`, changes, issue.title, issueNumber);
// }
//
// main().catch(console.error);

import fs from "node:fs";
import { getIssue } from "./src/services/issueService.js";
import {searchCode} from "./src/services/searchService.js";
import {generateChanges} from "./src/services/gptService.js";
import {createPR} from "./src/services/prService.js";

function resolveIssueIdentifier() {
  const provider = (process.env.ISSUE_PROVIDER || "github").toLowerCase();
  // Try GitHub event payload when provider is github
  if (provider === "github") {
    try {
      const eventPath = process.env.GITHUB_EVENT_PATH;
      if (eventPath && fs.existsSync(eventPath)) {
        const payload = JSON.parse(fs.readFileSync(eventPath, "utf8"));
        const num = payload?.issue?.number || payload?.pull_request?.number;
        if (num != null) return String(num);
      }
    } catch {
      // ignore
    }
  }
  // If provider is Jira, try to auto-detect key from typical GitHub contexts
  if (provider === "jira") {
    const jiraKeyFromString = (s) => {
      if (!s || typeof s !== "string") return null;
      const m = s.match(/[A-Z][A-Z0-9]+-\d+/);
      return m ? m[0] : null;
    };
    // 1) Branch name
    const refName = process.env.GITHUB_REF_NAME || process.env.GITHUB_HEAD_REF;
    const fromBranch = jiraKeyFromString(refName);
    if (fromBranch) return fromBranch;

    // 2) Event payload: PR title/body
    try {
      const eventPath = process.env.GITHUB_EVENT_PATH;
      if (eventPath && fs.existsSync(eventPath)) {
        const payload = JSON.parse(fs.readFileSync(eventPath, "utf8"));
        const prTitle = payload?.pull_request?.title;
        const prBody = payload?.pull_request?.body;
        const fromPrTitle = jiraKeyFromString(prTitle);
        if (fromPrTitle) return fromPrTitle;
        const fromPrBody = jiraKeyFromString(prBody);
        if (fromPrBody) return fromPrBody;

        // 3) Push event: scan commit messages
        const commits = Array.isArray(payload?.commits) ? payload.commits : [];
        for (const c of commits) {
          const fromCommit = jiraKeyFromString(c?.message);
          if (fromCommit) return fromCommit;
        }
      }
    } catch {
      console.error("Не удалось определить идентификатор задачи. Для GitHub запустите экшен на событии issues (payload.issue.number), для Jira — укажите ключ задачи в имени ветки/PR/коммитах (например, PROJ-123).");
    }
  }
  console.error("Не удалось определить идентификатор задачи. Для GitHub запустите экшен на событии issues (payload.issue.number), для Jira — укажите ключ задачи в имени ветки/PR/коммитах (например, PROJ-123).");
  process.exit(1);
}

async function main() {
  const issueIdOrKey = resolveIssueIdentifier();
  const issue = await getIssue(issueIdOrKey);
  const query = issue.body?.trim() || issue.title;

  const relevantFiles = await searchCode(query);
  const changes = await generateChanges(issue, relevantFiles);

  if (changes.length === 0) return console.log("Нет изменений");

  const safe = (s) => String(s).toLowerCase().replace(/[^a-z0-9-_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$|^$/g, "");
  const branchBase = `ai-issue-${issue.provider}-${issue.key || issue.id}`;
  const branchName = safe(`${branchBase}-${issue.title.slice(0, 50)}`);
  await createPR(branchName, changes, issue.title, issue.displayId);
}

main().catch(console.error);
