'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Send, Trash2 } from 'lucide-react';
import { useAIAssistant } from '@/hooks/useAIAssistant';
import { ChatMessage } from './ChatMessage';
import { SuggestionButton } from './SuggestionButton';

const SUGGESTIONS = [
  'How is the company performing?',
  'Which branch is most profitable?',
  'Show overdue receivables',
  'Compare with previous month',
  'What is my cash position?',
  'Are we on budget?',
];

/**
 * AI Assistant Component
 * Polished chat interface with history, suggestions, and typing indicator
 */
export function AIAssistant() {
  const { messages, isTyping, sendMessage, clearHistory, addSuggestion } = useAIAssistant();
  const [inputValue, setInputValue] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = Math.min(textareaRef.current.scrollHeight, 120); // Max 120px
      textareaRef.current.style.height = `${scrollHeight}px`;
      setTextareaHeight(`${scrollHeight}px`);
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const message = inputValue;
    setInputValue('');
    setTextareaHeight('auto');

    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setInputValue('');
    setTextareaHeight('auto');
    await addSuggestion(suggestion);
  };

  const handleClearHistory = () => {
    if (messages.length === 0) return;
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      clearHistory();
      setInputValue('');
      setTextareaHeight('auto');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Finance Assistant</h2>
        {messages.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title="Clear history"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 dark:bg-gray-900">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div className="max-w-xs">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Welcome to AI Finance Assistant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ask me about your company&apos;s financial performance, trends, and insights.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} isUser={message.isUser} />
            ))}

            {isTyping && (
              <div className="flex gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200" />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Assistant is typing...
                  </span>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 0 && (
        <div className="px-4 py-3 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion, index) => (
              <SuggestionButton
                key={index}
                suggestion={suggestion}
                onClick={handleSuggestionClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your finances..."
            disabled={isTyping}
            className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
            style={{ height: textareaHeight }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-3 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center self-end"
            title="Send message (Enter)"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

AIAssistant.displayName = 'AIAssistant';
