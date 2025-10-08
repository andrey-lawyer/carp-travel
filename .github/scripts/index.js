import {searchCode} from "./src/services/searchService.js";
import {generateChanges} from "./src/services/gptService.js";
import {createPR} from "./src/services/prService.js";
import {getIssue} from "./src/services/issueService.js";

async function main() {

  const issue = await getIssue();
  console.log(issue);
  // const query = issue.body?.trim() || issue.title;
  //
  // const relevantFiles = await searchCode(query);
  // const changes = await generateChanges(issue, relevantFiles);
  //
  // if (changes.length === 0) {
  //   console.log("Нет изменений");
  //   return;
  // }
  //
  // const safe = (s) =>
  //     String(s)
  //         .toLowerCase()
  //         .replace(/[^a-z0-9-_]+/g, "-")
  //         .replace(/-+/g, "-")
  //         .replace(/^-|-$|^$/g, "");
  //
  // const branchBase = `ai-issue-${issue.provider}-${issue.key || issue.id}`;
  // const branchName = safe(`${branchBase}-${issue.title.slice(0, 50)}`);
  //
  // await createPR(branchName, changes, issue);
}

main().catch(console.error);
