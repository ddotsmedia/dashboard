'use client';

import { useState, useRef, useEffect } from 'react';
import { useUI } from '@/lib/store';
import { X, Send, Trash2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  'Summarize today\'s revenue',
  'What are top expenses?',
  'Cash flow forecast',
  'Receivables aging analysis',
];

export function AIAssistantPanel() {
  const { aiAssistantOpen, setAIAssistantOpen } = useUI();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && aiAssistantOpen) {
        setAIAssistantOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [aiAssistantOpen, setAIAssistantOpen]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    // eslint-disable-next-line react-hooks/purity
    const userMsgId = `msg-${Date.now()}`;

    const delay = 500;

    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        role: 'user',
        content: messageText,
        timestamp: new Date(),
      },
    ]);

    // Simulate assistant response with a delay
    setTimeout(() => {
      const assistantMsgId = `msg-${Date.now()}-assistant`;
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          role: 'assistant',
          content: generateMockResponse(messageText),
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }, delay);
  };

  const generateMockResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('revenue')) {
      return 'Based on the selected period, total revenue is AED 2,450,000. This represents a 12% increase compared to the previous period. The growth is primarily driven by sales in Q3, which contributed 45% of the total revenue.';
    }
    if (lowerMessage.includes('expense')) {
      return 'Top expenses for this period:\n1. Payroll & Benefits: AED 850,000 (42%)\n2. Operations: AED 450,000 (22%)\n3. Marketing: AED 280,000 (14%)\n4. Utilities: AED 180,000 (9%)\n5. Other: AED 240,000 (13%)';
    }
    if (lowerMessage.includes('cash flow') || lowerMessage.includes('forecast')) {
      return 'Cash flow forecast for the next 90 days shows a positive trend. Expected inflows: AED 3,200,000. Expected outflows: AED 2,800,000. Projected cash balance: AED 1,450,000. I recommend monitoring receivables closely to maintain this positive trend.';
    }
    if (lowerMessage.includes('receivable')) {
      return 'Receivables aging analysis:\n- Current (0-30 days): AED 450,000 (65%)\n- 31-60 days: AED 150,000 (22%)\n- 61-90 days: AED 70,000 (10%)\n- Over 90 days: AED 20,000 (3%)\n\nOverall collection rate is healthy. 3% overdue balance requires follow-up.';
    }
    if (lowerMessage.includes('payable')) {
      return 'Payables aging analysis:\n- Current (0-30 days): AED 520,000 (72%)\n- 31-60 days: AED 130,000 (18%)\n- 61-90 days: AED 50,000 (7%)\n- Over 90 days: AED 10,000 (1%)\n\nPayments are well-managed with good vendor relationships.';
    }

    return 'I\'ve analyzed your financial data. This appears to be a general question. Could you provide more specifics about revenue, expenses, cash flow, receivables, or payables analysis?';
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  if (!aiAssistantOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-30"
        onClick={() => setAIAssistantOpen(false)}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-screen w-96 bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-gray-700 shadow-lg z-40 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Assistant
          </h2>
          <button
            onClick={() => setAIAssistantOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Ask me anything about your financial data
              </p>
              <div className="space-y-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSendMessage(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Clear History Button */}
        {messages.length > 0 && (
          <div className="px-6 py-2 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleClearHistory}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          </div>
        )}

        {/* Input */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your finances..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Press Enter to send or Esc to close
          </p>
        </div>
      </div>
    </>
  );
}
