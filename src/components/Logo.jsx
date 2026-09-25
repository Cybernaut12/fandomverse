import React from 'react';
export const Logo = ({ size = 'md', showWordmark = true, showBadge = true, className = '', useImage = false }) => {
    const sizeMap = {
        sm: { icon: 'w-7 h-7', text: 'text-lg', badge: 'text-[9px] px-1 py-0.2' },
        md: { icon: 'w-9 h-9', text: 'text-xl', badge: 'text-[10px] px-1.5 py-0.5' },
        lg: { icon: 'w-12 h-12', text: 'text-2xl', badge: 'text-xs px-2 py-0.5' },
        xl: { icon: 'w-16 h-16', text: 'text-3xl', badge: 'text-xs px-2.5 py-1' }
    };
    const currentSize = sizeMap[size];
    return (<div className={`flex items-center space-x-3 select-none group ${className}`}>
      {/* Emblem Icon */}
      <div className={`relative ${currentSize.icon} rounded-xl overflow-hidden p-[1.5px] bg-gradient-to-tr from-[#e8a87c] via-purple-500 to-[#f5d1ba] shadow-lg shadow-[#e8a87c]/20 group-hover:shadow-[#e8a87c]/40 group-hover:scale-105 transition-all duration-300`}>
        {useImage ? (<img src="/images/logo.png" alt="FandomVerse Logo" className="w-full h-full object-cover rounded-[11px]"/>) : (<div className="w-full h-full bg-[#090b12] rounded-[11px] p-1 flex items-center justify-center relative overflow-hidden">
            {/* Subtle inner radial gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8a87c]/25 via-purple-500/15 to-transparent pointer-events-none"/>
            <img src="/logo-icon.svg" alt="FandomVerse Emblem" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(232,168,124,0.5)]"/>
          </div>)}
      </div>

      {/* Brand Typography Wordmark */}
      {showWordmark && (<div className="flex items-center space-x-1.5">
          <span className={`font-black tracking-tight font-heading ${currentSize.text} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
            <span className="text-white group-hover:text-[#f5d1ba] transition-colors">Fandom</span>
            <span className="bg-gradient-to-r from-[#e8a87c] via-[#f5d1ba] to-purple-400 bg-clip-text text-transparent group-hover:brightness-125 transition-all">
              Verse
            </span>
          </span>
          {showBadge && (<span className={`hidden sm:inline-block ml-1.5 uppercase font-mono font-extrabold tracking-wider rounded-md bg-[#e8a87c]/20 text-[#e8a87c] border border-[#e8a87c]/35 shadow-sm shadow-[#e8a87c]/10 ${currentSize.badge}`}>
              2.0
            </span>)}
        </div>)}
    </div>);
};
