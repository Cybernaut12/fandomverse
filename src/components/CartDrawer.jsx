import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, clearCart, cartTotal, cartItemCount, setCurrentView } = useApp();
    const [promoCode, setPromoCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const [promoMessage, setPromoMessage] = useState(null);
    if (!isCartOpen)
        return null;
    const handleApplyPromo = (e) => {
        e.preventDefault();
        const code = promoCode.trim().toUpperCase();
        if (code === 'TECHWIZ7' || code === 'FANDOM20') {
            setDiscountPercent(20);
            setPromoMessage('20% Fandom Discount Applied!');
        }
        else if (code === 'APTECH') {
            setDiscountPercent(15);
            setPromoMessage('15% Aptech Partner Discount Applied!');
        }
        else {
            setDiscountPercent(0);
            setPromoMessage('Invalid coupon code. Try TECHWIZ7');
        }
    };
    const discountAmount = (cartTotal * discountPercent) / 100;
    const shippingEstimate = cartTotal > 100 || cartTotal === 0 ? 0 : 9.99;
    const finalTotal = Math.max(0, cartTotal - discountAmount + (cart.length > 0 ? shippingEstimate : 0));
    return (<div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10" onClick={() => setIsCartOpen(false)}>
        <div className="w-screen max-w-md glass-panel border-l border-white/10 shadow-2xl flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400"/>
              <h2 className="text-base font-bold text-white font-heading">
                Fandom Merchandise Cart ({cartItemCount})
              </h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5"/>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (<div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8"/>
                </div>
                <h3 className="text-sm font-bold text-white">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Explore our officially licensed collectibles, figures, apparel, and replicas across all franchises.
                </p>
                <button onClick={() => {
                setIsCartOpen(false);
                setCurrentView('merchandise');
            }} className="mt-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all">
                  Browse Merchandise
                </button>
              </div>) : (<>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-xs text-slate-400">
                  <span>Items in order</span>
                  <button onClick={clearCart} className="text-rose-400 hover:underline flex items-center space-x-1">
                    <Trash2 className="w-3.5 h-3.5"/>
                    <span>Clear All</span>
                  </button>
                </div>

                {cart.map(({ product, quantity }) => (<div key={product.id} className="p-3.5 rounded-xl glass-card border border-white/10 flex items-center space-x-3">
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0"/>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{product.name}</h4>
                      <p className="text-[10px] text-cyan-400">{product.franchise} • {product.itemType}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-white">
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-1.5 bg-black/40 rounded-lg p-0.5 border border-white/10">
                          <button onClick={() => updateCartQuantity(product.id, quantity - 1)} className="p-1 hover:bg-white/10 rounded text-slate-300">
                            <Minus className="w-3 h-3"/>
                          </button>
                          <span className="text-xs font-mono px-1 font-semibold text-white">{quantity}</span>
                          <button onClick={() => updateCartQuantity(product.id, quantity + 1)} className="p-1 hover:bg-white/10 rounded text-slate-300">
                            <Plus className="w-3 h-3"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>))}

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex space-x-2">
                    <input type="text" placeholder="Coupon (e.g. TECHWIZ7)" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono uppercase"/>
                    <button type="submit" className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors">
                      Apply
                    </button>
                  </div>
                  {promoMessage && (<p className={`text-[11px] mt-1.5 font-mono ${discountPercent > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {promoMessage}
                    </p>)}
                </form>
              </>)}
          </div>

          {/* Billing Calculation Footer (SRS page 12) */}
          {cart.length > 0 && (<div className="p-5 border-t border-white/10 bg-black/40 space-y-3">
              
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white">${cartTotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (<div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%):</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>)}
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span className="font-mono text-white">
                    {shippingEstimate === 0 ? 'FREE (Orders > $100)' : `$${shippingEstimate.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                  <span>Total Billing Amount:</span>
                  <span className="text-cyan-400 font-mono text-base">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Requirement Notice Box */}
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start space-x-2 text-[11px] text-amber-300">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5"/>
                <p className="leading-tight">
                  <strong>Notice:</strong> Temporary cart & billing calculated via JavaScript. Checkout and payment features are excluded as per SRS specifications.
                </p>
              </div>

              <button disabled className="w-full py-3 rounded-xl bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider cursor-not-allowed border border-white/10">
                Checkout Simulation Disabled
              </button>
            </div>)}

        </div>
      </div>
    </div>);
};
