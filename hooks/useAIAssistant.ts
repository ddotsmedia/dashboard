'use client';

import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface UseAIAssistantReturn {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (userMessage: string) => Promise<void>;
  clearHistory: () => void;
  addSuggestion: (suggestion: string) => Promise<void>;
}

/**
 * Hook to manage AI Assistant chat state
 * Handles message storage and mock AI responses
 */
export function useAIAssistant(): UseAIAssistantReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Mock AI responses based on user input
  const getMockAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('how is') || lowerMessage.includes('performing')) {
      return `Based on recent data, company performing well. Revenue +12.4% MoM. Net margin 43.2%. Cash 510k AED. Overall health: positive.`;
    }

    if (lowerMessage.includes('branch') || lowerMessage.includes('profitable')) {
      return `Dubai: 650k AED (51%, 45% margin). Abu Dhabi: 430k AED (34%, 42% margin). Sharjah: 154k AED (12%, 38% margin).`;
    }

    if (lowerMessage.includes('overdue') || lowerMessage.includes('receivable')) {
      return `Overdue receivables: 245k AED. Top customers: Client A (95k, 60 days), Client B (78k, 45 days), Client C (72k, 30 days). Recommend follow-up actions.`;
    }

    if (lowerMessage.includes('previous') || lowerMessage.includes('month') || lowerMessage.includes('compare')) {
      return `Comparison with previous month: Revenue +12.4%, Expenses -3.2%, Net profit +18.7%. All key metrics improved. Strong upward trend.`;
    }

    if (lowerMessage.includes('cash') || lowerMessage.includes('position')) {
      return `Current cash position: 510k AED. Operating cash flow: 125k AED. Available liquidity: 650k AED. Cash reserves sufficient for operations.`;
    }

    if (lowerMessage.includes('budget') || lowerMessage.includes('on budget')) {
      return `Budget performance: 87% of budget utilized. On track for targets. Discretionary spending 5% under budget. Capital expenditures as planned.`;
    }

    // Default response
    return `I understand you're asking about "${userMessage}". Based on available financial data, here's what I can tell you: The metrics indicate steady performance with positive trends across most indicators. Would you like me to focus on any specific area?`;
  };

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      content: userMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response delay (500ms - 1s)
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));

    // Add AI response
    const aiResponse: ChatMessage = {
      id: `ai-${Date.now()}`,
      content: getMockAIResponse(userMessage),
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsTyping(false);
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
  }, []);

  const addSuggestion = useCallback(
    async (suggestion: string) => {
      await sendMessage(suggestion);
    },
    [sendMessage],
  );

  return {
    messages,
    isTyping,
    sendMessage,
    clearHistory,
    addSuggestion,
  };
}
