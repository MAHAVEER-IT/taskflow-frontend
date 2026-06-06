import { useEffect, useState } from 'react';
import { ticketService } from '../services/ticketService';
import TicketCard from '../components/TicketCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiPlus, FiX } from 'react-icons/fi';

/**
 * TicketsPage - View and manage support tickets
 */
const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const data = await ticketService.getUserTickets();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    try {
      setIsSubmitting(true);
      const response = await ticketService.createTicket(newQuestion);
      setTickets((prev) => [response, ...prev]);
      setNewQuestion('');
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">My Tickets</h1>
            <p className="text-text-secondary mt-2">
              {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} in total
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition flex items-center gap-2"
          >
            <FiPlus size={18} />
            New Ticket
          </button>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary">Create New Ticket</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-text-tertiary hover:text-text-primary"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Describe your issue
                  </label>
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Tell us what you need help with..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="5"
                    maxLength="2000"
                  />
                  <p className="text-xs text-text-tertiary mt-1">
                    {newQuestion.length} / 2000 characters
                  </p>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 text-text-secondary rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newQuestion.trim()}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300 transition font-medium"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Ticket'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tickets List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <TicketCard key={ticket._id} ticket={ticket} />
              ))
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-text-secondary mb-4">No tickets yet</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="text-primary-500 hover:text-primary-600 font-medium transition"
                >
                  Create your first ticket
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
