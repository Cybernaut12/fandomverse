import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
export function NotFoundPage() {
    return (<div className="min-vh-100 fv-bg-ink-900 d-flex align-items-center justify-content-center fv-pt-16">
      <div className="text-center fv-px-4">
        <Compass className="fv-w-16 fv-h-16 fv-text-brand-400 mx-auto fv-mb-6 fv-animate-pulse-soft"/>
        <h1 className="fv-display-font fv-text-7xl fv-md-text-9xl fv-text-paper-50 fv-tracking-wide">404</h1>
        <p className="fv-text-xl fv-text-paper-300 fv-mt-4 fv-mb-8">This page wandered off into another fandom.</p>
        <Link to="/" className="d-inline-block fv-px-6 fv-py-3 fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900 fv-heading-font fv-font-semibold rounded-3 fv-transition-colors">
          Back to FandomVerse
        </Link>
      </div>
    </div>);
}
