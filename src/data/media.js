import data from "./media.json";
import featuredTrailers from "./featuredTrailers.json";

export const mediaItems = [...featuredTrailers, ...data];
export function getMediaByCategory(slug) { return mediaItems.filter((m) => m.category === slug); }
export function getMediaById(id) { return mediaItems.find((m) => m.id === id); }
