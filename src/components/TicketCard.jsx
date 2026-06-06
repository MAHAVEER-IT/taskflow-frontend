import { FiCalendar, FiEdit2 } from 'react-icons/fi';

/**
 * TicketCard - Display a single ticket
 */
const TicketCard = ({
  ticket,
  onStatusChange = null,
  isAdmin = false,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN':
        return 'bg-warning/10 text-warning border-warning/30';
      case 'IN_PROGRESS':
        return 'bg-primary-50 text-primary-500 border-primary-200';
      case 'CLOSED':
        return 'bg-success/10 text-success border-success/30';
      default:
        return 'bg-gray-100 text-text-secondary';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-text-primary">{ticket.ticketId}</h3>
          <p className="text-xs text-text-tertiary mt-1">
            <FiCalendar className="inline mr-1" size={14} />
            {formatDate(ticket.createdAt)}
          </p>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
          {ticket.status}
        </span>
      </div>

      {/* Question */}
      <p className="text-sm text-text-secondary mb-4 line-clamp-2">{ticket.question}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          {isAdmin && onStatusChange && (
            <select
              value={ticket.status}
              onChange={(e) => onStatusChange(ticket.ticketId, e.target.value)}
              className="text-xs px-2 py-1 border border-gray-300 rounded bg-white text-text-secondary hover:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          )}
        </div>

        {!isAdmin && (
          <button className="text-primary-500 hover:text-primary-600 transition flex items-center gap-1 text-xs font-medium">
            <FiEdit2 size={14} />
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
