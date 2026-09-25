import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const Breadcrumbs = ({ items }) => {
    const { setCurrentView } = useApp();
    return (<nav className="flex items-center space-x-2 text-xs text-slate-400 py-3" aria-label="Breadcrumb">
      <button onClick={() => setCurrentView('home')} className="flex items-center space-x-1 hover:text-white transition-colors">
        <Home className="w-3.5 h-3.5 text-slate-400 hover:text-cyan-400"/>
        <span>Home</span>
      </button>

      {items.map((item, idx) => (<React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-slate-400"/>
          {item.active ? (<span className="text-slate-200 font-medium truncate max-w-[200px] sm:max-w-xs">
              {item.label}
            </span>) : (<button onClick={item.onClick} className="hover:text-cyan-400 transition-colors truncate max-w-[150px]">
              {item.label}
            </button>)}
        </React.Fragment>))}
    </nav>);
};
