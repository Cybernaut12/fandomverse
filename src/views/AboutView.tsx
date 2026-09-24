import React from 'react';
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Code, 
  Layers, 
  Cpu, 
  Users, 
  Globe, 
  Database, 
  CheckCircle,
  Clock,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="space-y-12 pb-16 animate-in fade-in duration-200">
      
      {/* Hero Intro */}
      <div className="p-8 sm:p-10 rounded-2xl glass-panel border border-white/10 space-y-4 max-w-4xl relative overflow-hidden">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20">
            TechWiz 7 • Web Innovation Unleashed
          </span>
          <span className="text-xs font-mono text-cyan-400">SRS Version 1.0</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-heading">
          About FandomVerse
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
          FandomVerse is a centralized, ultra-responsive digital ecosystem uniting seven core fandom pillars: 
          <strong> Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga</strong>.
        </p>
      </div>

      {/* Background & The Problem (SRS Section 1.1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
          <span className="text-[11px] font-mono text-amber-400 uppercase font-bold">1.1 Background & Necessity</span>
          <h2 className="text-lg font-bold text-white font-heading">The Fragmented Fan Experience</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Today, fans are forced to navigate scattered platforms across Wikis, streaming services, ticketing sites, merchandise stores, and fragmented discussion forums. Switching between portals makes tracking franchises inconvenient and time-consuming.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
          <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold">1.2 Proposed Solution</span>
          <h2 className="text-lg font-bold text-white font-heading">The Unified Fandom Ecosystem</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            FandomVerse bridges this gap by providing an engaging, high-performance Single Page Application (SPA). Discover new worlds, track episode/chapter progress, explore high-res image galleries, access trailer media hubs, and interact with our AI-powered knowledge assistant.
          </p>
        </div>
      </div>

      {/* Technical Architecture & Stack Showcase (SRS Section 1.8) */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-6">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
            1.8 Interface & Technical Requirements
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white font-heading mt-1">
            Engineered Stack & Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
            <Code className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xs font-bold text-white">React 19 & TypeScript</h3>
            <p className="text-[11px] text-slate-400">
              Modern componentized Single Page Application (SPA) architecture with strict type safety.
            </p>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <h3 className="text-xs font-bold text-white">Tailwind CSS & Glassmorphism</h3>
            <p className="text-[11px] text-slate-400">
              Responsive dark-mode UI with custom backdrop-blur glass panels and micro-interactions.
            </p>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xs font-bold text-white">Client-Side JSON Datastore</h3>
            <p className="text-[11px] text-slate-400">
              Fast, zero-backend architecture powered by structured JSON catalogs and instant client filtering.
            </p>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
            <Cpu className="w-5 h-5 text-amber-400" />
            <h3 className="text-xs font-bold text-white">Local & Session Storage</h3>
            <p className="text-[11px] text-slate-400">
              Bookmarks & progress saved to LocalStorage; personal notes preserved per browser session.
            </p>
          </div>
        </div>
      </div>

      {/* SRS Compliance Checklist (Functional & Non-Functional Requirements) */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white font-heading">
          SRS v1.0 Implementation Compliance Matrix
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {[
            '7 Dedicated Category Hubs',
            'Global Client-Side Search (Ctrl+K)',
            'Image Galleries with Lightbox View',
            'Videos, Trailers & Audio Podcasts',
            '35+ Character Profiles (5+ per category)',
            '21+ Event Highlights (3+ per category)',
            'Merchandise Showcase & JS Billing Cart',
            'Release Calendar for September 2026',
            'Rule-Based AI Chatbot (FandomBot)',
            'Bookmarks (LocalStorage) & Notes (Session)',
            'Formatted List Exporter (.TXT / Copy)',
            'Simulated Visitor Counter & Real-Time Clock',
            'Interactive GPS Google Map Simulator',
            'Breadcrumb Navigation on Detail Views',
            'Dummy Login & Registration Simulation'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2 text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Team & Aptech Credits */}
      <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          <span className="font-bold text-white">Developed for Aptech TechWiz 7</span>
          <p className="text-[11px] text-slate-400">Theme: Fandom Universe • Web Innovation Unleashed</p>
        </div>
        <button
          onClick={() => setCurrentView('discover')}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md transition-all"
        >
          Start Exploring Fandoms
        </button>
      </div>

    </div>
  );
};
