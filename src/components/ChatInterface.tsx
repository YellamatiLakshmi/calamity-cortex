
import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, AlertTriangle, Clock, Map, Radio } from 'lucide-react';
import { fetchDisasterData } from '@/services/disasterDataService';
import { toast } from "sonner";

type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: "I'm DisasterScope AI, here to provide emergency assistance. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Prepare context for the AI
      const conversationContext = messages
        .slice(-5)
        .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');

      // Create prompt for Gemini
      const prompt = `
        You are DisasterScope AI, a specialized disaster response and emergency assistant.
        
        Your capabilities:
        - Provide real-time disaster information and updates
        - Offer emergency preparedness advice
        - Help users with evacuation planning
        - Give specific safety instructions for different disaster types
        - Connect users with emergency services
        
        Current conversation:
        ${conversationContext}
        
        User: ${userMessage.content}
        
        Respond in a helpful, informative way. If this is an emergency situation, prioritize immediate safety advice. If you don't know something specific, be honest but try to provide general guidance that could help.
      `;
      
      // Call Gemini API
      const response = await fetchDisasterData(
        'gemini',
        'generateContent',
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }
      );
      
      // Handle API response
      if (response.data && response.data.candidates && response.data.candidates[0]) {
        const content = response.data.candidates[0].content.parts[0].text;
        
        // Add bot message
        const botMessage: MessageType = {
          id: (Date.now() + 1).toString(),
          content: content,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error('Invalid response from AI');
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error('Failed to get AI response. Please try again.');
      
      // Add fallback bot message
      const fallbackMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again or contact emergency services directly if you're in an urgent situation.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'report':
        setInputValue('I need to report an emergency in my area.');
        break;
      case 'location':
        setInputValue('My current location is [ENTER YOUR LOCATION].');
        break;
      case 'updates':
        setInputValue('What are the latest disaster updates in my area?');
        break;
      case 'authorities':
        setInputValue('How can I contact local emergency authorities?');
        break;
    }
  };

  return (
    <div className="w-full h-full flex flex-col rounded-2xl border bg-card overflow-hidden">
      {/* Chat header */}
      <div className="p-4 border-b bg-muted/30 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">DisasterScope AI Assistant</h3>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
              Online • Emergency Response Ready
            </p>
          </div>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs sm:max-w-md p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-none'
                  : 'bg-muted rounded-tl-none'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.sender === 'bot' && (
                  <Bot className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                )}
                <div className="flex-1 break-words">
                  {message.content}
                </div>
                {message.sender === 'user' && (
                  <User className="h-5 w-5 mt-0.5 text-primary-foreground flex-shrink-0" />
                )}
              </div>
              <div className="mt-1 text-right">
                <span className={`text-xs ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-xs sm:max-w-md p-3 rounded-2xl bg-muted rounded-tl-none">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick action buttons */}
      <div className="px-4 py-2 border-t bg-muted/10">
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button 
            className="px-3 py-1.5 flex items-center text-xs font-medium rounded-full bg-muted/50 hover:bg-muted transition whitespace-nowrap"
            onClick={() => handleQuickAction('report')}
          >
            <AlertTriangle className="h-3 w-3 mr-1 text-disaster-red" />
            Report emergency
          </button>
          <button 
            className="px-3 py-1.5 flex items-center text-xs font-medium rounded-full bg-muted/50 hover:bg-muted transition whitespace-nowrap"
            onClick={() => handleQuickAction('location')}
          >
            <Map className="h-3 w-3 mr-1" />
            Share location
          </button>
          <button 
            className="px-3 py-1.5 flex items-center text-xs font-medium rounded-full bg-muted/50 hover:bg-muted transition whitespace-nowrap"
            onClick={() => handleQuickAction('updates')}
          >
            <Clock className="h-3 w-3 mr-1" />
            Latest updates
          </button>
          <button
            className="px-3 py-1.5 flex items-center text-xs font-medium rounded-full bg-muted/50 hover:bg-muted transition whitespace-nowrap"
            onClick={() => handleQuickAction('authorities')}
          >
            <Radio className="h-3 w-3 mr-1" />
            Contact authorities
          </button>
        </div>
      </div>
      
      {/* Chat input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your emergency or question..."
          className="flex-1 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary rounded-lg px-4 py-2.5 text-sm"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="p-2.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
