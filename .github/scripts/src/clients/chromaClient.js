import { ChromaClient } from "chromadb";
import https from "https";

export function createChromaClient() {
    const host = process.env.CHROMADB_HOST;
    const port = process.env.CHROMADB_PORT;
    const ssl = process.env.CHROMADB_SSL === "true";
    const authType = process.env.CHROMADB_AUTH_TYPE || "token"; // token | basic | api_key
    const credentials = process.env.CHROMADB_CREDENTIALS;       // token or username:password or API key

    if (!host || !port || !credentials) {
        throw new Error("CHROMADB_HOST, CHROMADB_PORT and CHROMADB_CREDENTIALS are required");
    }

    const protocol = ssl ? "https" : "http";

    const headers = {};
    if (authType === "basic") {
        headers["Authorization"] = `Basic ${Buffer.from(credentials).toString("base64")}`;
    } else if (authType === "token") {
        headers["Authorization"] = `Bearer ${credentials}`;
    } else if (authType === "api_key") {
        headers["X-Api-Key"] = credentials;
    }

    const client = new ChromaClient({
        path: `${protocol}://${host}:${port}`,
        fetchOptions: {
            headers,
            agent: ssl ? new https.Agent({ rejectUnauthorized: false }) : undefined,
        },
    });

    return client;
}


export async function getCollection(client) {
    const collectionName = process.env.CHROMADB_COLLECTION;

    if (!collectionName) {
        throw new Error("CHROMADB_COLLECTION is required but not set in environment variables");
    }

    return await client.getCollection({ name: collectionName });
}
