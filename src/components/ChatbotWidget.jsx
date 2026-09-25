import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import chatbotKnowledge from '../data/chatbotKnowledge.json';
export const ChatbotWidget = () => {
    const { isChatbotOpen, setIsChatbotOpen, navigateToCategory, navigateToMedia, setIsBookmarksModalOpen, setCurrentView, currentPlayingTrack } = useApp();
    const [messages, setMessages] = useState([
        {
            id: 'welcome-1',
            sender: 'bot',
            text: chatbotKnowledge.welcomeMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            quickReplies: chatbotKnowledge.defaultQuickReplies
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        if (isChatbotOpen) {
            scrollToBottom();
        }
    }, [messages, isChatbotOpen, isTyping]);
    const findBestResponse = (query) => {
        const q = query.toLowerCase();
        for (const intent of chatbotKnowledge.intents) {
            if (intent.triggers.some(trigger => q.includes(trigger.toLowerCase()))) {
                return {
                    response: intent.response,
                    quickReplies: intent.quickReplies,
                    suggestedAction: intent.suggestedAction
                };
            }
        }
        return {
            response: chatbotKnowledge.fallbackResponse,
            quickReplies: [
                "🔥 Recommend an Anime",
                "🎮 Top RPG Games",
                "📅 September 2026 Releases",
                "🏴‍☠️ Tell me about One Piece"
            ],
            suggestedAction: undefined
        };
    };
    const handleSendMessage = (textToSend) => {
        const text = textToSend || input.trim();
        if (!text)
            return;
        const userMsg = {
            id: `usr-${Date.now()}`,
            sender: 'user',
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);
        // Realistic typing delay
        setTimeout(() => {
            const match = findBestResponse(text);
            const botMsg = {
                id: `bot-${Date.now()}`,
                sender: 'bot',
                text: match.response,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                quickReplies: match.quickReplies,
                suggestedAction: match.suggestedAction
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 500);
    };
    const handleActionClick = (action) => {
        if (action.route === 'category' && action.targetId) {
            navigateToCategory(action.targetId);
        }
        else if (action.route === 'media' && action.targetId) {
            navigateToMedia(action.targetId);
        }
        else if (action.route === 'bookmarks') {
            setIsBookmarksModalOpen(true);
        }
        else {
            setCurrentView(action.route);
        }
    };
    const resetChat = () => {
        setMessages([
            {
                id: `msg-${Date.now()}`,
                sender: 'bot',
                text: chatbotKnowledge.welcomeMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                quickReplies: chatbotKnowledge.defaultQuickReplies
            }
        ]);
    };
    // Bottom offset dynamically adjusts if audio player bar is open
    const bottomOffsetClass = currentPlayingTrack
        ? 'bottom-24 sm:bottom-28'
        : 'bottom-6 sm:bottom-8';
    return (<div className={`fixed right-4 sm:right-6 z-40 select-none transition-all duration-300 ${bottomOffsetClass}`} style={{ isolation: 'isolate' }}>
      
      {/* Floating Launcher Button (Theme from the pull: warm copper #e8a87c) */}
      {!isChatbotOpen && (<button onClick={() => setIsChatbotOpen(true)} className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#e8a87c] hover:bg-[#f0b992] text-[#0a0a0f] shadow-2xl shadow-[#e8a87c]/30 hover:shadow-[#e8a87c]/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20" aria-label="Open FandomVerse AI Assistant">
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12"/>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border border-[#0a0a0f] rounded-full"/>
          </div>
          <span className="font-heading font-bold text-xs tracking-wide pr-1 hidden sm:inline">
            FandomBot
          </span>
        </button>)}

      {/* Floating Chat Window (Theme from the pull) */}
      {isChatbotOpen && (<div className="w-[94vw] sm:w-[380px] h-[540px] max-h-[82vh] rounded-3xl bg-[#0e1017] border border-[#e8a87c]/30 shadow-2xl shadow-black/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-[#141622] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-[#e8a87c] flex items-center justify-center shadow-md shadow-[#e8a87c]/20">
                <Sparkles className="w-5 h-5 text-[#0a0a0f]"/>
              </div>
              <div>
                <h3 className="text-xs font-black text-white flex items-center space-x-1.5 font-heading">
                  <span>FandomVerse Guide</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"/>
                </h3>
                <p className="text-[10px] text-slate-400">Ask about anime, games, lore & releases</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button onClick={resetChat} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors" title="Reset Conversation" aria-label="Reset conversation">
                <RotateCcw className="w-3.5 h-3.5"/>
              </button>
              <button onClick={() => setIsChatbotOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors" title="Close Chat" aria-label="Close chat">
                <X className="w-4 h-4"/>
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs scrollbar-thin">
            {messages.map(msg => (<div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-line text-xs ${msg.sender === 'user'
                    ? 'bg-[#e8a87c] text-[#0a0a0f] font-semibold rounded-br-none shadow-md shadow-[#e8a87c]/15'
                    : 'bg-white/[0.06] border border-white/10 text-slate-200 rounded-bl-none'}`}>
                  {msg.text}

                  {/* Action Link Button if provided */}
                  {msg.suggestedAction && (<button onClick={() => handleActionClick(msg.suggestedAction)} className="mt-2.5 w-full py-2 px-3 rounded-xl bg-[#e8a87c]/15 hover:bg-[#e8a87c]/25 text-[#e8a87c] border border-[#e8a87c]/30 text-[11px] font-bold flex items-center justify-between group transition-all">
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1"/>
                    </button>)}
                </div>

                {/* Quick Reply Chips */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (<div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.quickReplies.map((chip, idx) => (<button key={idx} onClick={() => handleSendMessage(chip)} className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#e8a87c]/15 text-[11px] text-slate-300 hover:text-[#e8a87c] border border-white/10 hover:border-[#e8a87c]/30 transition-colors">
                        {chip}
                      </button>))}
                  </div>)}

                <span className="text-[9px] text-slate-400 mt-1 font-mono">{msg.time}</span>
              </div>))}

            {isTyping && (<div className="flex items-center space-x-1.5 text-slate-400 p-2 bg-white/5 rounded-xl w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8a87c] animate-bounce" style={{ animationDelay: '0ms' }}/>
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8a87c] animate-bounce" style={{ animationDelay: '150ms' }}/>
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8a87c] animate-bounce" style={{ animationDelay: '300ms' }}/>
              </div>)}
            <div ref={messagesEndRef}/>
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-white/10 bg-[#141622]">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
            }} className="flex items-center space-x-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about anime, games, releases..." className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#e8a87c]"/>
              <button type="submit" disabled={!input.trim()} className="p-2.5 rounded-xl bg-[#e8a87c] hover:bg-[#f0b992] disabled:opacity-40 text-[#0a0a0f] font-bold transition-all shadow-md shadow-[#e8a87c]/20" aria-label="Send message">
                <Send className="w-4 h-4"/>
              </button>
            </form>
          </div>

        </div>)}

    </div>);
};
