import OpenAI from "openai";

let cachedOpenAIClient = null;

export function createOpenAIClient() {
    if (cachedOpenAIClient) return cachedOpenAIClient;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is required but not set in environment variables");
    }

    cachedOpenAIClient = new OpenAI({ apiKey });
    return cachedOpenAIClient;
}

