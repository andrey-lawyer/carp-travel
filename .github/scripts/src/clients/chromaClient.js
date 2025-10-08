import { ChromaClient } from "chromadb";
import https from "https";

let cachedChromaClient = null;
let cachedCollection = null;

export function createChromaClient() {
    if (cachedChromaClient) return cachedChromaClient;

    const host = process.env.CHROMADB_HOST;
    const port = process.env.CHROMADB_PORT;
    const ssl = process.env.CHROMADB_SSL === "true";
    const authType = process.env.CHROMADB_AUTH_TYPE || "token"; // token | basic | api_key
    const credentials = process.env.CHROMADB_CREDENTIALS;

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

    cachedChromaClient = new ChromaClient({
        path: `${protocol}://${host}:${port}`,
        fetchOptions: {
            headers,
            agent: ssl ? new https.Agent({ rejectUnauthorized: false }) : undefined,
        },
    });

    return cachedChromaClient;
}


export async function getCollection(client = null) {
    if (cachedCollection) return cachedCollection;

    const collectionName = process.env.CHROMADB_COLLECTION;
    if (!collectionName) {
        throw new Error("CHROMADB_COLLECTION is required but not set in environment variables");
    }

    const chroma = client || createChromaClient();
    cachedCollection = await chroma.getCollection({ name: collectionName });

    return cachedCollection;
}
