"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Database, Zap, Search, CheckCircle, Loader2, Brain, Target } from "lucide-react"

export default function VectorDatabase() {
  const [embeddingProgress, setEmbeddingProgress] = useState(0)
  const [isEmbedding, setIsEmbedding] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([
    {
      id: "1",
      content: "RAG (Retrieval Augmented Generation) combines the power of retrieval systems with generative models...",
      similarity: 0.94,
      source: "rag-guide.pdf",
      chunk: 15,
    },
    {
      id: "2",
      content: "Vector databases store high-dimensional embeddings that capture semantic meaning of text...",
      similarity: 0.87,
      source: "vector-db-tutorial.md",
      chunk: 8,
    },
    {
      id: "3",
      content: "Prompt engineering is crucial for getting optimal responses from language models...",
      similarity: 0.82,
      source: "prompt-engineering.txt",
      chunk: 23,
    },
  ])

  const handleEmbedding = async () => {
    setIsEmbedding(true)
    setEmbeddingProgress(0)

    for (let i = 0; i <= 100; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setEmbeddingProgress(i)
    }

    setIsEmbedding(false)
  }

  const handleSearch = () => {
    // Simulate search functionality
    console.log("Searching for:", searchQuery)
  }

  const dbStats = {
    totalDocuments: 1247,
    totalChunks: 5832,
    embeddingModel: "sentence-transformers/all-MiniLM-L6-v2",
    vectorDimensions: 384,
    indexSize: "2.3 GB",
    avgSimilarity: 0.76,
  }

  return (
    <div className="space-y-6">
      {/* Database Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Vector Database</h3>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{dbStats.totalChunks.toLocaleString()}</p>
              <p className="text-sm text-slate-600">Total Chunks</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Embeddings</h3>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{dbStats.vectorDimensions}</p>
              <p className="text-sm text-slate-600">Dimensions</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Similarity</h3>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{(dbStats.avgSimilarity * 100).toFixed(1)}%</p>
              <p className="text-sm text-slate-600">Avg Score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Embedding Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Embedding Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Embedding Model</label>
                <div className="p-3 border rounded-lg bg-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">sentence-transformers/all-MiniLM-L6-v2</span>
                    <Badge variant="default">Hugging Face</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    384-dimensional embeddings, optimized for semantic similarity
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Vector Database</label>
                <div className="p-3 border rounded-lg bg-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Chroma DB</span>
                    <Badge variant="secondary">Open Source</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Fast similarity search with cosine distance</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Index Statistics</label>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Documents:</span>
                    <span className="font-medium">{dbStats.totalDocuments.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Chunks:</span>
                    <span className="font-medium">{dbStats.totalChunks.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Index Size:</span>
                    <span className="font-medium">{dbStats.indexSize}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Vector Dimensions:</span>
                    <span className="font-medium">{dbStats.vectorDimensions}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button onClick={handleEmbedding} disabled={isEmbedding} className="w-full">
              {isEmbedding ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Embeddings...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Embeddings
                </>
              )}
            </Button>
            {isEmbedding && (
              <div className="mt-4">
                <Progress value={embeddingProgress} className="w-full" />
                <p className="text-sm text-slate-600 mt-2 text-center">
                  Processing chunks and generating embeddings... {embeddingProgress}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Similarity Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Vector Similarity Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search query to test vector similarity..."
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Search Results</h3>
            {searchResults.map((result) => (
              <Card key={result.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Similarity: {(result.similarity * 100).toFixed(1)}%</Badge>
                      <Badge variant="secondary">{result.source}</Badge>
                      <Badge variant="outline">Chunk {result.chunk}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700">{result.content}</p>
                  <div className="mt-2">
                    <Progress value={result.similarity * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Base Construction */}
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">Construction Pipeline</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Data ingestion completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Text preprocessing finished</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Document chunking completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Embeddings generated</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Vector index built</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Performance Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Query Latency:</span>
                  <span className="font-medium">~45ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Retrieval Accuracy:</span>
                  <span className="font-medium">87.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Index Build Time:</span>
                  <span className="font-medium">2.4 minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Memory Usage:</span>
                  <span className="font-medium">1.8 GB</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
