
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, ArrowLeft, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

type ChatStep = "topics" | "chat";

// Predefined topics for quick selection
const suggestedTopics = [
  { id: "products", label: "Products & Categories", icon: "📦" },
  { id: "shipping", label: "Shipping & Delivery", icon: "🚚" },
  { id: "returns", label: "Returns & Refunds", icon: "↩️" },
  { id: "seller", label: "Become a Seller", icon: "🛍️" },
  { id: "payment", label: "Payment Options", icon: "💳" },
  { id: "tracking", label: "Order Tracking", icon: "🔍" },
];

// Fallback response in case API key is not available
const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! How can I assist you with Bharat Connect today?";
  } else if (lowerMessage.includes("product") || lowerMessage.includes("items")) {
    return "We have a wide variety of authentic Indian products including handicrafts, traditional attire, and more. Is there something specific you're looking for?";
  } else if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery")) {
    return "We ship to over 219 countries worldwide via India Post. Shipping time varies by location, but typically takes 7-14 business days for international orders and 3-5 days within India.";
  } else {
    return "I'm here to help with information about Indian products, shipping via India Post, orders, and more. Could you please provide more details about your question?";
  }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! Welcome to Bharat Connect. How can I assist you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<ChatStep>("topics");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Check for API key in localStorage
  useEffect(() => {
    const storedKey = localStorage.getItem("gemini_api_key");
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSaveApiKey = (key: string) => {
    if (key.trim()) {
      setApiKey(key);
      localStorage.setItem("gemini_api_key", key);
      toast({
        title: "API Key Saved",
        description: "Your Gemini API key has been saved securely to your browser's local storage.",
      });
    }
  };

  // Get Gemini AI response
  const getGeminiResponse = async (prompt: string): Promise<string> => {
    try {
      if (!apiKey) {
        throw new Error("API key not found");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Create a context for the chatbot
      const systemPrompt = `You are an assistant for Bharat Connect, an e-commerce platform that connects 
      Indian artisans and sellers with global customers. Your name is Bharat Connect Assistant.
      You help customers with information about:
      - Authentic Indian products (handicrafts, traditional attire, home decor, etc.)
      - Shipping through India Post (international and domestic delivery)
      - Payment options (credit/debit cards, UPI, CoD)
      - Return and refund policies (14-day return policy)
      - Seller registration process
      - Order tracking
      
      Keep your responses friendly, concise, and focused on Indian products and services. 
      Do not make up information. If you're unsure, ask for clarification.
      
      Current user query: ${prompt}`;

      const result = await model.generateContent(systemPrompt);
      const response = result.response.text();
      return response || "I apologize, but I couldn't generate a response. Please try again or contact our customer support.";
    } catch (error) {
      console.error("Error with Gemini API:", error);
      return getFallbackResponse(prompt);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Get AI response
      const response = await getGeminiResponse(inputValue);
      
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error in chat:", error);
      
      // Fallback response
      const fallbackResponse: Message = {
        id: `bot-${Date.now()}`,
        content: "I'm sorry, I encountered an error. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSelectTopic = async (topic: string) => {
    const topicMessage: Message = {
      id: `user-${Date.now()}`,
      content: topic,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, topicMessage]);
    setIsTyping(true);
    setStep("chat");

    try {
      // Get AI response for the selected topic
      const response = await getGeminiResponse(topic);
      
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error in chat:", error);
      
      // Fallback response
      const fallbackResponse: Message = {
        id: `bot-${Date.now()}`,
        content: "I'm sorry, I encountered an error. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      toast({
        title: "Chat Assistant Activated",
        description: "Ask anything about our products, shipping via India Post, or services.",
      });
    }
  };

  return (
    <>
      {/* API Key Input Dialog */}
      {isOpen && !apiKey && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Enter Gemini API Key</h3>
            <p className="text-sm text-gray-600 mb-4">
              To enable the AI chatbot, please enter your Gemini API key. 
              You can get one for free from the Google AI Studio.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const key = formData.get('apiKey') as string;
              handleSaveApiKey(key);
            }}>
              <Input 
                name="apiKey" 
                placeholder="Paste your Gemini API key here" 
                className="mb-4"
                required
              />
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Key</Button>
              </div>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              Your API key is stored only in your browser and is not sent to our servers.
            </p>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? "bg-gray-700" : "bg-indian-red"
        }`}
        aria-label="Chat with Bharat Connect"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat Interface */}
      <div
        className={`fixed bottom-24 right-6 w-[90vw] sm:w-96 max-w-md h-[500px] max-h-[75vh] bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden transition-all duration-300 transform ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        {/* Chat Header */}
        <div className="bg-indian-red p-4 text-white flex items-center">
          {step === "chat" && (
            <button 
              className="mr-2 hover:bg-indian-red/80 p-1 rounded-full"
              onClick={() => setStep("topics")}
              aria-label="Back to topics"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div>
            <h3 className="font-medium flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Bharat Connect Assistant
            </h3>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs bg-white/20 text-white border-transparent">
                Online
              </Badge>
              <p className="text-xs text-white/80 ml-2">
                Powered by Gemini AI
              </p>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        {step === "topics" ? (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-1">Get quick answers</h4>
              <p className="text-gray-600 text-sm">Select a topic or ask any question about our services</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {suggestedTopics.map((topic) => (
                <button
                  key={topic.id}
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-left border border-gray-200 transition-colors"
                  onClick={() => handleSelectTopic(topic.label)}
                >
                  <div className="text-xl mb-1">{topic.icon}</div>
                  <div className="text-sm font-medium text-gray-800">{topic.label}</div>
                </button>
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 mb-2">Can't find what you're looking for?</p>
              <Button 
                onClick={() => setStep("chat")} 
                className="bg-indian-red hover:bg-indian-red/90 text-white"
              >
                Ask a custom question
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 max-w-[85%] ${
                  message.role === "user" ? "ml-auto" : "mr-auto"
                }`}
              >
                <div className="flex items-start">
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src="/lovable-uploads/249d91fe-95aa-4a19-8f7e-90615cdca296.png" alt="Bharat Connect" />
                      <AvatarFallback className="bg-indian-gold text-white text-xs">BC</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-indian-red text-white rounded-tr-none"
                          : "bg-white border border-gray-200 shadow-sm rounded-tl-none"
                      }`}
                    >
                      {message.content}
                    </div>
                    <div
                      className={`text-xs mt-1 text-gray-500 ${
                        message.role === "user" ? "text-right" : ""
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 ml-2 mt-1 bg-gray-200">
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="mb-4 max-w-[85%] mr-auto">
                <div className="flex items-start">
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage src="/lovable-uploads/249d91fe-95aa-4a19-8f7e-90615cdca296.png" alt="Bharat Connect" />
                    <AvatarFallback className="bg-indian-gold text-white text-xs">BC</AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg bg-white border border-gray-200 shadow-sm rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "100ms" }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 mr-2"
              onFocus={() => {
                if (step === "topics") setStep("chat");
              }}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-indian-red hover:bg-indian-red/90 text-white"
                    disabled={!inputValue.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {apiKey ? "Powered by Gemini AI" : "Enter API key to enable AI chat"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
