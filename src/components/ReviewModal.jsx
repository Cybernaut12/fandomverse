import React, { useState } from 'react';
import { X, Star, MessageSquareQuote, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const ReviewModal = () => {
    const { isReviewModalOpen, setIsReviewModalOpen, addReview, mediaList, userProfile } = useApp();
    const [selectedMediaId, setSelectedMediaId] = useState(mediaList[0]?.id || '');
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [badge, setBadge] = useState('Fan Review');
    const [submitted, setSubmitted] = useState(false);
    if (!isReviewModalOpen)
        return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        const media = mediaList.find(m => m.id === selectedMediaId);
        addReview({
            mediaId: selectedMediaId,
            mediaTitle: media ? media.title : 'Fandom Title',
            mediaCategory: media ? media.category : 'anime',
            mediaPoster: media ? media.coverImage : undefined,
            author: userProfile.name,
            avatar: userProfile.avatar,
            rating,
            title: title.trim() || 'A thoughtful take on this world',
            content: content.trim() || 'Incredible experience from start to finish.',
            badge
        });
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setIsReviewModalOpen(false);
            setTitle('');
            setContent('');
        }, 1000);
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel border border-white/10 shadow-2xl p-6 text-slate-200 space-y-5" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
          <X className="w-5 h-5"/>
        </button>

        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <MessageSquareQuote className="w-5 h-5"/>
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-heading">Write a Community Review</h2>
            <p className="text-xs text-slate-400">Share your impressions with fellow fandom fans</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Select Title */}
          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Select Fandom / Title</label>
            <select value={selectedMediaId} onChange={(e) => setSelectedMediaId(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400">
              {mediaList.map(item => (<option key={item.id} value={item.id} className="bg-slate-900 text-white">
                  [{item.category.toUpperCase()}] {item.title} ({item.year})
                </option>))}
            </select>
          </div>

          {/* Star Rating Picker */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-medium">Your Star Rating: {rating} / 5</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (<button type="button" key={star} onClick={() => setRating(star)} className="p-1 hover:scale-110 transition-transform">
                  <Star className={`w-6 h-6 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}/>
                </button>))}
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Review Headline</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. A masterclass in atmosphere and character depth" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400" required/>
          </div>

          {/* Body Content */}
          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Your Detailed Review</label>
            <textarea rows={4} value={content} onChange={(e) => setContent(e.target.value)} placeholder="What made this world stand out? How were the performances, lore, animation, or music?" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400 leading-relaxed" required/>
          </div>

          {submitted && (<div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center space-x-2">
              <Check className="w-4 h-4 flex-shrink-0"/>
              <span>Review successfully posted to FandomVerse community!</span>
            </div>)}

          <div className="pt-2 flex justify-end space-x-2">
            <button type="button" onClick={() => setIsReviewModalOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-600/30">
              Submit Review
            </button>
          </div>
        </form>

      </div>
    </div>);
};
