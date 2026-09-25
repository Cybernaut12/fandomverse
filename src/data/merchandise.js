import data from "./merchandise.json";

export const merchandise = data;
export function getMerchByCategory(slug) { return merchandise.filter((m) => m.category === slug); }
export function getMerchById(id) { return merchandise.find((m) => m.id === id); }
