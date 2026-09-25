import data from "./characters.json";

export const characters = data;
export function getCharactersByCategory(slug) { return characters.filter((c) => c.category === slug); }
export function getCharacterById(id) { return characters.find((c) => c.id === id); }
