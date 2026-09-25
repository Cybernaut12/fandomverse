import React from 'react';
import { Sparkles, Heart, Shield, Globe, Award, ExternalLink, Share2, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { CategoryType } from '../types';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { setCurrentView, navigateToCategory } = useApp();

  const categories: { label: string; cat: CategoryType }[] = [
    { label: 'Anime Hub', cat: 'anime' },
    { label: 'Gaming Portal', cat: 'gaming' },
    { label: 'Movies & Cinema', cat: 'movies' },
    { label: 'TV Shows & Series', cat: 'tv-shows' },
    { label: 'K-Pop Universe', cat: 'k-pop' },
    { label: 'Comics & Graphic Novels', cat: 'comics' },
    { label: 'Manga Archives', cat: 'manga' }
  ];

  return (
    <footer className="w-full bg-[#06070a] border-t border-white/[0.08] text-slate-400 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={() => setCurrentView('home')}>
              <Logo size="md" useImage={true} showBadge={false} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The next-generation unified portal for fandom enthusiasts worldwide. 
              Discover stories, track your progress across anime, movies, gaming, manga, and TV, 
              curate collections, and connect with global fan communities.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-slate-400">
              <span className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white cursor-pointer transition-colors" title="Global Portal">
                <Globe className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white cursor-pointer transition-colors" title="Community Discussions">
                <MessageCircle className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white cursor-pointer transition-colors" title="Share Portal">
                <Share2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Col 2: Category Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Category Hubs</h4>
            <ul className="space-y-2 text-xs">
              {categories.map(({ label, cat }) => (
                <li key={cat}>
                  <button
                    onClick={() => navigateToCategory(cat)}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Interactive Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Platform Features</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('discover')} className="hover:text-cyan-400 transition-colors">
                  Global Discover Hub
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('collection')} className="hover:text-cyan-400 transition-colors">
                  My Collection & Vault
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('progress')} className="hover:text-cyan-400 transition-colors">
                  My Progress Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('calendar')} className="hover:text-cyan-400 transition-colors">
                  Release Calendar 2026
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('reviews')} className="hover:text-cyan-400 transition-colors">
                  Fan & Critic Reviews
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('merchandise')} className="hover:text-cyan-400 transition-colors">
                  Merchandise Showcase
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('music')} className="hover:text-cyan-400 transition-colors">
                  Spotify Fandom Music Hub
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('community')} className="hover:text-cyan-400 transition-colors">
                  Fandom Coliseum & Debates
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Info & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Project & Specs</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-cyan-400 transition-colors">
                  About FandomVerse
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('contact')} className="hover:text-cyan-400 transition-colors">
                  Contact Team & GPS Map
                </button>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center space-x-1 px-2 py-1 rounded bg-purple-500/10 text-purple-300 text-[11px] border border-purple-500/20">
                  <Award className="w-3 h-3 mr-1" /> TechWiz 7 Project
                </span>
              </li>
              <li className="text-[11px] text-slate-400 leading-tight">
                Software Requirements Specification v1.0
              </li>
              <li className="text-[11px] text-slate-400">
                Single Page Application (SPA)
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span>© 2026 FandomVerse Portal. Aptech Limited.</span>
            <span>•</span>
            <span className="text-slate-400">Client-Side JSON Architecture</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-slate-400">
              Made with <Heart className="w-3 h-3 text-red-400 mx-1 fill-red-400" /> for Fandom Enthusiasts
            </span>
            <span className="flex items-center text-slate-400">
              <Shield className="w-3 h-3 text-emerald-400 mr-1" /> Safe & Accessible
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
