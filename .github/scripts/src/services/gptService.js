import {createOpenAIClient} from "../clients/openaiClient.js";
import {parseGPTJSON} from "../utils/parseGPTJSON.js";


export async function generateChanges(issue, relevantFiles) {
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
    const openai = createOpenAIClient();

    const model = process.env.OPENAI_RESPONSE_MODEL || 'gpt-4o-mini';

    const response = await openai.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
    });

    return parseGPTJSON(response.choices[0].message.content);
}
