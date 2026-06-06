import { useEffect, useState } from 'react';
import { chatService } from '../services/chatService';
import ChatMessage from '../components/ChatMessage';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * ChatHistoryPage - View complete chat history
 */
const ChatHistoryPage = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const limit = 20;

  useEffect(() => {
    loadChats();
  }, [skip]);

  const loadChats = async () => {
    try {
      setLoading(true);
      const data = await chatService.getChatHistory(limit, skip);
      if (skip === 0) {
        setChats(data.chats || []);
      } else {
        setChats((prev) => [...prev, ...(data.chats || [])]);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-bg-light min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Chat History</h1>
          <p className="text-text-secondary mt-2">
            {chats.length} message{chats.length !== 1 ? 's' : ''} in total
          </p>
        </div>

        {/* Chats */}
        {loading && skip === 0 ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              {chats.length > 0 ? (
                <>
                  {chats.map((chat) => (
                    <div key={chat._id} className="border-b border-gray-200 pb-4 last:border-0">
                      <ChatMessage
                        message={{
                          content: chat.question,
                        }}
                        isUser={true}
                      />
                      <ChatMessage
                        message={{
                          content: chat.answer,
                          sources: chat.sources,
                          confidence: chat.confidence,
                          escalate: chat.escalate,
                          ticket: chat.ticket,
                        }}
                        isUser={false}
                      />
                    </div>
                  ))}

                  {chats.length < (skip + limit) && chats.length >= limit && (
                    <button
                      onClick={() => setSkip((prev) => prev + limit)}
                      disabled={loading}
                      className="w-full mt-6 px-4 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition font-medium disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  )}
                </>
              ) : (
                <p className="text-text-tertiary text-center py-8">No chat history yet</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHistoryPage;
