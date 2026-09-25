import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { getChatbotResponse } from '@/data/chatbot';
export function Chatbot({ onSearchOpen }) {
    const [isOpen, setIsOpen] = useState(false);
    const { openCart } = useCart();
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            text: "Hi! I'm your FandomVerse guide. Ask me about a fandom or a site feature, and I'll point you to the right place.",
            links: [
                { label: 'Browse all fandoms', to: '/#categories' },
                { label: 'Open search', action: 'search' },
            ],
            suggestions: ['What can I find in Anime?', 'Show me gaming content', 'What events are coming up?'],
        },
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);
    const send = (text) => {
        if (!text.trim())
            return;
        const response = getChatbotResponse(text);
        setMessages((prev) => [
            ...prev,
            { role: 'user', text },
            { role: 'bot', text: response.response, links: response.links, suggestions: response.suggestions },
        ]);
        setInput('');
    };
    const runAction = (action) => {
        if (action === 'search') onSearchOpen?.();
        if (action === 'cart') openCart();
        setIsOpen(false);
    };
    if (!isOpen) {
        return (<button onClick={() => setIsOpen(true)} className="position-fixed fv-bottom-5 fv-right-5 fv-z-40 fv-w-12 fv-h-12 rounded-pill fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900 d-flex align-items-center justify-content-center fv-shadow-lg fv-transition-all fv-hover-scale-110 fv-active-scale-95" aria-label="Open chat assistant">
        <MessageCircle className="fv-w-6 fv-h-6"/>
      </button>);
    }
    return (<div className="position-fixed fv-bottom-5 fv-right-5 fv-z-40 fv-w-calc-100vw-2-5rem fv-max-w-sm fv-animate-scale-in">
      <div className="fv-bg-ink-800 rounded-4 border fv-border-ink-600 fv-shadow-2xl d-flex flex-column fv-max-h-500px overflow-hidden">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between fv-px-4 fv-py-3 fv-bg-ink-700 border-bottom fv-border-ink-600">
          <div className="d-flex align-items-center gap-2">
            <Sparkles className="fv-w-4 fv-h-4 fv-text-brand-400"/>
            <span className="fv-heading-font fv-text-sm fv-font-semibold fv-text-paper-50">
              FandomVerse Guide
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="fv-text-paper-300 fv-hover-text-paper-50 fv-transition-colors" aria-label="Close chat">
            <X className="fv-w-4 fv-h-4"/>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-fill overflow-auto fv-p-4 fv-space-y-3 fv-min-h-200px">
          {messages.map((msg, i) => (<div key={i} className="fv-space-y-2">
              <div className={`d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                <p className={`fv-max-w-85 fv-text-sm rounded-3 fv-px-3 fv-py-2 ${msg.role === 'user'
                ? 'fv-bg-brand-500 fv-text-ink-900'
                : 'fv-bg-ink-700 fv-text-paper-200'}`}>
                  {msg.text}
                </p>
              </div>
              {msg.links?.length > 0 && msg.role === 'bot' && (<div className="d-flex flex-wrap fv-gap-2">
                  {msg.links.map((link) => link.action ? (
                    <button key={`${link.action}-${link.label}`} type="button" onClick={() => runAction(link.action)} className="d-inline-flex align-items-center fv-gap-1 fv-px-2 fv-py-1 rounded-2 fv-bg-ink-600 fv-hover-bg-ink-500 fv-text-brand-300 fv-text-xs fv-transition-colors">
                      {link.label}
                    </button>
                  ) : (
                    <Link key={`${link.to}-${link.label}`} to={link.to} onClick={() => setIsOpen(false)} className="d-inline-flex align-items-center fv-gap-1 fv-px-2 fv-py-1 rounded-2 fv-bg-ink-600 fv-hover-bg-ink-500 fv-text-brand-300 fv-text-xs fv-transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>)}
              {msg.suggestions && msg.role === 'bot' && (<div className="d-flex flex-wrap fv-gap-1-5">
                  {msg.suggestions.map((s) => (<button key={s} onClick={() => send(s)} className="fv-text-xs fv-px-2-5 fv-py-1 rounded-pill fv-bg-ink-600 fv-hover-bg-ink-500 fv-text-paper-300 fv-hover-text-paper-50 fv-transition-colors">
                      {s}
                    </button>))}
                </div>)}
            </div>))}
        </div>

        {/* Input */}
        <div className="border-top fv-border-ink-600 fv-p-3 d-flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send(input)} placeholder="Ask about any fandom..." className="flex-fill fv-bg-ink-700 fv-text-paper-100 fv-text-sm rounded-3 fv-px-3 fv-py-2 border fv-border-ink-600 fv-outline-none fv-focus-border-brand-400 fv-placeholder-text-paper-300-40" aria-label="Chat message"/>
          <button onClick={() => send(input)} className="fv-p-2 rounded-3 fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900 fv-transition-colors fv-active-scale-95" aria-label="Send message">
            <Send className="fv-w-4 fv-h-4"/>
          </button>
        </div>
      </div>
    </div>);
}
