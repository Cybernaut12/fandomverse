import React from 'react';
import { X, Clock, Calendar, Heart, Share2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ArticleDetailModal: React.FC = () => {
  const { selectedArticle, setSelectedArticle, mediaList, setSelectedMedia } = useApp();

  if (!selectedArticle) return null;

  const article = selectedArticle;

  const relatedTitles = mediaList.filter(m => article.relatedMediaIds.includes(m.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-white/10 shadow-2xl p-6 sm:p-8 text-slate-200 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedArticle(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Image */}
        <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover filter brightness-[0.85]"
          />
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-purple-500/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
            {article.category.replace('-', ' ')}
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight">
            {article.title}
          </h2>
          <p className="text-sm text-slate-300 font-medium italic">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-3 border-b border-white/10 text-xs text-slate-400">
            <div className="flex items-center space-x-2.5">
              <img
                src={article.authorAvatar}
                alt={article.author}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-purple-500/50"
              />
              <div>
                <p className="font-semibold text-white">{article.author}</p>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span>{article.publishDate}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{article.readTime}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1 text-pink-400 font-mono">
                <Heart className="w-3.5 h-3.5 fill-pink-400" />
                <span>{article.likes.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Article Body Paragraphs */}
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Article Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {article.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono">
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Titles Spotlight */}
        {relatedTitles.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Related Fandoms Mentioned in this Feature
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {relatedTitles.map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedArticle(null);
                    setSelectedMedia(item);
                  }}
                  className="p-2.5 rounded-xl glass-card border border-white/10 cursor-pointer hover:border-cyan-400/50 flex items-center space-x-3 group transition-all"
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-12 h-16 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h5 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                      {item.title}
                    </h5>
                    <p className="text-[10px] text-slate-400">{item.rating} ★</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
