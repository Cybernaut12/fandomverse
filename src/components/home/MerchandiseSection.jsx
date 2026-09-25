import { Plus, Check } from 'lucide-react';
import { merchandise } from '@/data/merchandise';
import { categories } from '@/data/categories';
import { useCart } from '@/context/CartContext';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { MerchandiseDetailsDialog } from '@/components/MerchandiseDetailsDialog';
import { useState } from 'react';
export function MerchandiseSection() {
    const { addItem } = useCart();
    const [addedIds, setAddedIds] = useState(new Set());
    const [selectedProduct, setSelectedProduct] = useState(null);
    const featured = merchandise.slice(0, 8);
    const handleAdd = (id) => {
        const item = merchandise.find((m) => m.id === id);
        if (item) {
            addItem(item);
            setAddedIds((prev) => new Set(prev).add(id));
            setTimeout(() => {
                setAddedIds((prev) => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
            }, 1500);
        }
    };
    return (<section id="merchandise" className="section-padding fv-bg-ink-900 fv-grid-texture">
      <div className="container-wide">
        <SectionHeader title="Merchandise" subtitle="Figures, apparel, collectibles, and more from across the fandoms. Add items to your cart to keep track of what catches your eye."/>

        <div className="fv-grid fv-grid-cols-2 fv-md-grid-cols-3 fv-lg-grid-cols-4 fv-gap-4">
          {featured.map((item) => {
            const cat = categories.find((c) => c.slug === item.category);
            const isAdded = addedIds.has(item.id);
            return (<div key={item.id} className="fv-group fv-bg-ink-800 rounded-3 overflow-hidden border fv-border-ink-600 fv-hover-border-ink-500 fv-transition-all">
                <div className="position-relative fv-aspect-square overflow-hidden fv-bg-ink-700">
                  <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-cover fv-transition-transform fv-duration-700 fv-group-hover-scale-110" loading="lazy"/>
                  <span className="position-absolute fv-top-2 fv-left-2 fv-text-10px fv-px-2 fv-py-0-5 rounded-pill fv-heading-font fv-uppercase fv-tracking-wider fv-backdrop-blur-sm" style={{
                    color: cat?.accentColor,
                    backgroundColor: 'rgba(10,10,15,0.7)',
                    border: `1px solid ${cat?.accentColor}40`,
                }}>
                    {item.type}
                  </span>
                </div>

                <div className="fv-p-4">
                  <CategoryBadge category={item.category}/>
                  <h3 className="fv-text-sm fv-heading-font fv-font-medium fv-text-paper-50 fv-mt-2 fv-clamp-2 fv-leading-tight">
                    {item.name}
                  </h3>
                  <p className="fv-text-xs fv-text-paper-300-60 fv-mt-1 fv-clamp-2">{item.description}</p>

                  <button type="button" onClick={() => setSelectedProduct(item)} className="fv-mt-2 fv-text-xs fv-heading-font fv-text-brand-300 fv-hover-text-brand-200 text-decoration-underline">
                    View product details
                  </button>

                  <div className="d-flex align-items-center justify-content-between fv-mt-3">
                    <div>
                      <span className="fv-text-lg fv-display-font fv-text-brand-400">${item.price}</span>
                      <span className="fv-text-xs fv-text-paper-300-40 fv-ml-1">{item.priceRange}</span>
                    </div>
                    <button onClick={() => handleAdd(item.id)} disabled={isAdded} className={`fv-p-2 rounded-3 fv-transition-all fv-active-scale-90 ${isAdded
                    ? 'fv-bg-gaming fv-text-ink-900'
                    : 'fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900'}`} aria-label={`Add ${item.name} to cart`}>
                      {isAdded ? <Check className="fv-w-4 fv-h-4"/> : <Plus className="fv-w-4 fv-h-4"/>}
                    </button>
                  </div>
                </div>
              </div>);
        })}
        </div>
      </div>
      <MerchandiseDetailsDialog
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(item) => handleAdd(item.id)}
      />
    </section>);
}
