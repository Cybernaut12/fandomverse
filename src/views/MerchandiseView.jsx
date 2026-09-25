import React, { useState } from 'react';
import { ShoppingBag, Star, Plus, Check, ShieldAlert, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const MerchandiseView = () => {
    const { merchandise, addToCart, setIsCartOpen, cartItemCount } = useApp();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [addedItemMap, setAddedItemMap] = useState({});
    const filteredMerch = merchandise.filter(item => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory)
            return false;
        if (selectedType !== 'all' && item.itemType.toLowerCase() !== selectedType.toLowerCase())
            return false;
        return true;
    });
    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedItemMap(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedItemMap(prev => ({ ...prev, [product.id]: false }));
        }, 1200);
    };
    return (<div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Header and Cart Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
              Merchandise Showcase
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold">
              Officially Licensed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Collectibles, apparel, accessories, plushies, and figures from your favorite universes.
          </p>
        </div>

        <button onClick={() => setIsCartOpen(true)} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center space-x-2 self-start sm:self-auto active:scale-95">
          <ShoppingBag className="w-4 h-4 text-cyan-400"/>
          <span>View Cart ({cartItemCount})</span>
        </button>
      </div>

      {/* SRS Compliance Notice Banner (SRS page 12) */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start space-x-3 text-xs text-amber-200 leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"/>
        <div>
          <strong className="text-amber-300">Technical Specification Requirement:</strong> This merchandise showcase demonstrates temporary cart functionality, allowing visitors to add items and compute real-time JavaScript billing totals. Real payment gateways and checkout are intentionally disabled.
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="p-4 rounded-xl glass-card border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Filter */}
        <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All Universes' },
            { id: 'manga', label: 'Manga' },
            { id: 'anime', label: 'Anime' },
            { id: 'movies', label: 'Movies' },
            { id: 'gaming', label: 'Gaming' },
            { id: 'k-pop', label: 'K-Pop' },
            { id: 'comics', label: 'Comics' },
            { id: 'tv-shows', label: 'TV Shows' }
        ].map(c => (<button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${selectedCategory === c.id
                ? 'bg-purple-600 text-white font-bold shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}>
              {c.label}
            </button>))}
        </div>

        {/* Item Type Dropdown */}
        <div className="flex items-center space-x-2 text-xs">
          <Tag className="w-3.5 h-3.5 text-slate-400"/>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400">
            <option value="all">All Product Types</option>
            <option value="apparel">Apparel (Hoodies, Tees, Joggers)</option>
            <option value="figures">Figures & Statues</option>
            <option value="drinkware">Mugs & Drinkware</option>
            <option value="collectibles">Collectibles & Replicas</option>
            <option value="accessories">Accessories & Caps</option>
            <option value="plushies">Plushies</option>
            <option value="art prints">Art Prints</option>
          </select>
        </div>

      </div>

      {/* Merchandise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredMerch.map(item => {
            const isAdded = addedItemMap[item.id];
            return (<div key={item.id} className="p-4 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/50 flex flex-col justify-between space-y-4 group transition-all">
              <div className="space-y-3">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900">
                  <img src={item.image} alt={item.name} onError={(e) => {
                    e.target.src = 'https://files.cdn.printful.com/o/upload/product-catalog-img/fb/fb56069c088406ddf01d7b15b61e49d8_l';
                }} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  {item.badge && (<span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 text-cyan-300 border border-cyan-400/30">
                      {item.badge}
                    </span>)}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-amber-400 text-xs font-mono font-bold flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-amber-400"/>
                    <span>{item.rating.toFixed(1)}</span>
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-purple-400 font-semibold">
                    <span>{item.franchise}</span>
                    <span className="text-slate-400">{item.itemType}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors mt-0.5 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-white font-mono">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.originalPrice && (<span className="text-xs text-slate-500 line-through ml-2 font-mono">
                      ${item.originalPrice.toFixed(2)}
                    </span>)}
                </div>

                <button onClick={() => handleAddToCart(item)} className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 active:scale-95 ${isAdded
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'}`}>
                  {isAdded ? <Check className="w-3.5 h-3.5"/> : <Plus className="w-3.5 h-3.5"/>}
                  <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>);
        })}
      </div>

    </div>);
};
