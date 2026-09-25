import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, RotateCcw, ArrowRight, Bot, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import chatbotKnowledge from '../data/chatbotKnowledge.json';

// Helper to render bold, italic, and bulleted text without external markdown packages
const renderFormattedText = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    // Split by **bold** or *italic*
    const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    const parsedLine = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} style={{ color: '#ffffff', fontWeight: 700 }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={pIdx} style={{ color: '#e2e8f0', fontStyle: 'italic' }}>
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });

    const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
    return (
      <div 
        key={lineIdx} 
        style={{ 
          paddingTop: isBullet ? '2px' : '1px',
          paddingBottom: isBullet ? '2px' : '1px',
          paddingLeft: isBullet ? '4px' : '0' 
        }}
      >
        {parsedLine}
      </div>
    );
  });
};

export const ChatbotWidget = () => {
  const {
    isChatbotOpen,
    setIsChatbotOpen,
    navigateToCategory,
    navigateToMedia,
    setIsBookmarksModalOpen,
    setCurrentView,
    currentPlayingTrack
  } = useApp();

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
        "🔥 Top Anime",
        "🎮 Best RPGs",
        "📅 Sept Drops",
        "🏴‍☠️ One Piece"
      ],
      suggestedAction: undefined
    };
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

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
    }, 450);
  };

  const handleActionClick = (action) => {
    if (action.route === 'category' && action.targetId) {
      navigateToCategory(action.targetId);
    } else if (action.route === 'media' && action.targetId) {
      navigateToMedia(action.targetId);
    } else if (action.route === 'bookmarks') {
      setIsBookmarksModalOpen(true);
    } else {
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

  const bottomPosition = currentPlayingTrack ? '112px' : '28px';

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        bottom: bottomPosition,
        zIndex: 1050,
        isolation: 'isolate',
        transition: 'bottom 0.3s ease'
      }}
    >
      {/* Floating Modern AI Launcher (Glowing Orb + Sleek Pill) */}
      {!isChatbotOpen && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            onClick={() => setIsChatbotOpen(true)}
            className="bot-launcher-pill d-none d-sm-flex"
            style={{ textDecoration: 'none' }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em' }}>
              Chat with AI
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 7px',
                borderRadius: '9999px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#34d399',
                fontSize: '10px',
                fontWeight: 700
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 6px #10b981'
                }}
              />
              ONLINE
            </span>
          </div>

          <button
            onClick={() => setIsChatbotOpen(true)}
            className="bot-launcher-btn"
            aria-label="Open FandomBot AI Assistant"
            title="Open FandomBot"
          >
            <div className="bot-launcher-ring" />
            <Bot size={26} strokeWidth={2.2} />
          </button>
        </div>
      )}

      {/* Floating Fluid Glass Chat Window (Deep Curved Silhouette, Non-Boxy) */}
      {isChatbotOpen && (
        <div className="bot-window">
          {/* Header */}
          <div className="bot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  position: 'relative',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e8a87c 0%, #c47c4c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(232, 168, 124, 0.35)',
                  flexShrink: 0
                }}
              >
                <Bot size={20} color="#0a0b12" strokeWidth={2.2} />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    right: '-1px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    border: '2px solid #141624',
                    boxShadow: '0 0 8px #10b981'
                  }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '0.02em' }}>
                    FandomBot
                  </h3>
                  <span
                    style={{
                      fontSize: '9.5px',
                      fontWeight: 800,
                      padding: '1px 6px',
                      borderRadius: '9999px',
                      background: 'rgba(232, 168, 124, 0.18)',
                      border: '1px solid rgba(232, 168, 124, 0.35)',
                      color: '#e8a87c',
                      letterSpacing: '0.04em'
                    }}
                  >
                    AI GUIDE
                  </span>
                </div>
                <p style={{ fontSize: '10.5px', color: '#94a3b8', margin: '2px 0 0 0' }}>
                  Anime, gaming, releases & lore
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={resetChat}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                title="Reset Conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw size={14} />
              </button>

              <button
                onClick={() => setIsChatbotOpen(false)}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                title="Close Chat"
                aria-label="Close chat"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                {/* Bot Message Row (Avatar + Bubble) */}
                {msg.sender === 'bot' ? (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', maxWidth: '88%' }}>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: 'rgba(232, 168, 124, 0.15)',
                        border: '1px solid rgba(232, 168, 124, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <Sparkles size={13} color="#e8a87c" />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div className="bot-bubble">
                        {renderFormattedText(msg.text)}

                        {/* Interactive Action Card Pill */}
                        {msg.suggestedAction && (
                          <div
                            onClick={() => handleActionClick(msg.suggestedAction)}
                            className="bot-action-card"
                          >
                            <span>{msg.suggestedAction.label}</span>
                            <ArrowRight size={14} style={{ color: '#e8a87c' }} />
                          </div>
                        )}
                      </div>

                      {/* Quick Reply Chips */}
                      {msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                          {msg.quickReplies.map((chip, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(chip)}
                              className="bot-quick-chip"
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      )}

                      <span
                        style={{
                          fontSize: '9.5px',
                          color: '#64748b',
                          marginTop: '4px',
                          display: 'block',
                          paddingLeft: '2px',
                          fontFamily: 'monospace'
                        }}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* User Message Bubble */
                  <div style={{ maxWidth: '82%' }}>
                    <div className="user-bubble">
                      {msg.text}
                    </div>
                    <span
                      style={{
                        fontSize: '9.5px',
                        color: '#64748b',
                        marginTop: '4px',
                        display: 'block',
                        textAlign: 'right',
                        fontFamily: 'monospace'
                      }}
                    >
                      {msg.time}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'rgba(232, 168, 124, 0.15)',
                    border: '1px solid rgba(232, 168, 124, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Sparkles size={13} color="#e8a87c" />
                </div>
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '16px 16px 16px 4px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#e8a87c',
                      animation: 'animate-bounce 1s infinite',
                      animationDelay: '0ms'
                    }}
                  />
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#e8a87c',
                      animation: 'animate-bounce 1s infinite',
                      animationDelay: '150ms'
                    }}
                  />
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#e8a87c',
                      animation: 'animate-bounce 1s infinite',
                      animationDelay: '300ms'
                    }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Capsule */}
          <div
            style={{
              padding: '12px 14px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'linear-gradient(180deg, rgba(18, 20, 31, 0.8) 0%, rgba(13, 15, 23, 0.95) 100%)'
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="bot-input-capsule"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about anime, games, releases..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '12.5px',
                  color: '#ffffff',
                  padding: '6px 0'
                }}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bot-send-btn"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
