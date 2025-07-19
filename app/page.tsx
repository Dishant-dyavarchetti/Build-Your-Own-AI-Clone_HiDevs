"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Database, Settings, BarChart3 } from "lucide-react"
import ChatInterface from "@/components/chat-interface"
import DataManager from "@/components/data-manager"
import VectorDatabase from "@/components/vector-database"
import EvaluationDashboard from "@/components/evaluation-dashboard"

export default function RAGChatbot() {
  const [activeTab, setActiveTab] = useState("chat")
  const [isInitialized, setIsInitialized] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">AI Clone RAG Chatbot</h1>
          <p className="text-slate-600 mb-4">
            Generative AI with Retrieval Augmented Generation, Vector Databases & Prompt Engineering
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="secondary">Llama 3</Badge>
            <Badge variant="secondary">Groq API</Badge>
            <Badge variant="secondary">Vector DB</Badge>
            <Badge variant="secondary">RAG Pipeline</Badge>
            <Badge variant="secondary">Prompt Engineering</Badge>
          </div>
        </div>

        {/* Main Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat Interface
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Data Management
            </TabsTrigger>
            <TabsTrigger value="vector" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Vector Database
            </TabsTrigger>
            <TabsTrigger value="evaluation" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Evaluation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="data">
            <DataManager />
          </TabsContent>

          <TabsContent value="vector">
            <VectorDatabase />
          </TabsContent>

          <TabsContent value="evaluation">
            <EvaluationDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
