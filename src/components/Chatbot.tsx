import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GoogleGenAI } from '@google/genai';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Bonjour ! Je suis l'assistant TipazaEats. Je peux vous aider à trouver des restaurants, calculer des itinéraires ou vous donner des informations sur Cherchell et Tipaza grâce à Google Maps. Que cherchez-vous ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'model', content: "Désolé, la clé API Gemini n'est pas configurée sur ce serveur." }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });

      // We need to format the history for the model
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      // Append the new user message
      history.push({ role: 'user', parts: [{ text: userMsg }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: history,
        tools: [{ googleMaps: {} }],
        config: {
          systemInstruction: "Tu es un assistant virtuel pour TipazaEats, une application de livraison de repas à Cherchell et Tipaza en Algérie. Utilise l'outil Google Maps pour trouver des lieux, des restaurants, ou calculer des temps de trajet dans la région de Tipaza/Cherchell. Réponds toujours en français de manière polie et concise.",
        }
      });

      if (response.text) {
        setMessages(prev => [...prev, { role: 'model', content: response.text as string }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', content: "Désolé, je n'ai pas pu générer une réponse." }]);
      }
    } catch (error) {
      console.error("Erreur Gemini:", error);
      setMessages(prev => [...prev, { role: 'model', content: "Désolé, une erreur s'est produite lors de la communication avec l'assistant." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] flex flex-col shadow-xl z-50 border-primary/20">
          <CardHeader className="p-4 border-b bg-primary/5 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Assistant TipazaEats
            </CardTitle>
            <Button variant="ghost" size="icon-sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl px-4 py-2 text-sm bg-muted rounded-bl-sm flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary/50 rounded-full animate-bounce" />
                      <div className="h-2 w-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="h-2 w-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Posez une question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
