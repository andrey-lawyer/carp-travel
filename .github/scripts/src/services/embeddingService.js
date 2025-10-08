import {createOpenAIClient} from "../clients/openaiClient.js";

export async function getEmbedding(text) {
    const openai = createOpenAIClient();
    const model = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';
    const response = await openai.embeddings.create({
        model,
        input: text,
    });
    return response.data[0].embedding;
}
