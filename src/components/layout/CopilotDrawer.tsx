import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { aiCopilotService, CopilotMessage } from '../../services/aiCopilotService';

interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onRunSimulation?: (assetId: string) => void;
}

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({
  isOpen,
  onClose,
  onRunSimulation,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      timestamp: 'Just now',
      content: `Hello. I am **NEXUS Resilience Advisor**, your infrastructure analytics and cascade risk assistant.

I can simulate disaster propagation paths, inspect topological betweenness centralities, and recommend priority mitigation protocols across Metro City's 2,486 mapped assets.`,
      suggestedActions: [
        'What happens if Bridge B-17 fails?',
        'Which hospital is most vulnerable?',
        'What are the top 5 critical assets?',
        'What should emergency responders do first?',
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = aiCopilotService.generateResponse(query);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 420,
        maxWidth: '100vw',
        background: '#FFFFFF',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-drawer)',
        zIndex: 95,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: 'var(--brand-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <Sparkles size={16} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
              NEXUS Resilience Advisor
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Grounded in Graph Engine G=(V,E)
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 6,
            color: 'var(--text-secondary)',
            padding: 6,
            cursor: 'pointer',
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  marginBottom: 4,
                  padding: '0 4px',
                }}
              >
                {isUser ? 'Operator' : 'NEXUS Advisor'} • {msg.timestamp}
              </div>

              <div
                style={{
                  maxWidth: '90%',
                  padding: '12px 14px',
                  borderRadius: 8,
                  background: isUser ? 'var(--brand-navy)' : 'var(--bg-app)',
                  color: isUser ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: 13,
                  lineHeight: 1.5,
                  border: isUser ? 'none' : '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {msg.content.split('\n').map((line, idx) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={idx} style={{ fontWeight: 700, margin: '3px 0' }}>{line.replace(/\*\*/g, '')}</p>;
                    }
                    if (line.startsWith('- ')) {
                      return <li key={idx} style={{ marginLeft: 16, color: isUser ? '#E2E8F0' : 'var(--text-secondary)' }}>{line.replace('- ', '')}</li>;
                    }
                    if (line.match(/^\d+\./)) {
                      return <p key={idx} style={{ margin: '3px 0', fontWeight: 600 }}>{line}</p>;
                    }
                    return <p key={idx} style={{ margin: '2px 0' }}>{line}</p>;
                  })}
                </div>

                {/* Followups */}
                {msg.suggestedActions && (
                  <div style={{ marginTop: 10, borderTop: isUser ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border-subtle)', paddingTop: 8 }}>
                    <div style={{ fontSize: 11, color: isUser ? '#E2E8F0' : 'var(--text-muted)', marginBottom: 6 }}>
                      Suggested queries:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(action)}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 4,
                            padding: '4px 8px',
                            fontSize: 11,
                            color: 'var(--brand-navy)',
                            fontWeight: 500,
                            cursor: 'pointer',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span>{action}</span>
                          <ArrowRight size={12} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--brand-blue)', fontSize: 12 }}>
            <Cpu size={14} />
            <span>Evaluating graph dependencies...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: 8,
          background: 'var(--bg-app)',
        }}
      >
        <input
          type="text"
          placeholder="Ask Advisor (e.g. 'What if Bridge B-17 fails?')..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          className="input-control"
          style={{ flex: 1 }}
        />
        <button
          onClick={() => handleSend()}
          className="btn btn-primary"
          style={{ padding: '0 14px' }}
          disabled={!input.trim()}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};
