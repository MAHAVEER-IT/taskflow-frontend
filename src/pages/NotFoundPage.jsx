import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

/**
 * NotFoundPage - 404 error page
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary-500">404</h1>
          <p className="text-3xl font-bold text-text-primary">Page not found</p>
        </div>

        <p className="text-text-secondary max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been removed or you might have mistyped the URL.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition flex items-center gap-2"
          >
            <FiArrowLeft size={18} />
            Go Home
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-2 border-2 border-text-tertiary text-text-primary rounded-lg font-medium hover:border-primary-500 hover:text-primary-500 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
