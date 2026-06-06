import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiHome, FiSettings } from 'react-icons/fi';

/**
 * Navbar - Top navigation for authenticated users
 */
const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-white/85 border-b border-blue-50 shadow-sm backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center shadow-sm shadow-blue-200">
            <span className="text-white font-bold">T</span>
          </div>
          <span className="font-bold text-lg text-text-primary">TaskFlow</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* User info */}
          {user && (
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2 shadow-sm">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full ring-2 ring-blue-50"
                />
              )}
              <div>
                <p className="text-sm font-medium text-text-primary">{user.name}</p>
                <p className="text-xs text-text-tertiary">{user.role}</p>
              </div>
            </div>
          )}

          {/* Admin link */}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-text-secondary hover:text-primary-500 transition"
              title="Admin Dashboard"
            >
              <FiSettings size={20} />
            </Link>
          )}

          {/* Logout */}
          <button
            onClick={logout}
            className="text-text-secondary hover:text-danger transition"
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
