import { categoryMap } from '@/data/categories';
export function CategoryBadge({ category, size = 'sm' }) {
    const cat = categoryMap[category];
    if (!cat)
        return null;
    const sizeClasses = size === 'sm' ? 'fv-text-xs fv-px-2-5 fv-py-1' : 'fv-text-sm fv-px-3 fv-py-1-5';
    return (<span className={`d-inline-block fv-heading-font fv-font-semibold fv-uppercase fv-tracking-wider fv-rounded ${sizeClasses}`} style={{
            color: cat.accentColor,
            backgroundColor: `${cat.accentColor}1a`,
            border: `1px solid ${cat.accentColor}40`,
        }}>
      {cat.name}
    </span>);
}
