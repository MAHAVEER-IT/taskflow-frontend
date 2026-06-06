import { FiCheckCircle, FiMessageSquare, FiAlertCircle, FiClock } from 'react-icons/fi';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

/**
 * LandingPage - Homepage with features and CTA
 */
const LandingPage = () => {
  const features = [
    {
      icon: FiMessageSquare,
      title: 'AI Knowledge Base',
      description: 'Get instant answers from your company knowledge base powered by advanced AI.',
    },
    {
      icon: FiAlertCircle,
      title: 'Smart Ticket Escalation',
      description: 'Automatically escalate complex issues to your support team when needed.',
    },
    {
      icon: FiClock,
      title: 'Ticket Tracking',
      description: 'View and manage all your support tickets in one place.',
    },
    {
      icon: FiCheckCircle,
      title: 'Chat History',
      description: 'Access your entire conversation history anytime, anywhere.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">Features</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Everything you need for a modern support experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="landing-feature-card bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition"
                  style={{ animationDelay: `${idx * 90}ms` }}
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-primary-500" size={24} />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Ready to get started?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of companies using TaskFlow to deliver better customer support.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition"
          >
            Sign in with Google
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-light border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-text-primary mb-4">TaskFlow</h4>
              <p className="text-text-secondary text-sm">
                AI-powered customer support assistant
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-text-primary mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>Features</li>
                <li>Pricing</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-text-primary mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-text-primary mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center text-text-tertiary text-sm">
            <p>&copy; 2024 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
