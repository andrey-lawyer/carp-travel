import {createOpenAIClient} from "../clients/openaiClient.js";

export async function getEmbedding(text) {
    const openai = createOpenAIClient();
    const response = await openai.embeddings.create({
        model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',
        input: text,
    });
    return response.data[0].embedding;
}
