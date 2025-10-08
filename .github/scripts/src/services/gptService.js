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

    // Запрос к GPT
    const response = await openai.chat.completions.create({
        model,
        messages: [
            {
                role: "system",
                content: "You are an expert software developer. \n" +
                    "Your task is to provide ONLY a JSON array of objects with fields \"path\" and \"content\".\n" +
                    "Do NOT write any explanations, comments, or text outside the JSON.\n" +
                    "The JSON must be valid and parseable."
            },
            {
                role: "user",
                content: prompt
            }
        ],
        max_tokens: 3000,
    });

    return parseGPTJSON(response.choices[0].message.content);
}

