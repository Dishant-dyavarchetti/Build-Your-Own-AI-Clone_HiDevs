"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send, User, Bot, Brain, Search } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: string[]
  retrievalScore?: number
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI Clone powered by RAG technology. I can help you with questions based on the knowledge base. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate RAG pipeline processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Based on the retrieved context, I can help you with "${input}". This response is generated using RAG technology, combining retrieved relevant documents with Llama 3's generation capabilities.

Here's a comprehensive answer that demonstrates the RAG pipeline in action:

1. **Query Processing**: Your question was processed and converted to embeddings
2. **Document Retrieval**: Relevant documents were found using vector similarity search
3. **Context Integration**: Retrieved context was integrated with the prompt
4. **Response Generation**: Llama 3 generated this contextually aware response

The system uses advanced prompt engineering techniques to ensure accurate and relevant responses.`,
        timestamp: new Date(),
        sources: [
          "Document 1: RAG Implementation Guide",
          "Document 2: AI Best Practices",
          "Document 3: Vector Database Tutorial",
        ],
        retrievalScore: 0.87,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          RAG-Powered Chat Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                    }`}
                  >
                    {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.sources && (
                      <div className="mt-2 pt-2 border-t border-slate-200">
                        <div className="flex items-center gap-1 mb-1">
                          <Search className="w-3 h-3" />
                          <span className="text-xs font-medium">Sources:</span>
                        </div>
                        <div className="space-y-1">
                          {message.sources.map((source, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                        {message.retrievalScore && (
                          <div className="mt-1">
                            <Badge variant="secondary" className="text-xs">
                              Relevance: {(message.retrievalScore * 100).toFixed(1)}%
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-100 rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-slate-600">Processing query through RAG pipeline...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about the knowledge base..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
