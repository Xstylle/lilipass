
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { getTravelAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const AIConsultant: React.FC<{ context?: string }> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi! I am your Lilipas Travel Assistant. How can I help you plan your next adventure today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getTravelAdvice(userMsg, context);
    
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[320px] md:w-[380px] overflow-hidden flex flex-col border border-slate-200 animate-in fade-in zoom-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-teal-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Bot size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Lilipas AI Guide</h4>
                <p className="text-[10px] text-teal-100">Online & Ready to Help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div ref={scrollRef} className="h-80 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-orange-500 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm rounded-tl-none border border-slate-100'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                  <Loader2 size={16} className="animate-spin text-teal-600" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white">
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-1">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about destinations..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="text-teal-600 hover:text-teal-700 transition-colors disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group relative"
        >
          <MessageSquare size={28} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500"></span>
          </span>
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs py-2 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask our AI Consultant
          </div>
        </button>
      )}
    </div>
  );
};

export default AIConsultant;
