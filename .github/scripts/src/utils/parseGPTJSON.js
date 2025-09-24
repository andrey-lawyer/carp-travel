export function parseGPTJSON(text) {
    const match = text.match(/\[.*\]/s);
    if (!match) return [];
    try {
        return JSON.parse(match[0]);
    } catch {
        return [];
    }
}
