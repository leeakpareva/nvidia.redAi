import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { ScrollArea } from "./components/ui/scroll-area"
import { Send, Bot, UserCircle } from "lucide-react"
import { Header } from './components/Header'

interface Message {
  content: string
  isUser: boolean
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_BACKEND_URL.replace('http', 'ws')}/chat`)
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)
    }

    ws.onmessage = (event) => {
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1]
        if (!lastMessage || lastMessage.isUser) {
          // Start a new AI message
          return [...prev, { content: event.data, isUser: false }]
        }
        // Append to existing AI message without duplicating
        return [
          ...prev.slice(0, -1),
          { content: lastMessage.content + event.data, isUser: false }
        ]
      })
      setIsLoading(false)
    }

    ws.onclose = () => {
      setIsConnected(false)
    }

    return () => {
      ws.close()
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (!input.trim() || !wsRef.current || !isConnected) return

    setMessages(prev => [...prev, { content: input, isUser: true }])
    wsRef.current.send(input)
    setInput('')
    setIsLoading(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Card className="w-full max-w-3xl mx-auto h-[700px] flex flex-col shadow-lg">
          <div className="relative flex-1 p-4">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg px-6 py-3 max-w-[80%] ${
                        message.isUser
                          ? 'bg-[#76B900] text-white'
                          : 'bg-white border border-gray-200 text-gray-900'
                      } shadow-sm`}
                    >
                      <div className="flex items-center gap-2">
                        {message.isUser ? (
                          <UserCircle className="h-5 w-5" />
                        ) : (
                          <Bot className="h-5 w-5 text-[#76B900]" />
                        )}
                        <span>{message.content}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg px-6 py-3 text-gray-500 flex items-center gap-2">
                      <Bot className="h-5 w-5 text-[#76B900]" />
                      <span className="flex gap-1">
                        Thinking
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce delay-100">.</span>
                        <span className="animate-bounce delay-200">.</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-500">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          <div className="border-t p-4 bg-gray-50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={!isConnected || isLoading}
                className="flex-1 bg-white"
              />
              <Button
                onClick={sendMessage}
                disabled={!isConnected || isLoading}
                className="bg-[#76B900] hover:bg-[#86C900]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}

export default App
