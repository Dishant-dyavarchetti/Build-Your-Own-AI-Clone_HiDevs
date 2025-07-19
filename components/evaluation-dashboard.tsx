"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Zap, CheckCircle, AlertTriangle, Brain, Search } from "lucide-react"

export default function EvaluationDashboard() {
  const [evaluationRunning, setEvaluationRunning] = useState(false)

  const ragMetrics = {
    retrievalAccuracy: 87.3,
    generationQuality: 91.2,
    contextRelevance: 84.7,
    answerRelevance: 89.5,
    faithfulness: 92.1,
    overallScore: 88.9,
  }

  const promptEngineering = {
    systemPromptEffectiveness: 85.4,
    contextIntegration: 88.7,
    responseCoherence: 91.3,
    taskCompletion: 87.9,
  }

  const performanceMetrics = {
    avgResponseTime: 1.2,
    tokensPerSecond: 45.3,
    memoryUsage: 2.1,
    throughput: 12.7,
  }

  const evaluationTools = [
    {
      name: "LangChain Evaluation",
      description: "Built-in evaluation framework for RAG pipelines",
      status: "active",
      metrics: ["Relevance", "Coherence", "Faithfulness"],
    },
    {
      name: "TruLens",
      description: "Monitor and evaluate generative AI systems",
      status: "configured",
      metrics: ["Hallucination Detection", "Context Relevance", "Answer Quality"],
    },
    {
      name: "DeepEval",
      description: "Specialized RAG pipeline evaluation framework",
      status: "available",
      metrics: ["Retrieval Performance", "Generation Quality", "End-to-End Accuracy"],
    },
    {
      name: "Arize AI",
      description: "Comprehensive ML observability and evaluation",
      status: "available",
      metrics: ["Model Performance", "Data Drift", "Production Monitoring"],
    },
  ]

  const testCases = [
    {
      id: 1,
      query: "What is RAG and how does it work?",
      expectedType: "Definitional",
      actualScore: 94.2,
      status: "passed",
    },
    {
      id: 2,
      query: "Compare vector databases for RAG implementation",
      expectedType: "Comparative",
      actualScore: 87.6,
      status: "passed",
    },
    {
      id: 3,
      query: "How to optimize prompt engineering for better results?",
      expectedType: "Instructional",
      actualScore: 91.3,
      status: "passed",
    },
    {
      id: 4,
      query: "What are the latest developments in AI?",
      expectedType: "Factual",
      actualScore: 72.4,
      status: "warning",
    },
  ]

  const runEvaluation = async () => {
    setEvaluationRunning(true)
    // Simulate evaluation process
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setEvaluationRunning(false)
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Overall Score</h3>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{ragMetrics.overallScore}%</p>
              <Progress value={ragMetrics.overallScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Retrieval</h3>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{ragMetrics.retrievalAccuracy}%</p>
              <Progress value={ragMetrics.retrievalAccuracy} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Generation</h3>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{ragMetrics.generationQuality}%</p>
              <Progress value={ragMetrics.generationQuality} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold">Performance</h3>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{performanceMetrics.avgResponseTime}s</p>
              <p className="text-sm text-slate-600">Avg Response</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rag-metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rag-metrics">RAG Metrics</TabsTrigger>
          <TabsTrigger value="prompt-engineering">Prompt Engineering</TabsTrigger>
          <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
          <TabsTrigger value="tools">Evaluation Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="rag-metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>RAG Pipeline Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Core RAG Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Retrieval Accuracy</span>
                        <span className="text-sm">{ragMetrics.retrievalAccuracy}%</span>
                      </div>
                      <Progress value={ragMetrics.retrievalAccuracy} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Generation Quality</span>
                        <span className="text-sm">{ragMetrics.generationQuality}%</span>
                      </div>
                      <Progress value={ragMetrics.generationQuality} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Context Relevance</span>
                        <span className="text-sm">{ragMetrics.contextRelevance}%</span>
                      </div>
                      <Progress value={ragMetrics.contextRelevance} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Quality Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Answer Relevance</span>
                        <span className="text-sm">{ragMetrics.answerRelevance}%</span>
                      </div>
                      <Progress value={ragMetrics.answerRelevance} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Faithfulness</span>
                        <span className="text-sm">{ragMetrics.faithfulness}%</span>
                      </div>
                      <Progress value={ragMetrics.faithfulness} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overall Score</span>
                        <span className="text-sm">{ragMetrics.overallScore}%</span>
                      </div>
                      <Progress value={ragMetrics.overallScore} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{performanceMetrics.avgResponseTime}s</p>
                  <p className="text-sm text-slate-600">Avg Response Time</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{performanceMetrics.tokensPerSecond}</p>
                  <p className="text-sm text-slate-600">Tokens/Second</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{performanceMetrics.memoryUsage}GB</p>
                  <p className="text-sm text-slate-600">Memory Usage</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{performanceMetrics.throughput}</p>
                  <p className="text-sm text-slate-600">Queries/Min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompt-engineering" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prompt Engineering Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">System Prompt Effectiveness</span>
                    <span className="text-sm">{promptEngineering.systemPromptEffectiveness}%</span>
                  </div>
                  <Progress value={promptEngineering.systemPromptEffectiveness} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Context Integration</span>
                    <span className="text-sm">{promptEngineering.contextIntegration}%</span>
                  </div>
                  <Progress value={promptEngineering.contextIntegration} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Response Coherence</span>
                    <span className="text-sm">{promptEngineering.responseCoherence}%</span>
                  </div>
                  <Progress value={promptEngineering.responseCoherence} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Task Completion</span>
                    <span className="text-sm">{promptEngineering.taskCompletion}%</span>
                  </div>
                  <Progress value={promptEngineering.taskCompletion} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test-cases" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Test Case Results</CardTitle>
                <Button onClick={runEvaluation} disabled={evaluationRunning}>
                  {evaluationRunning ? "Running..." : "Run Evaluation"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testCases.map((testCase) => (
                  <Card key={testCase.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium mb-1">{testCase.query}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{testCase.expectedType}</Badge>
                            <Badge
                              variant={testCase.status === "passed" ? "default" : "secondary"}
                              className="flex items-center gap-1"
                            >
                              {testCase.status === "passed" ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <AlertTriangle className="w-3 h-3" />
                              )}
                              {testCase.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{testCase.actualScore}%</p>
                          <Progress value={testCase.actualScore} className="w-20 h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evaluationTools.map((tool, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{tool.name}</h3>
                    <Badge variant={tool.status === "active" ? "default" : "secondary"}>{tool.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{tool.description}</p>
                  <div>
                    <p className="text-xs font-medium mb-1">Supported Metrics:</p>
                    <div className="flex flex-wrap gap-1">
                      {tool.metrics.map((metric, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
