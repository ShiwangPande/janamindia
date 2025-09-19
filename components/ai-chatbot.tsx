"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, X, Send, Volume2, VolumeX, Loader2, Globe, AlertCircle, Copy, RefreshCw, Star, Settings, Minimize2, Maximize2, Bot, User, ChevronDown, ThumbsUp, ThumbsDown, Heart, Baby, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  rating?: 'up' | 'down' | null;
}

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
];

const SAMPLE_QUESTIONS = {
  en: [
    "What services does Janam provide?",
    "How can I access mobile birthing clinics?",
    "What midwifery training programs do you offer?",
    "How does Janam partner with National Health Mission?",
    "What areas do your mobile clinics cover?",
    "How can I become a certified midwife with Janam?",
    "What prenatal care services are available?"
  ],
  hi: [
    "जनम क्या सेवाएं प्रदान करता है?",
    "मैं मोबाइल प्रसव क्लिनिक तक कैसे पहुंच सकता हूं?",
    "आप कौन से दाई प्रशिक्षण कार्यक्रम प्रदान करते हैं?",
    "जनम राष्ट्रीय स्वास्थ्य मिशन के साथ कैसे भागीदारी करता है?",
    "आपके मोबाइल क्लिनिक कौन से क्षेत्रों को कवर करते हैं?",
    "मैं जनम के साथ प्रमाणित दाई कैसे बन सकता हूं?",
    "कौन सी प्रसवपूर्व देखभाल सेवाएं उपलब्ध हैं?"
  ],
};

const MATERNAL_TOPICS = {
  en: [
    { icon: "🤱", title: "Mobile Birthing Clinics", desc: "Safe delivery services at your location" },
    { icon: "👩‍⚕️", title: "Midwifery Training", desc: "Professional certification programs" },
    { icon: "🏥", title: "Partnership with NHM", desc: "Government collaboration for healthcare" },
    { icon: "👶", title: "Neonatal Care", desc: "Newborn health and wellness" },
    { icon: "💊", title: "Prenatal Services", desc: "Pregnancy care and monitoring" },
    { icon: "📱", title: "Healthcare Access", desc: "Reaching underserved communities" }
  ],
  hi: [
    { icon: "🤱", title: "मोबाइल प्रसव क्लिनिक", desc: "आपके स्थान पर सुरक्षित प्रसव सेवाएं" },
    { icon: "👩‍⚕️", title: "दाई प्रशिक्षण", desc: "व्यावसायिक प्रमाणन कार्यक्रम" },
    { icon: "🏥", title: "NHM के साथ साझेदारी", desc: "स्वास्थ्य सेवा के लिए सरकारी सहयोग" },
    { icon: "👶", title: "नवजात देखभाल", desc: "नवजात स्वास्थ्य और कल्याण" },
    { icon: "💊", title: "प्रसवपूर्व सेवाएं", desc: "गर्भावस्था देखभाल और निगरानी" },
    { icon: "📱", title: "स्वास्थ्य सेवा पहुंच", desc: "वंचित समुदायों तक पहुंचना" }
  ],
};

const TOPIC_HEADER = {
  en: "🏥 Janam Services I Can Help With",
  hi: "🏥 जनम सेवाएं जिनमें मैं मदद कर सकता हूं",
};

const TOPIC_QUESTIONS = {
  en: "Tell me about",
  hi: "मुझे बताएं",
};

// Enhanced OpenAI Manager with better error handling
class OpenAIManager {
  private baseUrl: string;
  private retryCount: number = 0;
  private maxRetries: number = 3;

  constructor() {
    this.baseUrl = '/api/chat';
  }

  async createCompletion(messages: any[], options: any = {}): Promise<any> {
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages,
            ...options,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        return response.json();
      } catch (error) {
        if (attempt === this.maxRetries) {
          throw error;
        }
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  hasApiKeys(): boolean {
    return true;
  }

  getApiKeyCount(): number {
    return 1;
  }
}

const styles = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideIn {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
    40%, 43% { transform: translateY(-8px); }
    70% { transform: translateY(-4px); }
    90% { transform: translateY(-2px); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(245, 135, 145, 0.4); }
    50% { box-shadow: 0 0 30px rgba(245, 135, 145, 0.7); }
  }

  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-10px); }
  }

  .animate-slide-in-right { animation: slideInRight 0.5s ease-out forwards; }
  .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
  .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
  .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
  .animate-bounce-custom { animation: bounce 2s infinite; }
  .animate-pulse-custom { animation: pulse 2s infinite; }
  .animate-glow { animation: glow 2s infinite; }
  .animate-typing { animation: typing 1.4s infinite; }

  .gradient-border {
    background: linear-gradient(45deg, #f58791, #e91e63, #ff6b9d, #c2185b);
    background-size: 400% 400%;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .glassmorphism {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .message-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }

  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export default function JanamChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [apiError, setApiError] = useState<string>('');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showTopics, setShowTopics] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openaiManager = useRef(new OpenAIManager());

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = (text: string) => {
    if (!isAudioEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const languageMap: { [key: string]: string } = {
      'en': 'en-IN', 'hi': 'hi-IN', 
    };

    utterance.lang = languageMap[selectedLanguage] || 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(selectedLanguage)) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];

    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const rateMessage = (messageId: string, rating: 'up' | 'down') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
  
    const userMessage = input.trim();
    setInput('');
    setApiError('');
    setShowTopics(false);
  
    const userMsg: Message = {
      id: Date.now() + '_user',
      text: userMessage,
      isUser: true,
      timestamp: new Date(),
    };
  
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setIsTyping(true);
  
    try {
      // Make actual API call to your backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          language: selectedLanguage,
          context: 'janam_maternal_healthcare' // Add context for Janam
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      
      if (!data.response) {
        throw new Error('No response received from the API');
      }
  
      const botMsg: Message = {
        id: Date.now() + '_bot',
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };
  
      setMessages(prev => [...prev, botMsg]);
  
      if (isAudioEnabled) {
        speakText(data.response);
      }
  
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  
      setApiError(errorMessage);
      
      // Show user-friendly error message based on error type
      let userErrorMessage = "I'm experiencing technical difficulties. Please try again in a moment.";
      
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        userErrorMessage = "Unable to connect to the service. Please check your internet connection and try again.";
      } else if (errorMessage.includes('503') || errorMessage.includes('Service Unavailable')) {
        userErrorMessage = "The service is temporarily unavailable. Please try again in a few moments.";
      } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
        userErrorMessage = "Too many requests. Please wait a moment before trying again.";
      } else if (errorMessage.includes('quota') || errorMessage.includes('billing')) {
        userErrorMessage = "The service is temporarily unavailable due to usage limits. Please try again later.";
      }
  
      setMessages(prev => [...prev, {
        id: Date.now() + '_error',
        text: userErrorMessage,
        isUser: false,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowTopics(true);
    setApiError('');
  };

  const currentQuestions = SAMPLE_QUESTIONS[selectedLanguage as keyof typeof SAMPLE_QUESTIONS] || SAMPLE_QUESTIONS.en;
  const currentLanguage = LANGUAGES.find(lang => lang.code === selectedLanguage);

// Markdown renderer component
const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const renderMarkdown = (text: string) => {
    // Convert markdown to HTML
    let html = text
      // Bold text **text** or __text__
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      // Italic text *text* or _text_
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      // Code blocks ```code```
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-2 rounded text-sm overflow-x-auto"><code>$1</code></pre>')
      // Inline code `code`
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      // Links [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-rose-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br/>')
      .replace(/^\* (.+)$/gm, '<li class="ml-4">• $1</li>')
      .replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>');

    return html;
  };

  return (
    <div 
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
    />
  );
};

  return (
    <>
      <style>{styles}</style>
      <div className="fixed bottom-6 right-6 z-50 sm:bottom-6 sm:right-6 mt-16 sm:mt-0">
        {!isOpen ? (
          <div className="relative">
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 hover:from-pink-500 hover:to-rose-400 text-white shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110 group animate-glow"
            >
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 drop-shadow-md transition-transform duration-300 group-hover:scale-110 animate-bounce-custom" />
            </Button>
            
            {showWelcomeMessage && (
              <div className="absolute bottom-20 right-0 sm:bottom-24 sm:right-2">
                <div className="relative animate-slide-in-right">
                  <div className="bg-gradient-to-br from-rose-400/90 to-pink-500/90 backdrop-blur-lg rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-xl max-w-[280px] w-[90vw] sm:w-[300px] transition-transform transform hover:scale-105 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold text-sm">Janam Assistant Online</span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Namaste! I'm here to help with maternal & neonatal care. Ask about our mobile clinics, midwifery training, or pregnancy support!
                    </p>
                  </div>
                  <div className="absolute top-full right-10 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-pink-500"></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Card className={cn(
            "w-[calc(100vw-2rem)] sm:w-[380px] md:w-[420px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slide-up gradient-border",
            isMinimized ? "h-16" : "h-[calc(100vh-6rem)] sm:h-[700px]"
          )}>
            {/* Header */}
            <div className="p-3 sm:p-4 flex items-center justify-between bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-t-2xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse-custom"></div>
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">Janam Assistant</h3>
                  <p className="text-[10px] sm:text-xs text-white/80">
                    {currentLanguage?.flag} {currentLanguage?.name} • Maternal Care
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-white/20 transition-colors"
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  title={isAudioEnabled ? "Disable audio" : "Enable audio"}
                >
                  {isAudioEnabled ? <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" /> : <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-white/20 transition-colors"
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" /> : <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-white/20 transition-colors"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Language Selector */}
                <div className="p-3 sm:p-4 border-b bg-gradient-to-r from-rose-50 to-pink-50">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-rose-600" />
                      <span className="text-xs sm:text-sm font-medium text-rose-700">Language</span>
                    </div>
                    {messages.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[10px] sm:text-xs text-rose-600 hover:text-rose-800"
                        onClick={clearChat}
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Clear Chat
                      </Button>
                    )}
                  </div>
                  
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-rose-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-rose-50/30 to-white scrollbar-thin">
                  {messages.length === 0 ? (
                    <div className="text-center space-y-6 animate-fade-in">
                      {/* Maternal Care Topics */}
                      {showTopics && (
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-rose-800 mb-4">
                            {TOPIC_HEADER[selectedLanguage as keyof typeof TOPIC_HEADER]}
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {MATERNAL_TOPICS[selectedLanguage as keyof typeof MATERNAL_TOPICS].map((topic, index) => (
                              <div
                                key={index}
                                className="p-3 bg-white rounded-lg border border-rose-200 hover:border-rose-300 hover:shadow-md transition-all duration-200 cursor-pointer text-left"
                                onClick={() => setInput(`${TOPIC_QUESTIONS[selectedLanguage as keyof typeof TOPIC_QUESTIONS]} ${topic.title}`)}
                              >
                                <div className="text-lg mb-1">{topic.icon}</div>
                                <div className="text-sm font-medium text-rose-800">{topic.title}</div>
                                <div className="text-xs text-rose-600">{topic.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sample Questions */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-rose-700">Common Questions</h4>
                        <div className="space-y-2">
                          {currentQuestions.slice(0, 4).map((question, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full text-left text-sm py-3 px-4 border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 justify-start transition-all duration-200 hover:scale-[1.02] rounded-lg"
                              onClick={() => setInput(question)}
                            >
                              {question}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex animate-slide-in group",
                          message.isUser ? "justify-end" : "justify-start"
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start gap-3 max-w-[85%]">
                          {!message.isUser && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                              <Heart className="h-4 w-4 text-white" />
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <div
                              className={cn(
                                "rounded-2xl p-4 text-sm transition-all duration-200 message-hover",
                                message.isUser
                                  ? "bg-gradient-to-r from-rose-400 to-pink-500 text-white ml-auto"
                                  : "bg-white border border-rose-200 text-rose-800 shadow-sm"
                              )}
                            >
                             {message.isUser ? (
                                <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                              ) : (
                                <MarkdownRenderer text={message.text} />
                              )}
                              
                              {!message.isUser && (
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-rose-100">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 px-2 text-xs opacity-70 hover:opacity-100"
                                      onClick={() => copyToClipboard(message.text)}
                                    >
                                      <Copy className="h-3 w-3 mr-1" />
                                      Copy
                                    </Button>
                                    
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 px-2 text-xs opacity-70 hover:opacity-100"
                                      onClick={() => speakText(message.text)}
                                    >
                                      <Volume2 className="h-3 w-3 mr-1" />
                                      Read
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={cn(
                                        "h-7 px-2 text-xs opacity-70 hover:opacity-100",
                                        message.rating === 'up' && "text-green-600"
                                      )}
                                      onClick={() => rateMessage(message.id, 'up')}
                                      title="Helpful"
                                    >
                                      <ThumbsUp className="h-3 w-3 mr-1" />
                                      Helpful
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={cn(
                                        "h-7 px-2 text-xs opacity-70 hover:opacity-100",
                                        message.rating === 'down' && "text-rose-600"
                                      )}
                                      onClick={() => rateMessage(message.id, 'down')}
                                      title="Not helpful"
                                    >
                                      <ThumbsDown className="h-3 w-3 mr-1" />
                                      Not helpful
                                    </Button>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-rose-400">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {message.isUser && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-3 max-w-[85%] animate-fade-in">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <Heart className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="rounded-2xl p-4 bg-white border border-rose-200 text-rose-800 shadow-sm">
                          <span className="inline-block animate-typing">...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Error message */}
                {apiError && (
                  <div className="p-3 sm:p-4 bg-rose-50 border-t border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-rose-500" />
                    <span>{apiError}</span>
                  </div>
                )}

                {/* Input Area */}
                <form
                  className="p-3 sm:p-4 border-t bg-gradient-to-r from-rose-50 to-pink-50 flex items-center gap-2"
                  onSubmit={e => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={
                      selectedLanguage === 'hi'
                        ? "अपना सवाल लिखें..."
                        : "Type your question..."
                    }
                    className="flex-1 rounded-lg border border-rose-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 bg-white"
                    disabled={isLoading}
                    autoFocus
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg hover:from-pink-500 hover:to-rose-400 transition-all duration-200 disabled:opacity-60"
                    disabled={isLoading || !input.trim()}
                    title="Send"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </form>
              </>
            )}
          </Card>
        )}
      </div>
    </>
  );
}