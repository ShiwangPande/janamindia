"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting message
      const greeting =
        language === "hi"
          ? "नमस्ते! मैं जनम कृत्रिम बुद्धिमत्ता सहायक हूं। मैं मातृ स्वास्थ्य, प्रसव, और हमारे कार्यक्रमों के बारे में आपकी मदद कर सकता हूं। आप क्या जानना चाहते हैं?"
          : "Hello! I'm the Janam AI Assistant. I can help you with questions about maternal health, safe births, and our programs. What would you like to know?"

      setMessages([
        {
          id: "1",
          type: "bot",
          content: greeting,
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, language])

  const quickQuestions =
    language === "hi"
      ? ["सुरक्षित प्रसव के लिए क्या करें?", "दाई प्रशिक्षण कैसे मिले?", "दान कैसे करें?", "स्वयंसेवक कैसे बनें?"]
      : ["How to have a safe birth?", "How to get midwife training?", "How can I donate?", "How to become a volunteer?"]

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (language === "hi") {
      if (lowerMessage.includes("प्रसव") || lowerMessage.includes("जन्म")) {
        return "सुरक्षित प्रसव के लिए: नियमित जांच कराएं, कुशल दाई की मदद लें, स्वच्छता बनाए रखें, और खतरे के संकेतों को पहचानें। हमारे कंटेनर क्लिनिक और प्रशिक्षित दाइयां आपकी मदद के लिए तैयार हैं।"
      } else if (lowerMessage.includes("प्रशिक्षण") || lowerMessage.includes("दाई")) {
        return "हमारा दाई प्रशिक्षण कार्यक्रम 6 महीने का है। इसमें चिकित्सा कौशल, सामुदायिक एकीकरण, और प्रमाणन शामिल है। आवेदन के लिए हमारे प्रशिक्षण पेज पर जाएं।"
      } else if (lowerMessage.includes("दान") || lowerMessage.includes("सहायता")) {
        return "आपका ₹500 का दान एक सुरक्षित प्रसव में मदद करता है। आप मासिक या एक बार दान कर सकते हैं। 'शामिल हों' पेज पर जाकर दान करें।"
      } else if (lowerMessage.includes("स्वयंसेवक")) {
        return "आप सामुदायिक स्वयंसेवक, डिजिटल स्वयंसेवक, या क्लिनिकल ट्रेनर बन सकते हैं। अपने कौशल के अनुसार विकल्प चुनें और आवेदन करें।"
      }
      return "मैं मातृ स्वास्थ्य, सुरक्षित प्रसव, दाई प्रशिक्षण, दान, और स्वयंसेवा के बारे में जानकारी दे सकता हूं। कृपया अपना प्रश्न स्पष्ट करें।"
    } else {
      if (lowerMessage.includes("birth") || lowerMessage.includes("delivery")) {
        return "For safe births: Attend regular prenatal checkups, seek skilled birth attendance, maintain hygiene, and know danger signs. Our container clinics and trained midwives are here to help."
      } else if (lowerMessage.includes("training") || lowerMessage.includes("midwife")) {
        return "Our midwifery training program is 6 months long, covering clinical skills, community integration, and certification. Visit our Training page to apply."
      } else if (lowerMessage.includes("donate") || lowerMessage.includes("donation")) {
        return "Your ₹500 donation helps ensure one safe delivery. You can donate monthly or one-time. Visit our 'Get Involved' page to make a donation."
      } else if (lowerMessage.includes("volunteer")) {
        return "You can become a Community Volunteer, Digital Volunteer, or Clinical Trainer. Choose based on your skills and apply through our volunteer program."
      }
      return "I can help with information about maternal health, safe births, midwife training, donations, and volunteering. Please let me know what specific information you need."
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] z-50">
          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5" />
                {language === "hi" ? "जनम कृत्रिम बुद्धिमत्ता सहायक" : "Janam AI Assistant"}
                <Badge variant="secondary" className="ml-auto text-xs">
                  {language === "hi" ? "ऑनलाइन" : "Online"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.type === "user" && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length <= 1 && (
                <div className="p-4 border-t bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">
                    {language === "hi" ? "त्वरित प्रश्न:" : "Quick questions:"}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto p-2 justify-start bg-transparent"
                        onClick={() => handleSendMessage(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={language === "hi" ? "अपना प्रश्न लिखें..." : "Type your question..."}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    size="sm"
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
