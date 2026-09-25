import React, { useEffect } from 'react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const BackNavigationBar = () => {
    const { currentView, setCurrentView, activeCategory, navigationHistory, canGoBack, goBack } = useApp();
    // Keyboard shortcut: Esc or Backspace (when not focused on inputs)
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Don't trigger if user is typing in form controls
            const activeEl = document.activeElement;
            const isInput = activeEl instanceof HTMLInputElement ||
                activeEl instanceof HTMLTextAreaElement ||
                activeEl instanceof HTMLSelectElement ||
                (activeEl && activeEl.getAttribute('contenteditable') === 'true');
            if (isInput)
                return;
            if (e.key === 'Escape' || (e.key === 'Backspace' && !isInput)) {
                if (canGoBack) {
                    e.preventDefault();
                    goBack();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [canGoBack, goBack]);
    if (currentView === 'home') {
        return null;
    }
    const getViewLabel = (view) => {
        switch (view) {
            case 'home': return 'Home';
            case 'discover': return 'Discover Hub';
            case 'category': return `${activeCategory.toUpperCase()} Hub`;
            case 'collection': return 'Collection';
            case 'progress': return 'Tracker';
            case 'reviews': return 'Reviews';
            case 'calendar': return 'Release Calendar';
            case 'profile': return 'User Profile';
            case 'merchandise': return 'Merch Store';
            case 'contact': return 'Contact & Map';
            case 'about': return 'About';
            case 'music': return 'Spotify Music Hub';
            case 'community': return 'Coliseum Debates';
            default: return 'Home';
        }
    };
    const previousView = navigationHistory[navigationHistory.length - 1] || 'home';
    const prevLabel = getViewLabel(previousView);
    const currentLabel = getViewLabel(currentView);
    return (<div className="w-full mb-6 animate-in fade-in duration-200">
      <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-lg">
        
        {/* Convenient Back Button */}
        <div className="flex items-center space-x-2">
          <button onClick={goBack} className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 hover:text-white border border-purple-500/25 hover:border-purple-500/40 transition-all group text-xs font-semibold shadow-sm active:scale-95" title="Go back to previous screen (Keyboard: Esc / Backspace)">
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform"/>
            <span>Back to {prevLabel}</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-slate-400 font-mono">
              Esc
            </span>
          </button>

          <button onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }} className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white border border-white/[0.06] transition-colors" title="Return to Home page">
            <Home className="w-3.5 h-3.5"/>
          </button>
        </div>

        {/* Breadcrumb Trail */}
        <nav className="flex items-center space-x-1.5 text-xs text-slate-400" aria-label="Breadcrumb">
          <button onClick={() => setCurrentView('home')} className="hover:text-cyan-400 transition-colors">
            Home
          </button>
          
          <ChevronRight className="w-3.5 h-3.5 text-slate-600"/>
          
          <span className="font-semibold text-slate-200 truncate max-w-[180px] sm:max-w-xs">
            {currentLabel}
          </span>
        </nav>

      </div>
    </div>);
};
