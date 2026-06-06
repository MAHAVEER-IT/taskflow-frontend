import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginButton from './LoginButton';
import {
  FiArrowRight,
  FiCheckCircle,
  FiFileText,
  FiMessageSquare,
} from 'react-icons/fi';
import heroImage from '../assets/hero.png';

/**
 * Hero - Landing page hero section
 */
const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-text-primary">
      <div className="absolute inset-0 opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_82%_4%,rgba(34,197,94,0.10),transparent_26%),linear-gradient(135deg,#ffffff_0%,#f8fafc_48%,#eff6ff_100%)]" />
        <div className="hero-grid absolute inset-0" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-24 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-[1fr_0.95fr] gap-12 items-center w-full">
          <div className="space-y-8 animate-hero-copy">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-sm text-primary-700">
              <FiCheckCircle size={16} />
              RAG-powered support for TaskFlow teams
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-normal">
                TaskFlow Support Assistant
              </h1>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl">
                Give users instant answers from your knowledge base, then create support tickets automatically when confidence is low.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition flex items-center gap-2"
                >
                  Go to Dashboard
                  <FiArrowRight size={18} />
                </button>
              ) : (
                <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
                  <LoginButton />
                </div>
              )}

              <button
                onClick={handleLearnMore}
                className="px-6 py-3 border border-gray-300 text-text-primary rounded-lg font-medium hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50 transition"
              >
                Learn More
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl pt-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <FiMessageSquare className="text-primary-500" size={18} />
                Grounded answers
              </div>
              <div className="flex items-center gap-2">
                <FiFileText className="text-success" size={18} />
                Auto tickets
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-warning" size={18} />
                Source citations
              </div>
            </div>
          </div>

          <div className="relative animate-hero-visual">
            <div className="relative bg-white text-text-primary rounded-lg shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-slate-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-text-tertiary">taskflow.support/chat</span>
              </div>

              <div className="p-5 md:p-6 space-y-4">
                <div className="flex justify-end">
                  <div className="max-w-[78%] rounded-lg rounded-br-none bg-primary-500 text-white px-4 py-3 text-sm shadow-sm">
                    How do I invite a team member?
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center font-bold text-sm">
                    AI
                  </div>
                  <div className="flex-1 rounded-lg rounded-bl-none bg-bg-light border border-gray-200 px-4 py-3 text-sm">
                    <p className="font-medium mb-2">To invite a team member:</p>
                    <ol className="space-y-1 text-text-secondary list-decimal list-inside">
                      <li>Open Workspace settings.</li>
                      <li>Select Members.</li>
                      <li>Choose Invite members.</li>
                    </ol>
                    <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-text-tertiary">
                      Source: invite-team-members.md &gt; Steps
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <p className="text-xs text-text-tertiary">Confidence</p>
                    <p className="font-bold text-primary-600">92%</p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 p-3">
                    <p className="text-xs text-text-tertiary">Sources</p>
                    <p className="font-bold text-emerald-700">3</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-3">
                    <p className="text-xs text-text-tertiary">Escalate</p>
                    <p className="font-bold text-amber-700">Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
