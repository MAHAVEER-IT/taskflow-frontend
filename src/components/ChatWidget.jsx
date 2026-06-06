import { useState, useRef, useEffect } from 'react';
import { FiSend, FiX } from 'react-icons/fi';
import ChatMessage from './ChatMessage';
import { chatService } from '../services/chatService';
import LoadingSpinner from './LoadingSpinner';

/**
 * ChatWidget - Floating chat widget component
 */
const ChatWidget = ({ isOpen = true, onClose = () => {} }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call RAG service
      const response = await chatService.postChat(inputValue);

      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        content: response.answer,
        sources: response.sources || [],
        confidence: response.confidence || 0,
        escalate: response.escalate || false,
        ticket: response.ticket || null,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        content: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-full h-screen max-h-96 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold text-text-primary">AI Support Assistant</h3>
        <button
          onClick={onClose}
          className="text-text-tertiary hover:text-text-primary transition"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-text-secondary mb-2">👋 Hello! How can I help you today?</p>
              <p className="text-xs text-text-tertiary">
                Ask me anything about our services and documentation.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isUser={msg.isUser}
            />
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200 flex gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your question..."
          disabled={isLoading}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300 transition"
        >
          <FiSend size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;
