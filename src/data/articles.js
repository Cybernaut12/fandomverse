import data from "./articles.json";

export const articles = data;
export function getArticlesByCategory(slug) { return articles.filter((a) => a.category === slug); }
export function getFeaturedArticles() { return articles.filter((a) => a.featured); }
export function getArticleBySlug(slug) { return articles.find((a) => a.slug === slug); }
export function getArticleById(id) { return articles.find((a) => a.id === id); }
