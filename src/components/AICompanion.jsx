import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, BotMessageSquare } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function AICompanion() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: "Hi there! I'm Aura, your AI event concierge powered by Google Gemini. I can help you find booths, navigate the venue, or answer questions about today's schedule. How can I assist you?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (apiKey) {
        // ACTUAL AI IMPLEMENTATION
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        // Provide context to the AI so it acts as the persona
        const prompt = `
        You are Aura, an intelligent AI event concierge for the "Aura Tech Summit India 2026".
        You help attendees navigate the venue, understand the schedule, and answer event-related questions.
        Be concise, helpful, and friendly.

        Context Information:
        - The summit is taking place at the Bengaluru International Exhibition Centre (BIEC), Bengaluru, India.
        - Registration & Welcome Breakfast: 09:00 AM (BIEC Main Foyer, Track: Networking)
        - The Future of Agentic AI Interfaces by Siddharth: 10:00 AM (BIEC Hall 1, Track: Main Stage)
        - Building Interactive Physical Spaces with React by Arjun Singh: 11:00 AM (Tech Pavilion A, Track: Workshop)
        - Lunch & Exhibitor Networking: 01:00 PM (BIEC Expo Center)
        - Framer Motion for Event Apps by Priya Sharma: 03:00 PM (Innovation Lab 3)

        User Message: ${userText}
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'ai',
          text: responseText
        }]);
      } else {
        // FALLBACK TO MOCK (if no API Key is provided)
        triggerMockResponse(userText);
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      
      // Graceful error handling for high demand or API downtime
      if (error.message && (error.message.includes('503') || error.message.includes('high demand'))) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'ai',
          text: "Google's Gemini servers are currently experiencing unusually high demand. 🚦 Falling back to local offline logic..."
        }]);
        
        // Wait a second, then trigger the mock logic
        setTimeout(() => triggerMockResponse(userText), 1500);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'ai',
          text: "I encountered a glitch in my system while thinking. Please check your API key or internet connection!"
        }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const triggerMockResponse = (text) => {
    setTimeout(() => {
      let aiResponseText = "I'm sorry, I didn't quite catch that. Could you rephrase?";
      
      const lowercaseInput = text.toLowerCase();
      if (lowercaseInput.includes('schedule') || lowercaseInput.includes('time') || lowercaseInput.includes('event')) {
        aiResponseText = "The main event begins at 10:00 AM at BIEC Hall 1. Check the Schedule tab for full details!";
      } else if (lowercaseInput.includes('where') || lowercaseInput.includes('map') || lowercaseInput.includes('location')) {
        aiResponseText = "We are currently at the BIEC (Bengaluru International Exhibition Centre). Keynotes are at Hall 1, and workshops are in the Tech Pavilions.";
      } else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
        aiResponseText = "Hello! Enjoying the Aura Tech Summit India so far?";
      } else if (lowercaseInput.includes('food') || lowercaseInput.includes('lunch')) {
        aiResponseText = "Lunch is served at 1:00 PM in the BIEC Expo Center. We have a variety of options including authentic local cuisine and vegan options!";
      } else {
        aiResponseText = `Oops! You either haven't added your Gemini API key or the servers are busy. (Simulated Response: Looking into "${text}").`;
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: aiResponseText
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col flex-1 w-full min-h-0 relative">
      
      {/* Header */}
      <div className="px-4 md:px-8 py-4 border-b border-white/5 flex items-center justify-between z-10 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-primary-500 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-bold text-white flex items-center gap-2">
              Aura AI Concierge
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            </h3>
            <p className="text-xs text-slate-400">Powered by Google Services</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 w-full">
        <div className="max-w-3xl mx-auto w-full space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-slate-700 text-white' 
                  : 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
              }`}>
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  message.role === 'user' 
                    ? 'bg-slate-700 text-white rounded-tr-sm' 
                    : 'bg-slate-800 border border-white/5 text-slate-200 rounded-tl-sm'
                }`}>
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full shrink-0 bg-primary-500/20 text-primary-400 border border-primary-500/30 flex items-center justify-center">
                  <BotMessageSquare className="w-4 h-4" />
                </div>
                <div className="px-5 py-3 rounded-2xl bg-slate-800 border border-white/5 rounded-tl-sm flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 pb-8 md:pb-4">
        <form onSubmit={handleSend} className="relative max-w-3xl mx-auto w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about schedule, map, or speaker info..."
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm placeholder:text-slate-500 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary-600 hover:bg-primary-500 disabled:bg-slate-700 disabled:text-slate-500 text-white transition-all shadow-md group"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
