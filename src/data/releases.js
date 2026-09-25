import data from "./releases.json";

export const releases = data;
export function getReleasesByCategory(slug) { return releases.filter((r) => r.category === slug); }
