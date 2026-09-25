import { Link } from 'react-router-dom';
import { Compass, Heart, Users, Globe, Sparkles } from 'lucide-react';
import { categories } from '@/data/categories';
export function AboutPage() {
    return (<div className="min-vh-100 fv-bg-ink-900 fv-pt-16">
      {/* Hero */}
      <section className="position-relative fv-h-40vh fv-min-h-300px d-flex align-items-end overflow-hidden">
        <img src="https://images.pexels.com/photos/33327474/pexels-photo-33327474.png?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2" alt="Collection of anime figurines and collectibles" className="position-absolute fv-inset-0 w-100 h-100 object-fit-cover" fetchPriority="high"/>
        <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-70 fv-to-ink-900-30"/>
        <div className="position-relative container-wide fv-pb-10 fv-z-10">
          <p className="fv-text-sm fv-heading-font fv-uppercase fv-tracking-widest fv-text-brand-400 fv-mb-2">About</p>
          <h1 className="fv-display-font fv-text-5xl fv-md-text-6xl fv-lg-text-7xl fv-text-paper-50 fv-tracking-wide fv-leading-none fv-text-shadow-lg">
            What is FandomVerse?
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="fv-py-12 fv-md-py-16">
        <div className="container-narrow">
          <div className="prose prose-invert fv-max-w-none">
            <p className="fv-text-paper-100 fv-text-lg fv-leading-relaxed fv-body-font" style={{ lineHeight: 1.8 }}>
              If you love anime, you probably also have opinions about at least three other things —
              a game you sank a hundred hours into, a TV show you rewatch every year, a K-Pop fv-group
              whose choreography you've tried to learn in your bedroom. Fandoms don't live in isolation.
              They overlap, they cross-pollinate, and the people who care about them are the same people.
            </p>
            <p className="fv-text-paper-100 fv-text-lg fv-leading-relaxed fv-body-font fv-mt-4" style={{ lineHeight: 1.8 }}>
              FandomVerse exists because finding all of that in one place shouldn't be hard.
              Entertainment content is scattered across dozens of sites — news here, trailers there,
              merchandise somewhere else entirely. We wanted to build something that feels less like
              a content aggregator and more like a magazine you actually want to read.
            </p>
          </div>

          {/* Values */}
          <div className="fv-grid fv-grid-cols-1 fv-md-grid-cols-2 fv-gap-6 fv-mt-12">
            {[
            { icon: <Heart className="fv-w-6 fv-h-6 fv-text-brand-400"/>, title: 'Built by fans, for fans', text: 'Every article, character profile, and event listing is written with genuine enthusiasm. We cover what we actually care about.' },
            { icon: <Globe className="fv-w-6 fv-h-6 fv-text-brand-400"/>, title: 'Seven fandoms, one place', text: 'Anime, gaming, movies, TV shows, K-Pop, comics, and manga — all under one roof, each with its own identity but sharing the same space.' },
            { icon: <Users className="fv-w-6 fv-h-6 fv-text-brand-400"/>, title: 'Community first', text: 'Bookmarks, personal notes, a helpful guide, and content that respects your time. No accounts required, no data collected.' },
            { icon: <Sparkles className="fv-w-6 fv-h-6 fv-text-brand-400"/>, title: 'Visual storytelling', text: 'We believe design matters. Large imagery, editorial layouts, and typography that makes reading feel good.' },
        ].map((value) => (<div key={value.title} className="fv-bg-ink-800 rounded-3 fv-p-6 border fv-border-ink-600">
                <div className="fv-mb-3">{value.icon}</div>
                <h3 className="fv-heading-font fv-text-lg fv-font-semibold fv-text-paper-50 fv-mb-2">{value.title}</h3>
                <p className="fv-text-sm fv-text-paper-300 fv-leading-relaxed">{value.text}</p>
              </div>))}
          </div>

          {/* Categories */}
          <div className="fv-mt-12">
            <h2 className="fv-display-font fv-text-3xl fv-text-paper-50 fv-tracking-wide fv-mb-6">The Seven Worlds</h2>
            <div className="fv-grid fv-grid-cols-1 fv-sm-grid-cols-2 fv-lg-grid-cols-4 fv-gap-3">
              {categories.map((cat) => (<Link key={cat.slug} to={`/category/${cat.slug}`} className="fv-group d-flex align-items-center fv-gap-3 fv-bg-ink-800 fv-hover-bg-ink-700 rounded-3 fv-p-4 border fv-border-ink-600 fv-hover-border-ink-500 fv-transition-all">
                  <span className="fv-w-3 fv-h-3 rounded-pill flex-shrink-0" style={{ backgroundColor: cat.accentColor }}/>
                  <div className="">
                    <h3 className="fv-heading-font fv-text-sm fv-font-medium fv-text-paper-50 fv-group-hover-text-brand-400 fv-transition-colors">{cat.name}</h3>
                    <p className="fv-text-xs fv-text-paper-300-60 fv-clamp-1">{cat.tagline}</p>
                  </div>
                </Link>))}
            </div>
          </div>

          {/* What you can do */}
          <div className="fv-mt-12 fv-bg-ink-800 rounded-3 fv-p-6 fv-md-p-8 border fv-border-ink-600">
            <h2 className="fv-display-font fv-text-3xl fv-text-paper-50 fv-tracking-wide fv-mb-4">What You Can Do Here</h2>
            <ul className="fv-space-y-2 fv-text-paper-200">
              <li className="d-flex align-items-start gap-2"><span className="fv-text-brand-400 fv-mt-1">•</span> Read articles written like real entertainment coverage, not press releases</li>
              <li className="d-flex align-items-start gap-2"><span className="fv-text-brand-400 fv-mt-1">•</span> Explore character profiles with traits, bios, and related content</li>
              <li className="d-flex align-items-start gap-2"><span className="fv-text-brand-400 fv-mt-1">•</span> Watch trailers, interviews, and fan content across all seven fandoms</li>
              <li className="d-flex align-items-start gap-2"><span className="fv-text-brand-400 fv-mt-1">•</span> Browse galleries with a full-screen lightbox viewer</li>
              <li className="d-flex align-items-start gap-2"><span className="fv-text-brand-400 fv-mt-1">•</span> Track upcoming releases with a visual calendar</li>
              <li className="d-flex align-items-start gap-2"><span className="fv-text-brand-400 fv-mt-1">•</span> Discover events — conventions, festivals, tours, and premieres</li>
              <li className="d-flex align-items-start gap-2"><span className="fv-text-brand-400 fv-mt-1">•</span> Browse merchandise and keep a cart of items you're interested in</li>
              <li className="d-flex align-items-start gap-2"><span className="fv-text-brand-400 fv-mt-1">•</span> Bookmark anything and add personal notes for this session</li>
              <li className="d-flex align-items-start gap-2"><span className="fv-text-brand-400 fv-mt-1">•</span> Search across all content with filters and sorting</li>
            </ul>
          </div>

          <div className="fv-mt-8 text-center">
            <Link to="/" className="d-inline-flex align-items-center gap-2 fv-px-6 fv-py-3 fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900 fv-heading-font fv-font-semibold rounded-3 fv-transition-colors">
              <Compass className="fv-w-5 fv-h-5"/>
              Start Exploring
            </Link>
          </div>
        </div>
      </section>
    </div>);
}
