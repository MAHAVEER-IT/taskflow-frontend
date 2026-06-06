import { useEffect, useState } from 'react';
import { ticketService } from '../services/ticketService';
import TicketCard from '../components/TicketCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiFilter } from 'react-icons/fi';

/**
 * AdminDashboard - Admin panel to manage all tickets
 */
const AdminDashboard = () => {
  const [allTickets, setAllTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    loadAllTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [allTickets, statusFilter]);

  const loadAllTickets = async () => {
    try {
      setLoading(true);
      const data = await ticketService.getAllTickets(100);
      setAllTickets(data.tickets || []);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTickets = () => {
    let filtered = allTickets;
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }
    setFilteredTickets(filtered);
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await ticketService.updateTicketStatus(ticketId, newStatus);
      setAllTickets((prev) =>
        prev.map((ticket) =>
          ticket.ticketId === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('Failed to update ticket');
    }
  };

  const stats = {
    total: allTickets.length,
    open: allTickets.filter((t) => t.status === 'OPEN').length,
    inProgress: allTickets.filter((t) => t.status === 'IN_PROGRESS').length,
    closed: allTickets.filter((t) => t.status === 'CLOSED').length,
  };

  return (
    <div className="p-6 bg-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary mt-2">Manage all support tickets and monitor system activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard label="Total Tickets" value={stats.total} color="primary" />
          <StatCard label="Open" value={stats.open} color="warning" />
          <StatCard label="In Progress" value={stats.inProgress} color="secondary" />
          <StatCard label="Closed" value={stats.closed} color="success" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <FiFilter size={20} className="text-text-secondary" />
          <div className="flex gap-2 flex-wrap">
            {['ALL', 'OPEN', 'IN_PROGRESS', 'CLOSED'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === status
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket._id}
                  ticket={ticket}
                  isAdmin={true}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-text-secondary">No tickets found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * StatCard - Small stat display card
 */
const StatCard = ({ label, value, color }) => {
  const colorClass = {
    primary: 'bg-primary-50 text-primary-500',
    secondary: 'bg-blue-50 text-blue-500',
    warning: 'bg-warning/10 text-warning',
    success: 'bg-success/10 text-success',
  }[color];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <p className="text-text-tertiary text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold text-text-primary">{value}</p>
    </div>
  );
};

export default AdminDashboard;
