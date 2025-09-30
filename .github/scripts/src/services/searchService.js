import {createChromaClient, getCollection} from "../clients/chromaClient.js";
import { getEmbedding } from "./embeddingService.js";

export async function searchCode(query) {
    const chroma = createChromaClient();
    const collection = await getCollection(chroma);
    const embedding = await getEmbedding(query);

    const rawLimit = process.env.CHROMADB_QUERY_LIMIT;
    const parsedLimit = Number(rawLimit);
    const nResults = Number.isFinite(parsedLimit) ? parsedLimit : 20;

    const results = await collection.query({
        queryEmbeddings: [embedding],
        nResults,
        include: ["documents", "metadatas", "distances"],
    });

    return results.documents[0].map((doc, idx) => ({
        path: results.metadatas[0][idx]?.file_path || `unknown-${idx}.txt`,
        content: doc,
    }));
}
