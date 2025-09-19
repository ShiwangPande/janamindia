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

// --- COLOR PALETTE ---
// Emerald Green: #2E7D32 (primary)
// Mint Green: #A5D6A7 (backgrounds, accents)
// Forest Green: #1B5E20 (headers, banners)
// Coral Peach: #FFB5A7 (highlights, icons)
// Beige/Cream: #FFF3E6 (main background)
// Charcoal Gray: #424242 (text)
// Cool Gray: #BDBDBD (secondary text, dividers)
// Deep Maroon: #7A2E2E (CTA, strong contrast)

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
    0%, 100% { box-shadow: 0 0 20px rgba(46, 125, 50, 0.4); }
    50% { box-shadow: 0 0 30px rgba(46, 125, 50, 0.7); }
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
    background: linear-gradient(45deg, #2E7D32, #A5D6A7, #FFB5A7, #1B5E20);
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
    box-shadow: 0 4px 12px rgba(46, 125, 50, 0.15);
  }

  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }

  .scrollbar-thin::-webkit-scrollbar-track {
    background: #FFF3E6;
    border-radius: 10px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #BDBDBD;
    border-radius: 10px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #A5D6A7;
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
      .replace(/```([\s\S]*?)```/g, '<pre style="background:#A5D6A7; color:#1B5E20; padding:0.5rem; border-radius:0.5rem; font-size:0.95em; overflow-x:auto;"><code>$1</code></pre>')
      // Inline code `code`
      .replace(/`(.*?)`/g, '<code style="background:#A5D6A7; color:#1B5E20; padding:0.15em 0.4em; border-radius:0.3em; font-size:0.95em;">$1</code>')
      // Links [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#7A2E2E; text-decoration:underline;" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br/>')
      .replace(/^\* (.+)$/gm, '<li style="margin-left:1rem; color:#2E7D32;">• $1</li>')
      .replace(/^- (.+)$/gm, '<li style="margin-left:1rem; color:#2E7D32;">• $1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li style="margin-left:1rem; color:#2E7D32; list-style-type:decimal;">$1</li>');

    return html;
  };

  return (
    <div 
      className="prose prose-sm max-w-none"
      style={{ color: "#424242" }}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
    />
  );
};

  return (
    <>
      <style>{styles}</style>
      <div className="fixed bottom-6 right-6 z-50 sm:bottom-6 sm:right-6 mt-16 sm:mt-0 ">
        {!isOpen ? (
          <div className="relative">
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#A5D6A7] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110 group animate-glow"
            >
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 drop-shadow-md transition-transform duration-300 group-hover:scale-110 animate-bounce-custom" style={{ color: "#FFB5A7" }} />
            </Button>
            
            {showWelcomeMessage && (
              <div className="absolute bottom-20 right-0 sm:bottom-24 sm:right-2">
                <div className="relative animate-slide-in-right">
                  <div className="backdrop-blur-lg rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-xl max-w-[280px] w-[90vw] sm:w-[300px] transition-transform transform hover:scale-105 border border-[#A5D6A7] bg-[#2E7D32]/90"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-[#2E7D32] rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold text-sm">Janam Assistant Online</span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Namaste! I'm here to help with maternal & neonatal care. Ask about our mobile clinics, midwifery training, or pregnancy support!
                    </p>
                  </div>
                  <div className="absolute top-full right-10 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent" style={{ borderTopColor: "#2E7D32" }}></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Card className={cn(
            "w-[calc(100vw-2rem)] sm:w-[380px] md:w-[420px] shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slide-up gradient-border",
            isMinimized ? "h-22" : "h-[calc(100vh-6rem)] sm:h-[700px]"
          )} style={{ background: "#FFF3E6" }}>
            {/* Header */}
            <div className="p-3 sm:p-4 flex items-center justify-between rounded-t-2xl" style={{ background: "linear-gradient(90deg, #1B5E20 0%, #2E7D32 100%)", color: "#FFF3E6" }}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: "#FFB5A7" }} />
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-[#2E7D32] rounded-full animate-pulse-custom"></div>
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg" style={{ color: "#FFF3E6" }}>Janam Assistant</h3>
                  <p className="text-[10px] sm:text-xs" style={{ color: "#A5D6A7" }}>
                    {currentLanguage?.flag} {currentLanguage?.name} • Maternal Care
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-[#A5D6A7]/30 transition-colors"
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  title={isAudioEnabled ? "Disable audio" : "Enable audio"}
                >
                  {isAudioEnabled ? <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "#FFF3E6" }} /> : <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "#FFF3E6" }} />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-[#A5D6A7]/30 transition-colors"
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "#FFF3E6" }} /> : <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "#FFF3E6" }} />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-[#A5D6A7]/30 transition-colors"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "#FFF3E6" }} />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Language Selector */}
                <div className="p-3 sm:p-4 border-b" style={{ background: "linear-gradient(90deg, #A5D6A7 0%, #FFF3E6 100%)", borderColor: "#BDBDBD" }}>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "#2E7D32" }} />
                      <span className="text-xs sm:text-sm font-medium" style={{ color: "#1B5E20" }}>Language</span>
                    </div>
                    {messages.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[10px] sm:text-xs"
                        style={{ color: "#7A2E2E" }}
                        onClick={clearChat}
                      >
                        <RefreshCw className="h-3 w-3 mr-1" style={{ color: "#7A2E2E" }} />
                        Clear Chat
                      </Button>
                    )}
                  </div>
                  
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-2 sm:p-3 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      borderColor: "#A5D6A7",
                      color: "#1B5E20",
                      background: "#FFF3E6",
                      fontWeight: 500
                    }}
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin"
                  style={{ background: "linear-gradient(180deg, #A5D6A7 0%, #FFF3E6 100%)" }}
                >
                  {messages.length === 0 ? (
                    <div className="text-center space-y-6 animate-fade-in">
                      {/* Maternal Care Topics */}
                      {showTopics && (
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold mb-4" style={{ color: "#1B5E20" }}>
                            {TOPIC_HEADER[selectedLanguage as keyof typeof TOPIC_HEADER]}
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {MATERNAL_TOPICS[selectedLanguage as keyof typeof MATERNAL_TOPICS].map((topic, index) => (
                              <div
                                key={index}
                                className="p-3 rounded-lg border hover:shadow-md transition-all duration-200 cursor-pointer text-left"
                                style={{
                                  background: "#FFF3E6",
                                  borderColor: "#A5D6A7",
                                  color: "#2E7D32"
                                }}
                                onClick={() => setInput(`${TOPIC_QUESTIONS[selectedLanguage as keyof typeof TOPIC_QUESTIONS]} ${topic.title}`)}
                                onMouseOver={e => (e.currentTarget.style.background = "#A5D6A7")}
                                onMouseOut={e => (e.currentTarget.style.background = "#FFF3E6")}
                              >
                                <div className="text-lg mb-1" style={{ color: "#FFB5A7" }}>{topic.icon}</div>
                                <div className="text-sm font-medium" style={{ color: "#1B5E20" }}>{topic.title}</div>
                                <div className="text-xs" style={{ color: "#7A2E2E" }}>{topic.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sample Questions */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium" style={{ color: "#2E7D32" }}>Common Questions</h4>
                        <div className="space-y-2">
                          {currentQuestions.slice(0, 4).map((question, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full text-left text-sm py-3 px-4 justify-start transition-all duration-200 hover:scale-[1.02] rounded-lg"
                              style={{
                                borderColor: "#A5D6A7",
                                color: "#1B5E20",
                                background: "#FFF3E6"
                              }}
                              onMouseOver={e => (e.currentTarget.style.background = "#A5D6A7")}
                              onMouseOut={e => (e.currentTarget.style.background = "#FFF3E6")}
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
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                              style={{ background: "linear-gradient(90deg, #2E7D32 0%, #A5D6A7 100%)" }}
                            >
                              <Heart className="h-4 w-4" style={{ color: "#FFB5A7" }} />
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <div
                              className={cn(
                                "rounded-2xl p-4 text-sm transition-all duration-200 message-hover",
                                message.isUser
                                  ? ""
                                  : ""
                              )}
                              style={
                                message.isUser
                                  ? {
                                      background: "linear-gradient(90deg, #2E7D32 0%, #A5D6A7 100%)",
                                      color: "#FFF3E6",
                                      marginLeft: "auto"
                                    }
                                  : {
                                      background: "#FFF3E6",
                                      border: "1px solid #A5D6A7",
                                      color: "#424242",
                                      boxShadow: "0 1px 4px 0 #A5D6A7"
                                    }
                              }
                            >
                             {message.isUser ? (
                                <p className="whitespace-pre-wrap leading-relaxed" style={{ color: "#FFF3E6" }}>{message.text}</p>
                              ) : (
                                <MarkdownRenderer text={message.text} />
                              )}
                              
                              {!message.isUser && (
                                <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid #BDBDBD" }}>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 px-2 text-xs opacity-70 hover:opacity-100"
                                      style={{ color: "#2E7D32" }}
                                      onClick={() => copyToClipboard(message.text)}
                                    >
                                      <Copy className="h-3 w-3 mr-1" style={{ color: "#2E7D32" }} />
                                      Copy
                                    </Button>
                                    
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 px-2 text-xs opacity-70 hover:opacity-100"
                                      style={{ color: "#2E7D32" }}
                                      onClick={() => speakText(message.text)}
                                    >
                                      <Volume2 className="h-3 w-3 mr-1" style={{ color: "#2E7D32" }} />
                                      Read
                                    </Button>
                                   
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px]" style={{ color: "#BDBDBD" }}>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {message.isUser && (
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                              style={{ background: "linear-gradient(90deg, #2E7D32 0%, #A5D6A7 100%)" }}
                            >
                              <User className="h-4 w-4" style={{ color: "#FFB5A7" }} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-3 max-w-[85%] animate-fade-in">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{ background: "linear-gradient(90deg, #2E7D32 0%, #A5D6A7 100%)" }}
                      >
                        <Heart className="h-4 w-4" style={{ color: "#FFB5A7" }} />
                      </div>
                      <div className="flex-1">
                        <div className="rounded-2xl p-4" style={{ background: "#FFF3E6", border: "1px solid #A5D6A7", color: "#424242", boxShadow: "0 1px 4px 0 #A5D6A7" }}>
                          <span className="inline-block animate-typing">...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Error message */}
                {apiError && (
                  <div className="p-3 sm:p-4 border-t text-xs flex items-center gap-2"
                    style={{ background: "#FFB5A7", borderColor: "#BDBDBD", color: "#7A2E2E" }}
                  >
                    <AlertCircle className="h-4 w-4" style={{ color: "#7A2E2E" }} />
                    <span>{apiError}</span>
                  </div>
                )}

                {/* Input Area */}
                <form
                  className="p-3 sm:p-4 border-t flex items-center gap-2"
                  style={{ background: "linear-gradient(90deg, #A5D6A7 0%, #FFF3E6 100%)", borderColor: "#BDBDBD" }}
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
                    className="flex-1 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      border: "1px solid #A5D6A7",
                      background: "#FFF3E6",
                      color: "#424242"
                    }}
                    disabled={isLoading}
                    autoFocus
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-10 w-10 rounded-full shadow-lg transition-all duration-200 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #2E7D32 0%, #A5D6A7 100%)",
                      color: "#FFF3E6"
                    }}
                    disabled={isLoading || !input.trim()}
                    title="Send"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" style={{ color: "#FFF3E6" }} />
                    ) : (
                      <Send className="h-5 w-5" style={{ color: "#FFF3E6" }} />
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