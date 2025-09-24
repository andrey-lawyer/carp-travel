import {getIssueFromGitHub} from "./src/services/issueService.js";
import {searchCode} from "./src/services/searchService.js";
import {generateChanges} from "./src/services/gptService.js";
import {createPR} from "./src/services/prService.js";


const issueNumber = process.argv[2];
if (!issueNumber) {
  console.error("Issue number is required!");
  process.exit(1);
}

async function main() {
  const issue = await getIssueFromGitHub(issueNumber);
  const query = issue.body?.trim() || issue.title;

  const relevantFiles = await searchCode(query);
  const changes = await generateChanges(issue, relevantFiles);

  if (changes.length === 0) return console.log("Нет изменений");

  await createPR(`ai-issue-${issueNumber}`, changes, issue.title, issueNumber);
}

main().catch(console.error);

