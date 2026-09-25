import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, ArrowUpRight } from 'lucide-react';
import { getArticleBySlug, getArticlesByCategory } from '@/data/articles';
import { getCategory } from '@/data/categories';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
export function ArticleDetailPage() {
    const { slug } = useParams();
    const article = slug ? getArticleBySlug(slug) : undefined;
    if (!article) {
        return (<div className="min-vh-100 d-flex align-items-center justify-content-center fv-bg-ink-900 fv-pt-20">
        <div className="text-center">
          <p className="fv-text-paper-300 fv-mb-4">Article not found.</p>
          <Link to="/" className="fv-text-brand-400 fv-hover-text-brand-300">Back home</Link>
        </div>
      </div>);
    }
    const cat = getCategory(article.category);
    const related = getArticlesByCategory(article.category)
        .filter((a) => a.id !== article.id)
        .slice(0, 3);
    return (<article className="min-vh-100 fv-bg-ink-900 fv-pt-16">
      {/* Hero */}
      <section className="position-relative fv-h-60vh fv-min-h-400px d-flex align-items-end overflow-hidden">
        <img src={article.image} alt={article.title} className="position-absolute fv-inset-0 w-100 h-100 object-fit-cover" fetchPriority="high"/>
        <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-70 fv-to-ink-900-30"/>
        {cat && (<div className="position-absolute fv-inset-0 fv-opacity-20" style={{ background: `linear-gradient(to bottom, ${cat.accentColor}30, transparent 60%)` }}/>)}
        <div className="position-relative container-wide fv-pb-12 fv-z-10">
          <Link to={`/category/${article.category}`} className="d-inline-flex align-items-center fv-gap-1 fv-text-sm fv-text-paper-300 fv-hover-text-paper-50 fv-mb-4 fv-transition-colors">
            <ArrowLeft className="fv-w-4 fv-h-4"/>
            Back to {cat?.name}
          </Link>
          <div className="d-flex align-items-center fv-gap-3 fv-mb-4">
            <CategoryBadge category={article.category} size="md"/>
            <span className="fv-text-sm fv-text-paper-300 fv-heading-font d-flex align-items-center fv-gap-1">
              <Calendar className="fv-w-3-5 fv-h-3-5"/>
              {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="fv-display-font fv-text-4xl fv-md-text-5xl fv-lg-text-6xl fv-text-paper-50 fv-tracking-wide fv-leading-tight fv-max-w-4xl fv-text-balance fv-text-shadow-lg">
            {article.title}
          </h1>
          <p className="fv-mt-4 fv-text-lg fv-text-paper-200 fv-max-w-2xl">{article.excerpt}</p>
          <p className="fv-mt-3 fv-text-sm fv-text-paper-300-60 fv-heading-font">By {article.author}</p>
        </div>
      </section>

      {/* Body */}
      <section className="fv-py-12 fv-md-py-16">
        <div className="container-narrow">
          <div className="d-flex align-items-center justify-content-between fv-mb-8 fv-pb-6 border-bottom fv-border-ink-600">
            <div className="d-flex flex-wrap gap-2">
              {article.tags.map((tag) => (<span key={tag} className="d-inline-flex align-items-center fv-gap-1 fv-text-xs fv-text-paper-300-60 fv-heading-font">
                  <Tag className="fv-w-3 fv-h-3"/>
                  {tag}
                </span>))}
            </div>
            <BookmarkButton id={article.id} type="article" title={article.title} category={article.category} image={article.image} url={`/article/${article.slug}`}/>
          </div>

          <div className="prose prose-invert fv-max-w-none">
            {article.body.map((paragraph, i) => (<p key={i} className="fv-text-paper-100 fv-text-lg fv-leading-relaxed fv-mb-6 fv-body-font" style={{ lineHeight: 1.75 }}>
                {paragraph}
              </p>))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (<section className="fv-py-12 fv-bg-ink-800 border-top fv-border-ink-600">
          <div className="container-wide">
            <h2 className="fv-display-font fv-text-3xl fv-text-paper-50 fv-tracking-wide fv-mb-6">Related Stories</h2>
            <div className="fv-grid fv-grid-cols-1 fv-md-grid-cols-3 fv-gap-4">
              {related.map((rel) => (<Link key={rel.id} to={`/article/${rel.slug}`} className="fv-group position-relative rounded-4 overflow-hidden fv-aspect-16-10">
                  <img src={rel.image} alt={rel.title} className="position-absolute fv-inset-0 w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-105" loading="lazy"/>
                  <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-40 fv-to-transparent"/>
                  <div className="position-absolute fv-bottom-0 fv-p-5">
                    <CategoryBadge category={rel.category}/>
                    <h3 className="fv-display-font fv-text-xl fv-text-paper-50 fv-tracking-wide fv-mt-2 fv-clamp-2 fv-group-hover-text-brand-400 fv-transition-colors">
                      {rel.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="position-absolute fv-top-3 fv-right-3 fv-w-5 fv-h-5 fv-text-paper-50 fv-opacity-0 fv-group-hover-opacity-100 fv-transition-all"/>
                </Link>))}
            </div>
          </div>
        </section>)}
    </article>);
}
