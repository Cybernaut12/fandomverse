import React from 'react';
import { X, Sparkles, Quote, Award, Bookmark, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CharacterModal: React.FC = () => {
  const { selectedCharacter, setSelectedCharacter, toggleBookmark, isBookmarked, navigateToCategory } = useApp();

  if (!selectedCharacter) return null;

  const char = selectedCharacter;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-white/10 shadow-2xl p-6 text-slate-200 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedCharacter(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Character Header: Image + Basic Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2">
          <img
            src={char.image}
            alt={char.name}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover ring-2 ring-purple-500/50 shadow-xl shadow-purple-500/10 flex-shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left flex-grow">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {char.role}
              </span>
              <button
                onClick={() => {
                  setSelectedCharacter(null);
                  navigateToCategory(char.category);
                }}
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
              >
                {char.category.replace('-', ' ')}
              </button>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">{char.name}</h2>
              {char.japaneseName && (
                <p className="text-xs font-mono text-slate-400">{char.japaneseName}</p>
              )}
            </div>

            <p className="text-xs font-medium text-cyan-400">
              Franchise: <span className="text-white">{char.series}</span>
            </p>

            {char.actorOrVoice && (
              <p className="text-[11px] text-slate-400">
                Voice / Portrayal: <span className="text-slate-300">{char.actorOrVoice}</span>
              </p>
            )}
          </div>
        </div>

        {/* Traits & Abilities Badges */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Traits & Qualities</h4>
          <div className="flex flex-wrap gap-1.5">
            {char.traits.map((trait, idx) => (
              <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                {trait}
              </span>
            ))}
          </div>
        </div>

        {char.powersOrSkills && char.powersOrSkills.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Powers & Signature Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {char.powersOrSkills.map((power, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono">
                  {power}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Biography */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Biography & Lore</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {char.biography}
          </p>
        </div>

        {/* Memorable Quotes */}
        {char.quotes && char.quotes.length > 0 && (
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-2">
            <div className="flex items-center space-x-1.5 text-purple-300 text-xs font-semibold">
              <Quote className="w-3.5 h-3.5" />
              <span>Memorable Quotes</span>
            </div>
            {char.quotes.map((q, idx) => (
              <p key={idx} className="text-xs italic text-purple-200">
                "{q}"
              </p>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => toggleBookmark(char.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all flex items-center space-x-2 ${
              isBookmarked(char.id)
                ? 'bg-amber-500 text-black border-amber-500 font-semibold'
                : 'glass-panel text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(char.id) ? 'fill-current' : ''}`} />
            <span>{isBookmarked(char.id) ? 'Bookmarked' : 'Bookmark Character'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
