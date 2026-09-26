import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getCharacterById, getCharactersByCategory } from '@/data/characters';
import { getCategory } from '@/data/categories';
import { getArticlesByCategory } from '@/data/articles';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
export function CharacterDetailPage() {
    const { id } = useParams();
    const character = id ? getCharacterById(id) : undefined;
    if (!character) {
        return (<div className="min-vh-100 d-flex align-items-center justify-content-center fv-bg-ink-900 fv-pt-20">
        <div className="text-center">
          <p className="fv-text-paper-300 fv-mb-4">Character not found.</p>
          <Link to="/" className="fv-text-brand-400 fv-hover-text-brand-300">Back home</Link>
        </div>
      </div>);
    }
    const cat = getCategory(character.category);
    const related = getCharactersByCategory(character.category)
        .filter((c) => c.id !== character.id)
        .slice(0, 4);
    const relatedArticles = getArticlesByCategory(character.category).slice(0, 2);
    return (<div className="min-vh-100 fv-bg-ink-900 fv-pt-16">
      {/* Hero with immersive split layout */}
      <section className="position-relative d-flex flex-column fv-md-flex-row fv-min-h-60vh">
        {/* Image */}
        <div className="position-relative fv-md-w-2-5 fv-h-40vh fv-md-h-auto overflow-hidden">
          <img src={character.image} alt={character.altText} className="w-100 h-100 object-fit-cover" fetchPriority="high"/>
          <div className="position-absolute fv-inset-0 fv-bg-gradient-to-r fv-from-transparent fv-to-ink-900-60 fv-md-to-ink-900"/>
          <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900-60 fv-to-transparent fv-md-hidden"/>
        </div>

        {/* Info */}
        <div className="position-relative fv-md-w-3-5 d-flex align-items-end fv-p-6 fv-md-p-12 fv-lg-p-16">
          {cat && (<div className="position-absolute fv-inset-0 fv-opacity-10" style={{ background: `linear-gradient(135deg, ${cat.accentColor}, transparent 60%)` }}/>)}
          <div className="position-relative fv-z-10">
            <Link to={`/category/${character.category}`} className="d-inline-flex align-items-center fv-gap-1 fv-text-sm fv-text-paper-300 fv-hover-text-paper-50 fv-mb-4 fv-transition-colors">
              <ArrowLeft className="fv-w-4 fv-h-4"/>
              Back to {cat?.name}
            </Link>
            <div className="fv-mb-3">
              <CategoryBadge category={character.category} size="md"/>
            </div>
            <h1 className="fv-display-font fv-text-5xl fv-md-text-6xl fv-lg-text-7xl fv-text-paper-50 fv-tracking-wide fv-leading-none">
              {character.name}
            </h1>
            <p className="fv-mt-3 fv-text-xl fv-text-paper-300 fv-heading-font">{character.series}</p>

            {/* Traits */}
            <div className="d-flex flex-wrap gap-2 fv-mt-5">
              {character.traits.map((trait) => (<span key={trait} className="fv-text-xs fv-px-3 fv-py-1 rounded-pill fv-heading-font" style={{
                color: cat?.accentColor,
                backgroundColor: `${cat?.accentColor}15`,
                border: `1px solid ${cat?.accentColor}30`,
            }}>
                  {trait}
                </span>))}
            </div>

            <div className="fv-mt-6">
              <BookmarkButton id={character.id} type="character" title={character.name} category={character.category} image={character.image} url={`/character/${character.id}`}/>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="fv-py-12 fv-md-py-16">
        <div className="container-narrow">
          <h2 className="fv-display-font fv-text-3xl fv-text-paper-50 fv-tracking-wide fv-mb-6">Biography</h2>
          <p className="fv-text-paper-100 fv-text-lg fv-leading-relaxed fv-body-font" style={{ lineHeight: 1.8 }}>
            {character.bio}
          </p>
        </div>
      </section>

      {/* Related Characters */}
      {related.length > 0 && (<section className="fv-py-12 fv-bg-ink-800 border-top fv-border-ink-600">
          <div className="container-wide">
            <h2 className="fv-display-font fv-text-3xl fv-text-paper-50 fv-tracking-wide fv-mb-6">More from {cat?.name}</h2>
            <div className="fv-grid fv-grid-cols-2 fv-md-grid-cols-4 fv-gap-3 fv-md-gap-4">
              {related.map((char) => (<Link key={char.id} to={`/character/${char.id}`} className="fv-group position-relative rounded-4 overflow-hidden fv-aspect-3-4">
                  <img src={char.image} alt={char.altText} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-110" loading="lazy"/>
                  <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-20 fv-to-transparent"/>
                  <div className="position-absolute fv-bottom-0 fv-p-3">
                    <h3 className="fv-display-font fv-text-lg fv-text-paper-50 fv-tracking-wide fv-leading-tight">{char.name}</h3>
                    <p className="fv-text-xs fv-text-paper-300 fv-mt-0-5 fv-clamp-1">{char.series}</p>
                  </div>
                </Link>))}
            </div>
          </div>
        </section>)}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (<section className="fv-py-12 fv-bg-ink-900 border-top fv-border-ink-600">
          <div className="container-wide">
            <h2 className="fv-display-font fv-text-3xl fv-text-paper-50 fv-tracking-wide fv-mb-6">Related Articles</h2>
            <div className="fv-grid fv-grid-cols-1 fv-md-grid-cols-2 fv-gap-4">
              {relatedArticles.map((rel) => (<Link key={rel.id} to={`/article/${rel.slug}`} className="fv-group d-flex fv-gap-4 fv-bg-ink-800 fv-hover-bg-ink-700 rounded-3 fv-p-4 border fv-border-ink-600 fv-hover-border-ink-500 fv-transition-all">
                  <img src={rel.image} alt={rel.title} className="fv-w-24 fv-h-24 rounded-2 object-fit-cover flex-shrink-0" loading="lazy"/>
                  <div className="">
                    <CategoryBadge category={rel.category}/>
                    <h3 className="fv-text-sm fv-heading-font fv-font-medium fv-text-paper-100 fv-mt-1-5 fv-clamp-2 fv-group-hover-text-brand-400 fv-transition-colors">{rel.title}</h3>
                    <p className="fv-text-xs fv-text-paper-300-60 fv-mt-1 fv-clamp-2">{rel.excerpt}</p>
                  </div>
                  <ArrowUpRight className="fv-w-5 fv-h-5 fv-text-paper-300-30 fv-group-hover-text-brand-400 fv-transition-all flex-shrink-0 fv-self-center"/>
                </Link>))}
            </div>
          </div>
        </section>)}
    </div>);
}
