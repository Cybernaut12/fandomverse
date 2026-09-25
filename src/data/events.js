import data from "./events.json";

export const events = data;
export function getEventsByCategory(slug) { return events.filter((e) => e.category === slug); }
export function getEventById(id) { return events.find((e) => e.id === id); }
