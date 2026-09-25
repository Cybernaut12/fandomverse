import { Link } from 'react-router-dom';
import { ArrowUpRight, Newspaper } from 'lucide-react';
import { articles } from '@/data/articles';
import { CategoryBadge } from '@/components/ui/CategoryBadge';

export function ArticlesPage() {
  return (
    <section className="min-vh-100 fv-bg-ink-900 fv-pt-20">
      <div className="container-wide fv-py-10 fv-md-py-14">
        <div className="fv-mb-9">
          <p className="fv-mb-2 d-flex align-items-center gap-2 fv-text-10px fv-uppercase fv-tracking-0-25em fv-text-brand-300">
            <Newspaper className="fv-h-4 fv-w-4" /> FandomVerse stories
          </p>
          <h1 className="fv-display-font fv-text-4xl fv-tracking-wide fv-text-paper-50 fv-md-text-5xl">Articles</h1>
          <p className="fv-mt-3 fv-max-w-2xl fv-text-sm fv-text-paper-300">Read the latest stories from across the fandoms.</p>
        </div>

        <div className="fv-grid fv-grid-cols-1 fv-gap-4 fv-sm-grid-cols-2 fv-lg-grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} to={`/article/${article.slug}`} className="fv-group overflow-hidden rounded-4 border fv-border-ink-600 fv-bg-ink-800 fv-transition-colors fv-hover-border-ink-500">
              <div className="position-relative fv-aspect-16-10 overflow-hidden fv-bg-ink-700">
                <img src={article.image} alt={article.title} className="h-100 w-100 object-fit-cover fv-transition-transform fv-duration-500 fv-group-hover-scale-105" loading="lazy" />
                <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900-75 fv-via-transparent fv-to-transparent" />
                <div className="position-absolute fv-bottom-3 fv-left-3"><CategoryBadge category={article.category} /></div>
              </div>
              <div className="fv-p-4">
                <h2 className="fv-clamp-2 fv-display-font fv-text-xl fv-tracking-wide fv-text-paper-50 fv-transition-colors fv-group-hover-text-brand-300">{article.title}</h2>
                <p className="fv-mt-2 fv-clamp-3 fv-text-sm fv-leading-relaxed fv-text-paper-300">{article.excerpt}</p>
                <span className="fv-mt-4 d-inline-flex align-items-center fv-gap-1 fv-text-xs fv-heading-font fv-text-brand-300">Read article <ArrowUpRight className="fv-h-3-5 fv-w-3-5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
