import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
export function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
    if (!isOpen)
        return null;
    return (<>
      <div className="position-fixed fv-inset-0 fv-z-90 fv-bg-ink-900-70 fv-backdrop-blur-sm fv-animate-fade-in" onClick={closeCart} aria-hidden="true"/>
      <aside className="position-fixed fv-top-0 fv-right-0 fv-bottom-0 fv-z-91 w-100 fv-max-w-md fv-bg-ink-800 fv-border-l fv-border-ink-600 d-flex flex-column fv-animate-slide-in-right" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="d-flex align-items-center justify-content-between fv-p-5 border-bottom fv-border-ink-600">
          <div className="d-flex align-items-center gap-2">
            <ShoppingBag className="fv-w-5 fv-h-5 fv-text-brand-400"/>
            <h2 className="fv-heading-font fv-text-lg fv-font-semibold fv-text-paper-50">
              Your Cart {totalItems > 0 && `(${totalItems})`}
            </h2>
          </div>
          <button onClick={closeCart} className="fv-text-paper-300 fv-hover-text-paper-50 fv-transition-colors fv-p-1" aria-label="Close cart">
            <X className="fv-w-5 fv-h-5"/>
          </button>
        </div>

        {items.length === 0 ? (<div className="flex-fill d-flex flex-column align-items-center justify-content-center fv-px-6 text-center fv-gap-4">
            <ShoppingBag className="fv-w-12 fv-h-12 fv-text-ink-500"/>
            <p className="fv-text-paper-300">Your cart is empty.</p>
            <p className="fv-text-sm fv-text-paper-300-60">
              Browse the merchandise section to add items.
            </p>
            <Link to="/#merchandise" onClick={closeCart} className="fv-mt-2 fv-text-brand-400 fv-hover-text-brand-300 fv-heading-font fv-text-sm border-bottom fv-border-brand-400-30">
              Browse merchandise
            </Link>
          </div>) : (<>
            <div className="flex-fill overflow-auto fv-p-5 fv-space-y-4">
              {items.map((item) => {
                const cat = categories.find((c) => c.slug === item.category);
                return (<div key={item.id} className="d-flex fv-gap-3 fv-bg-ink-700 rounded-3 fv-p-3 border fv-border-ink-600">
                    <img src={item.image} alt={item.name} className="fv-w-20 fv-h-20 rounded-2 object-fit-cover flex-shrink-0" loading="lazy"/>
                    <div className="flex-fill ">
                      <h3 className="fv-text-sm fv-heading-font fv-font-medium fv-text-paper-50 fv-clamp-2">
                        {item.name}
                      </h3>
                      {cat && (<div className="fv-mt-1">
                          <CategoryBadge category={cat.slug} size="sm"/>
                        </div>)}
                      <p className="fv-text-sm fv-text-brand-400 fv-font-semibold fv-mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="d-flex align-items-center gap-2 fv-mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="fv-p-1 fv-rounded fv-bg-ink-600 fv-hover-bg-ink-500 fv-text-paper-300 fv-transition-colors" aria-label="Decrease quantity">
                          <Minus className="fv-w-3 fv-h-3"/>
                        </button>
                        <span className="fv-text-sm fv-text-paper-100 fv-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="fv-p-1 fv-rounded fv-bg-ink-600 fv-hover-bg-ink-500 fv-text-paper-300 fv-transition-colors" aria-label="Increase quantity">
                          <Plus className="fv-w-3 fv-h-3"/>
                        </button>
                        <button onClick={() => removeItem(item.id)} className="fv-ml-auto fv-p-1 fv-text-paper-300-60 fv-hover-text-red-400 fv-transition-colors" aria-label={`Remove ${item.name} from cart`}>
                          <Trash2 className="fv-w-4 fv-h-4"/>
                        </button>
                      </div>
                    </div>
                  </div>);
            })}
            </div>

            <div className="border-top fv-border-ink-600 fv-p-5 fv-space-y-3">
              <div className="d-flex align-items-center justify-content-between">
                <span className="fv-text-paper-300 fv-text-sm">Total ({totalItems} items)</span>
                <span className="fv-text-paper-50 fv-heading-font fv-text-xl fv-font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <p className="fv-text-xs fv-text-paper-300-50">
                This is a browse-only cart. No checkout or payment — just a way to track items you\'re interested in.
              </p>
              <button onClick={clearCart} className="w-100 fv-py-2-5 rounded-3 border fv-border-ink-500 fv-text-paper-300 fv-hover-text-paper-50 fv-hover-border-ink-400 fv-transition-colors fv-text-sm fv-heading-font">
                Clear cart
              </button>
            </div>
          </>)}
      </aside>
    </>);
}
