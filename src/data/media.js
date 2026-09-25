import data from "./media.json";

export const mediaItems = data;
export function getMediaByCategory(slug) { return mediaItems.filter((m) => m.category === slug); }
export function getMediaById(id) { return mediaItems.find((m) => m.id === id); }
