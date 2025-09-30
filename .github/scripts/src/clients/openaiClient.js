import OpenAI from "openai";

export function createOpenAIClient() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is required but not set in environment variables");
    }

    return new OpenAI({ apiKey });
}

