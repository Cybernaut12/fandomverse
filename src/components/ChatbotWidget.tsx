import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  ArrowRight, 
  RotateCcw, 
  Minimize2, 
  Maximize2,
  Volume2,
  VolumeX,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import chatbotKnowledge from '../data/chatbotKnowledge.json';
import type { CategoryType } from '../types';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  suggestedAction?: {
    label: string;
    route: string;
    targetId?: string;
  };
  quickReplies?: string[];
}

export const ChatbotWidget: React.FC = () => {
  const { 
    isChatbotOpen, 
    setIsChatbotOpen, 
    setCurrentView, 
    navigateToCategory, 
    navigateToMedia,
    setIsBookmarksModalOpen
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: chatbotKnowledge.welcomeMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: chatbotKnowledge.defaultQuickReplies
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatbotOpen) {
      scrollToBottom();
    }
  }, [messages, isChatbotOpen, isTyping]);

  const findBestResponse = (query: string) => {
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

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
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
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: match.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: match.quickReplies,
        suggestedAction: match.suggestedAction
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: NonNullable<ChatMessage['suggestedAction']>) => {
    if (action.route === 'category' && action.targetId) {
      navigateToCategory(action.targetId as CategoryType);
    } else if (action.route === 'media' && action.targetId) {
      navigateToMedia(action.targetId);
    } else if (action.route === 'bookmarks') {
      setIsBookmarksModalOpen(true);
    } else {
      setCurrentView(action.route as any);
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

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      
      {/* Floating Launcher Button (visible when closed) */}
      {!isChatbotOpen && (
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 text-white shadow-2xl shadow-purple-600/50 hover:shadow-cyan-500/50 hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Open FandomBot virtual assistant"
        >
          <Bot className="w-6 h-6 transition-transform group-hover:rotate-12" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#090a0f] rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#090a0f] rounded-full" />
        </button>
      )}

      {/* Floating Chat Window (visible when open) */}
      {isChatbotOpen && (
        <div className="w-[92vw] sm:w-96 h-[560px] rounded-2xl glass-panel border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-3.5 border-b border-white/10 bg-black/40 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center p-[1px]">
                <div className="w-full h-full bg-[#0d0f17] rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center space-x-1.5 font-heading">
                  <span>FandomBot AI</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[10px] text-slate-400">Rule-based Multiverse Guide</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={resetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsChatbotOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-md shadow-purple-600/20'
                      : 'bg-white/[0.06] border border-white/10 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}

                  {/* Action Link Button if provided */}
                  {msg.suggestedAction && (
                    <button
                      onClick={() => handleActionClick(msg.suggestedAction!)}
                      className="mt-2.5 w-full py-1.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-semibold flex items-center justify-between group transition-all"
                    >
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </div>

                {/* Quick Reply Chips */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.quickReplies.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip)}
                        className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-[11px] text-slate-300 hover:text-white border border-white/10 transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-slate-400 mt-1 font-mono">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 text-slate-400 p-2 bg-white/5 rounded-xl w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-white/10 bg-black/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about anime, games, releases..."
                className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-all shadow-md shadow-purple-600/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
