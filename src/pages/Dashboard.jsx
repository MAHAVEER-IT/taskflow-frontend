import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { chatService } from '../services/chatService';
import { ticketService } from '../services/ticketService';
import ChatMessage from '../components/ChatMessage';
import TicketCard from '../components/TicketCard';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  FiArrowRight,
  FiCheck,
  FiClock,
  FiFileText,
  FiMessageSquare,
  FiSearch,
  FiZap,
} from 'react-icons/fi';

/**
 * Dashboard - User dashboard with welcome and recent items
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [recentChats, setRecentChats] = useState([]);
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [chatsData, ticketsData] = await Promise.all([
          chatService.getChatHistory(5),
          ticketService.getUserTickets(5),
        ]);
        setRecentChats(chatsData.chats || []);
        setRecentTickets(ticketsData.tickets || []);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="dashboard-shell min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <section className="dashboard-hero relative overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(37,99,235,0.12),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(34,197,94,0.10),transparent_26%),linear-gradient(135deg,#ffffff_0%,#f8fbff_58%,#eef6ff_100%)]" />
          <div className="relative grid lg:grid-cols-[1fr_340px] gap-6 p-7 lg:p-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-primary-700">
                <FiZap size={14} />
                AI support workspace
              </div>

              <div>
                <p className="text-sm text-text-tertiary mb-2">
                  {new Date().getHours() < 12
                    ? 'Good morning'
                    : new Date().getHours() < 18
                      ? 'Good afternoon'
                      : 'Good evening'}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-normal">
                  Welcome back, {user?.name || 'there'}
                </h1>
                <p className="mt-3 text-text-secondary max-w-2xl">
                  Ask TaskFlow anything from your knowledge base, review recent answers, and track escalated support tickets from one calm workspace.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#recent-activity"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition"
                >
                  Review activity
                  <FiArrowRight size={16} />
                </a>
                <a
                  href="#support-overview"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-text-secondary hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 transition"
                >
                  View metrics
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="dashboard-mini-chat rounded-lg border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Assistant preview</p>
                    <p className="text-xs text-text-tertiary">Grounded response flow</p>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-success" />
                </div>
                <div className="space-y-3 pt-4 text-sm">
                  <div className="ml-auto max-w-[82%] rounded-lg rounded-br-sm bg-primary-500 px-3 py-2 text-white">
                    How do I upload files?
                  </div>
                  <div className="max-w-[88%] rounded-lg rounded-bl-sm bg-bg-light border border-gray-100 px-3 py-2 text-text-secondary">
                    Upload from a task or project, then share the file link with teammates who have access.
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-tertiary">
                    <FiFileText size={14} />
                    file-upload.md &gt; Steps
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="support-overview" className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            icon={FiMessageSquare}
            label="Recent Chats"
            value={recentChats.length}
            trend="Saved conversations"
            color="primary"
          />
          <StatCard
            icon={FiFileText}
            label="My Tickets"
            value={recentTickets.length}
            trend="Open and closed"
            color="secondary"
          />
          <StatCard
            icon={FiZap}
            label="Avg Response Time"
            value="< 1s"
            trend="RAG response speed"
            color="warning"
          />
          <StatCard
            icon={FiCheck}
            label="Resolved"
            value={recentTickets.filter((t) => t.status === 'CLOSED').length}
            trend="Closed tickets"
            color="success"
          />
        </section>

        <section id="recent-activity" className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6">
          <Panel
            title="Recent chats"
            description="Latest knowledge-base answers and escalations"
            icon={FiMessageSquare}
          >
            {recentChats.length > 0 ? (
              <div className="space-y-3 max-h-[26rem] overflow-y-auto pr-1">
                {recentChats.slice(0, 5).map((chat) => (
                  <ChatMessage
                    key={chat._id}
                    message={{
                      content: chat.answer || chat.question,
                      sources: chat.sources,
                      confidence: chat.confidence,
                      escalate: chat.escalate,
                    }}
                    isUser={false}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={FiSearch}
                title="No chats yet"
                description="Open the assistant and ask a support question to see your recent answers here."
              />
            )}
          </Panel>

          <Panel
            title="My tickets"
            description="Escalated questions that need human follow-up"
            icon={FiFileText}
          >
            {recentTickets.length > 0 ? (
              <div className="space-y-3 max-h-[26rem] overflow-y-auto pr-1">
                {recentTickets.slice(0, 5).map((ticket) => (
                  <TicketCard key={ticket._id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={FiClock}
                title="No tickets yet"
                description="Low-confidence answers will automatically create tickets for your support team."
              />
            )}
          </Panel>
        </section>
      </div>
    </div>
  );
};

/**
 * StatCard - Small stat display card
 */
const StatCard = ({ icon: Icon, label, value, trend, color }) => {
  const styles = {
    primary: {
      icon: 'bg-primary-50 text-primary-500',
      line: 'from-primary-500 to-blue-300',
    },
    secondary: {
      icon: 'bg-sky-50 text-sky-600',
      line: 'from-sky-500 to-cyan-300',
    },
    warning: {
      icon: 'bg-amber-50 text-warning',
      line: 'from-warning to-amber-200',
    },
    success: {
      icon: 'bg-emerald-50 text-success',
      line: 'from-success to-emerald-200',
    },
  }[color];

  return (
    <div className="dashboard-stat-card relative overflow-hidden rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${styles.line}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-text-tertiary text-sm">{label}</p>
          <p className="mt-2 text-3xl font-bold text-text-primary">{value}</p>
          <p className="mt-2 text-xs text-text-tertiary">{trend}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${styles.icon}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

const Panel = ({ title, description, icon: Icon, children }) => (
  <div className="dashboard-panel rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        <p className="mt-1 text-sm text-text-tertiary">{description}</p>
      </div>
      <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center">
        <Icon size={20} />
      </div>
    </div>
    {children}
  </div>
);

const EmptyState = ({ icon: Icon, title, description }) => (
  <div className="rounded-lg border border-dashed border-gray-200 bg-bg-lighter p-8 text-center">
    <div className="mx-auto mb-4 w-12 h-12 rounded-lg bg-white text-primary-500 flex items-center justify-center shadow-sm">
      <Icon size={22} />
    </div>
    <h3 className="font-semibold text-text-primary">{title}</h3>
    <p className="mt-2 text-sm text-text-tertiary max-w-sm mx-auto">{description}</p>
  </div>
);

export default Dashboard;
