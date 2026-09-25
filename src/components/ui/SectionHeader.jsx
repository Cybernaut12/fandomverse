import { Link } from 'react-router-dom';
export function SectionHeader({ title, subtitle, link, linkLabel, children }) {
    return (<div className="d-flex align-items-end justify-content-between fv-mb-8 fv-md-mb-12 fv-gap-4">
      <div className="flex-fill">
        <h2 className="fv-display-font fv-text-4xl fv-md-text-5xl fv-lg-text-6xl fv-text-paper-50 fv-tracking-wide fv-leading-none">
          {title}
        </h2>
        {subtitle && (<p className="fv-mt-3 fv-text-paper-300 fv-text-sm fv-md-text-base fv-max-w-2xl">{subtitle}</p>)}
        {children}
      </div>
      {link && (<Link to={link} className="d-none fv-sm-block flex-shrink-0 fv-text-sm fv-heading-font fv-font-medium fv-text-brand-400 fv-hover-text-brand-300 fv-transition-colors border-bottom fv-border-brand-400-30 fv-hover-border-brand-300 fv-pb-0-5">
          {linkLabel || 'View all'}
        </Link>)}
    </div>);
}
