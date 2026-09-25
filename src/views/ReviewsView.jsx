import React, { useState } from 'react';
import { Star, ThumbsUp, Plus, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const ReviewsView = () => {
    const { reviews, setIsReviewModalOpen, setSelectedMedia, mediaList } = useApp();
    const [filterCategory, setFilterCategory] = useState('all');
    const [likedReviews, setLikedReviews] = useState({});
    const filteredReviews = reviews.filter(rev => {
        if (filterCategory === 'all')
            return true;
        return rev.mediaCategory === filterCategory;
    });
    const toggleLike = (id) => {
        setLikedReviews(prev => ({ ...prev, [id]: !prev[id] }));
    };
    return (<div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Header and Write Review Button (Screen 7) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
              Reviews
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold">
              Community
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Thoughtful takes from fans, critics, and the community.
          </p>
        </div>

        <button onClick={() => setIsReviewModalOpen(true)} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center space-x-2 self-start sm:self-auto active:scale-95">
          <Plus className="w-4 h-4"/>
          <span>Write a Review</span>
        </button>
      </div>

      {/* Category Filter Pills (Screen 7: All, Movies, TV Shows, Anime, Manga, Games) */}
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none text-xs pb-1">
        {[
            { id: 'all', label: 'All Reviews' },
            { id: 'movies', label: 'Movies' },
            { id: 'tv-shows', label: 'TV Shows' },
            { id: 'anime', label: 'Anime' },
            { id: 'manga', label: 'Manga' },
            { id: 'gaming', label: 'Games' },
            { id: 'comics', label: 'Comics' },
            { id: 'k-pop', label: 'K-Pop' }
        ].map(cat => (<button key={cat.id} onClick={() => setFilterCategory(cat.id)} className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${filterCategory === cat.id
                ? 'bg-purple-600 text-white font-bold shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}>
            {cat.label}
          </button>))}
      </div>

      {/* Reviews Cards List (Screen 7) */}
      <div className="space-y-4">
        {filteredReviews.map(rev => {
            const isLiked = likedReviews[rev.id];
            const media = mediaList.find(m => m.id === rev.mediaId || m.title === rev.mediaTitle);
            return (<div key={rev.id} className="p-5 sm:p-6 rounded-2xl glass-card border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row items-start justify-between gap-5">
              {/* Review Content */}
              <div className="space-y-3 flex-1">
                
                {/* Author Info & Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={rev.avatar} alt={rev.author} className="w-9 h-9 rounded-full object-cover ring-1 ring-purple-500/50"/>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs sm:text-sm font-bold text-white">{rev.author}</span>
                        {rev.badge && (<span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            {rev.badge}
                          </span>)}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-amber-400 text-xs font-mono font-bold">
                    <Star className="w-4 h-4 fill-amber-400"/>
                    <span>{rev.rating.toFixed(1)} / 5</span>
                  </div>
                </div>

                {/* Review Title & Content */}
                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {rev.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {rev.content}
                  </p>
                </div>

                {/* Bottom Upvote & Feedback */}
                <div className="pt-2 flex items-center space-x-4 text-xs text-slate-400">
                  <button onClick={() => toggleLike(rev.id)} className={`flex items-center space-x-1.5 hover:text-cyan-400 transition-colors ${isLiked ? 'text-cyan-400 font-bold' : ''}`}>
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-cyan-400' : ''}`}/>
                    <span>{rev.likes + (isLiked ? 1 : 0)} Helpful</span>
                  </button>

                  <span className="flex items-center space-x-1 hover:text-slate-300 cursor-pointer">
                    <MessageCircle className="w-3.5 h-3.5"/>
                    <span>Discuss (12)</span>
                  </span>
                </div>
              </div>

              {/* Right: Side Poster for the Title (Screen 7 style) */}
              {media && (<div onClick={() => setSelectedMedia(media)} className="w-full md:w-36 rounded-xl glass-panel border border-white/10 p-2.5 flex md:flex-col items-center md:items-stretch space-x-3 md:space-x-0 md:space-y-2 cursor-pointer hover:border-cyan-400/50 hover:scale-105 transition-all flex-shrink-0">
                  <img src={media.coverImage} alt={media.title} className="w-12 h-16 md:w-full md:aspect-[3/4] rounded-lg object-cover"/>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{media.title}</h4>
                    <p className="text-[10px] text-cyan-400 font-mono">{media.year} • {media.rating} ★</p>
                  </div>
                </div>)}

            </div>);
        })}
      </div>

    </div>);
};
