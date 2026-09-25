import data from "./categories.json";

export const categories = data;
export const categoryMap = categories.reduce((acc, cat) => ({ ...acc, [cat.slug]: cat }), {});
export function getCategory(slug) { return categoryMap[slug]; }
