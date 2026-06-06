import { FiUser } from 'react-icons/fi';

/**
 * ChatMessage - Single chat message component
 */
const ChatMessage = ({ message, isUser = false }) => {
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
          <span className="text-primary-500 font-bold text-sm">AI</span>
        </div>
      )}

      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-primary-500 text-white rounded-br-none'
            : 'bg-bg-light text-text-primary rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

        {/* AI response metadata */}
        {!isUser && message.sources && (
          <div className="mt-3 pt-3 border-t border-gray-200 text-xs">
            {message.sources.length > 0 && (
              <div className="mb-2">
                <p className="font-medium text-text-secondary">Sources:</p>
                <ul className="list-disc list-inside text-text-tertiary">
                  {message.sources.slice(0, 2).map((source, idx) => (
                    <li key={idx} className="truncate">
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {message.confidence !== undefined && (
              <p className="text-text-tertiary">
                Confidence:{' '}
                <span className="font-medium">
                  {Math.round(message.confidence * 100)}%
                </span>
              </p>
            )}

            {message.escalate && (
              <p className="text-warning font-medium mt-2">
                Escalated to support team
                {message.ticket?.ticketId ? ` (${message.ticket.ticketId})` : ''}
              </p>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
          <FiUser size={16} className="text-primary-500" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
