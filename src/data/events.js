import data from "./events.json";
import { eventImageOverrides } from "./eventImageOverrides";

export const events = data.map((event) => ({
  ...event,
  image: eventImageOverrides[event.id] || event.image,
}));
export function getEventsByCategory(slug) { return events.filter((e) => e.category === slug); }
export function getEventById(id) { return events.find((e) => e.id === id); }