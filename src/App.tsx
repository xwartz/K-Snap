import { useState, useEffect, useCallback } from 'react'
import { LandingHero } from './components/LandingHero'
import { Sidebar } from './components/Sidebar'
import { ChatInterface } from './components/ChatInterface'
import type { HistoryItem, AnalyzeResponse } from './types'

function App() {
  const [isAppStarted, setIsAppStarted] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [activeAnalysis, setActiveAnalysis] = useState<HistoryItem | null>(null)

  /* State */
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  /* Effects */
  useEffect(() => {
    setIsClient(true)
  }, [])

  /* Handlers */
  const handleNewAnalysis = useCallback(() => {
    setActiveAnalysis(null)
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }, [])

  const handleStartAnalysis = useCallback((result: AnalyzeResponse, imagePreview: string) => {
    const newId = `analysis-${Date.now()}`
    const newHistoryItem: HistoryItem = {
      id: newId,
      title: `${result.detected.symbol} ${result.detected.timeframe}`,
      timestamp: Date.now(),
      result: result,
      imagePreview: imagePreview,
    }
    setHistory(prev => [newHistoryItem, ...prev])
    setActiveAnalysis(newHistoryItem)
  }, [])

  const handleSelectHistory = useCallback((item: HistoryItem) => {
    setActiveAnalysis(item)
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }, [])

  if (!isClient) {
    return null
  }

  if (!isAppStarted) {
    return <LandingHero onStart={() => setIsAppStarted(true)} />
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        history={history}
        activeItemId={activeAnalysis?.id || null}
        onNewAnalysis={handleNewAnalysis}
        onSelectHistory={handleSelectHistory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 -ml-1 hover:bg-muted rounded-md"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="font-semibold">{activeAnalysis?.title || 'K-Snap'}</div>
          <div className="w-6" /> {/* Spacer for balance */}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden relative">
          <ChatInterface
            activeAnalysis={activeAnalysis}
            onStartAnalysis={handleStartAnalysis}
          />
        </div>
      </div>
    </div>
  )
}

export default App
