import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { characters } from '@/data/characters';
import { categories } from '@/data/categories';
import { SectionHeader } from '@/components/ui/SectionHeader';
export function CharacterSpotlight() {
    const [activeCategory, setActiveCategory] = useState('anime');
    const filtered = characters.filter((c) => c.category === activeCategory).slice(0, 5);
    return (<section className="section-padding fv-bg-ink-800">
      <div className="container-wide">
        <SectionHeader title="Character Spotlight" subtitle="The faces behind the stories — heroes, villains, and everyone in between." link="/category/anime" linkLabel="Explore all characters"/>

        {/* Category tabs */}
        <div className="d-flex flex-wrap gap-2 fv-mb-8">
          {categories.map((cat) => (<button key={cat.slug} onClick={() => setActiveCategory(cat.slug)} className={`fv-px-4 fv-py-1-5 rounded-pill fv-text-sm fv-heading-font fv-font-medium fv-transition-all ${activeCategory === cat.slug
                ? 'fv-text-ink-900'
                : 'fv-bg-ink-700 fv-text-paper-300 fv-hover-bg-ink-600'}`} style={activeCategory === cat.slug ? { backgroundColor: cat.accentColor } : {}}>
              {cat.name}
            </button>))}
        </div>

        {/* Character fv-grid - editorial layout */}
        <div className="fv-grid fv-grid-cols-2 fv-md-grid-cols-3 fv-lg-grid-cols-5 fv-gap-3 fv-md-gap-4">
          {filtered.map((char, i) => {
            const cat = categories.find((c) => c.slug === char.category);
            const isFirst = i === 0;
            return (<Link key={char.id} to={`/character/${char.id}`} className={`fv-group position-relative rounded-4 overflow-hidden ${isFirst ? 'fv-col-span-2 fv-row-span-2 fv-aspect-square' : 'fv-aspect-3-4'}`}>
                <img src={char.image} alt={char.altText} className="w-100 h-100 object-fit-cover fv-transition-all fv-duration-700 fv-group-hover-scale-110" loading="lazy"/>
                <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-20 fv-to-transparent fv-transition-opacity fv-duration-300 fv-group-hover-from-ink-900-90"/>
                {cat && (<div className="position-absolute fv-top-3 fv-left-3 fv-w-2 fv-h-2 rounded-pill fv-transition-transform fv-group-hover-scale-150" style={{ backgroundColor: cat.accentColor }}/>)}
                <div className="position-absolute fv-bottom-0 fv-left-0 fv-right-0 fv-p-3 fv-md-p-4">
                  <h3 className={`fv-display-font fv-text-paper-50 fv-tracking-wide fv-leading-tight ${isFirst ? 'fv-text-2xl fv-md-text-3xl' : 'fv-text-lg'}`}>
                    {char.name}
                  </h3>
                  <p className="fv-text-xs fv-text-paper-300 fv-mt-0-5 fv-clamp-1">{char.series}</p>
                  {/* Expanded info on hover */}
                  <div className="overflow-hidden fv-max-h-0 fv-group-hover-max-h-32 fv-transition-all duration-400 fv-opacity-0 fv-group-hover-opacity-100">
                    <p className="fv-text-xs fv-text-paper-200 fv-mt-2 fv-clamp-3">{char.bio}</p>
                    <div className="d-flex flex-wrap fv-gap-1 fv-mt-2">
                      {char.traits.slice(0, 3).map((trait) => (<span key={trait} className="fv-text-10px fv-px-2 fv-py-0-5 rounded-pill fv-bg-ink-700-80 fv-text-paper-300">
                          {trait}
                        </span>))}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="position-absolute fv-top-3 fv-right-3 fv-w-5 fv-h-5 fv-text-paper-50 fv-opacity-0 fv-group-hover-opacity-100 fv-transition-all fv-group-hover-translate-x-1 fv-group-hover-translate-y-1"/>
              </Link>);
        })}
        </div>
      </div>
    </section>);
}
