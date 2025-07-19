"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Globe, Database, Scissors, CheckCircle, Loader2 } from "lucide-react"

export default function DataManager() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFiles, setProcessedFiles] = useState([
    { name: "sample-document.pdf", status: "processed", chunks: 45 },
    { name: "knowledge-base.txt", status: "processed", chunks: 23 },
    { name: "web-content.html", status: "processing", chunks: 0 },
  ])

  const handleFileUpload = async () => {
    setIsProcessing(true)
    setUploadProgress(0)

    // Simulate file processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    setIsProcessing(false)
  }

  const dataSources = [
    {
      name: "PDF Documents",
      description: "Extract text from PDF files using PyPDF",
      icon: FileText,
      supported: ["pdf"],
      loader: "Langchain PDF Loader",
    },
    {
      name: "Web Scraping",
      description: "Scrape web content using ScrapeGraph-AI",
      icon: Globe,
      supported: ["html", "url"],
      loader: "Langchain Web Loader",
    },
    {
      name: "Text Files",
      description: "Process plain text and markdown files",
      icon: Database,
      supported: ["txt", "md"],
      loader: "Langchain File Loader",
    },
  ]

  const chunkingStrategies = [
    {
      name: "Recursive Character Splitter",
      description: "Splits text hierarchically (paragraphs → sentences → words)",
      recommended: true,
      useCase: "General purpose, maintains semantic coherence",
    },
    {
      name: "Semantic Splitter",
      description: "Splits based on semantic similarity using embeddings",
      recommended: false,
      useCase: "Natural language texts, maintains context",
    },
    {
      name: "Token Splitter",
      description: "Splits based on token count for LLM constraints",
      recommended: false,
      useCase: "When working with specific token limits",
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sources" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="preprocessing">Preprocessing</TabsTrigger>
          <TabsTrigger value="chunking">Chunking</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Data Source Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {dataSources.map((source, index) => (
                  <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <source.icon className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold">{source.name}</h3>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{source.description}</p>
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs font-medium">Supported:</span>
                          <div className="flex gap-1 mt-1">
                            {source.supported.map((format) => (
                              <Badge key={format} variant="outline" className="text-xs">
                                {format}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-medium">Loader:</span>
                          <Badge variant="secondary" className="text-xs ml-1">
                            {source.loader}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Your Data</h3>
                <p className="text-slate-600 mb-4">Drag and drop files or click to browse</p>
                <Button onClick={handleFileUpload} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Select Files"
                  )}
                </Button>
                {isProcessing && (
                  <div className="mt-4">
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-slate-600 mt-2">Processing files... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processed Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {processedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-slate-600">{file.chunks} chunks created</p>
                      </div>
                    </div>
                    <Badge
                      variant={file.status === "processed" ? "default" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      {file.status === "processed" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      )}
                      {file.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preprocessing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Preprocessing Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold">Data Cleaning</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Remove duplicate content</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Strip HTML tags</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Normalize whitespace</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Remove special characters</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">Text Processing</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Sentence segmentation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Lowercase conversion</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Language detection</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Stop word removal</span>
                    </label>
                  </div>
                </div>
              </div>
              <Button className="w-full">Apply Preprocessing</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chunking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="w-5 h-5" />
                Text Chunking Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chunkingStrategies.map((strategy, index) => (
                  <Card
                    key={index}
                    className={`border-2 ${strategy.recommended ? "border-green-200 bg-green-50" : "border-slate-200"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{strategy.name}</h3>
                        {strategy.recommended && (
                          <Badge variant="default" className="bg-green-600">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{strategy.description}</p>
                      <p className="text-xs text-slate-500">
                        <strong>Use Case:</strong> {strategy.useCase}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 border rounded-lg bg-slate-50">
                <h3 className="font-semibold mb-3">Chunking Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Chunk Size</label>
                    <Input type="number" defaultValue="1000" placeholder="Characters per chunk" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Overlap Size</label>
                    <Input type="number" defaultValue="200" placeholder="Character overlap" />
                  </div>
                </div>
                <Button className="w-full mt-4">Apply Chunking Strategy</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
