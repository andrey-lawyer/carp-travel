import { getMockIssue } from "./services/issueService.js";
import { searchCode } from "./services/searchService.js";
import { generateChanges } from "./services/gptService.js";
import { createPR } from "./services/prService.js";

const mockIssueNumber = Date.now();

async function main() {
    const issue = await getMockIssue();
    const query = issue.body?.trim() || issue.title;

    const relevantFiles = await searchCode(query);
    const changes = await generateChanges(issue, relevantFiles);

    if (changes.length === 0) return console.log("Нет изменений");

    await createPR(`ai-issue-${mockIssueNumber}`, changes, issue.title, mockIssueNumber);
}

main().catch(console.error);
