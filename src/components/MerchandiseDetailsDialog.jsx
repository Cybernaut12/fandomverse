import { useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { CategoryBadge } from '@/components/ui/CategoryBadge';

export function MerchandiseDetailsDialog({ item, onClose, onAddToCart }) {
  useEffect(() => {
    if (!item) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="position-fixed fv-inset-0 fv-z-100 d-flex align-items-center justify-content-center fv-bg-ink-900-80 fv-backdrop-blur-sm fv-p-3"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
      role="presentation"
    >
      <section
        className="merch-details-dialog w-100 overflow-hidden rounded-4 border fv-border-ink-500 fv-bg-ink-800 fv-shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="merch-details-title"
      >
        <div className="row g-0">
          <div className="col-12 col-md-5">
            <img src={item.image} alt={item.name} className="merch-details-image w-100 h-100 object-fit-cover" />
          </div>
          <div className="col-12 col-md-7 d-flex flex-column fv-p-4 fv-md-p-5">
            <div className="d-flex align-items-start justify-content-between fv-gap-3">
              <div>
                <CategoryBadge category={item.category} />
                <p className="fv-mt-3 fv-text-xs fv-text-brand-300 fv-heading-font fv-uppercase fv-tracking-wider">{item.type}</p>
                <h2 id="merch-details-title" className="fv-mt-1 fv-text-2xl fv-heading-font fv-text-paper-50">{item.name}</h2>
              </div>
              <button type="button" onClick={onClose} className="fv-p-2 fv-text-paper-300 fv-hover-text-paper-50" aria-label="Close product details">
                <X className="fv-w-5 fv-h-5" />
              </button>
            </div>
            <p className="fv-mt-4 fv-text-paper-200 fv-leading-relaxed">{item.description}</p>
            <div className="fv-mt-auto fv-pt-5 d-flex align-items-center justify-content-between fv-gap-3">
              <div>
                <p className="fv-text-2xl fv-display-font fv-text-brand-400">${item.price}</p>
                <p className="fv-text-xs fv-text-paper-300-60">{item.priceRange}</p>
              </div>
              <button type="button" onClick={() => { onAddToCart(item); onClose(); }} className="d-inline-flex align-items-center fv-gap-2 rounded-3 fv-px-4 fv-py-3 fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900 fv-heading-font fv-font-semibold">
                <Plus className="fv-w-4 fv-h-4" /> Add to cart
              </button>
            </div>
            <p className="fv-mt-4 fv-text-xs fv-text-paper-300-50">Browse-only cart. Checkout and payment are not available.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
