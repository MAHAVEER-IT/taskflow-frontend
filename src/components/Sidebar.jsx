import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiFileText, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

/**
 * Sidebar - Left navigation for user dashboard
 */
const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/chat-history', label: 'Chat History', icon: FiMessageSquare },
    { path: '/tickets', label: 'My Tickets', icon: FiFileText },
    { path: '/profile', label: 'Profile', icon: FiUser },
  ];

  return (
    <aside className="w-72 bg-[#f8fbff] h-screen sticky top-0 p-4">
      <div className="flex flex-col h-full rounded-lg border border-blue-50 bg-white/90 shadow-sm backdrop-blur">
        <div className="px-4 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary-500 rounded-lg flex items-center justify-center shadow-sm shadow-blue-100">
              <span className="text-white font-bold">T</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-text-tertiary tracking-wide">Workspace</p>
              <p className="mt-0.5 font-bold text-text-primary">TaskFlow</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1.5">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`group flex items-center gap-3 px-3.5 py-3 rounded-lg transition ${
                isActive(path)
                  ? 'bg-primary-50 text-primary-600 font-semibold shadow-sm'
                  : 'text-text-secondary hover:bg-bg-light hover:text-text-primary'
              }`}
            >
              <span
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                  isActive(path)
                    ? 'bg-white text-primary-500'
                    : 'bg-transparent text-text-tertiary group-hover:bg-white'
                }`}
              >
                <Icon size={19} />
              </span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full px-3.5 py-3 text-danger hover:bg-red-50 rounded-lg transition font-medium text-sm flex items-center gap-3"
          >
            <span className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
              <FiLogOut size={18} />
            </span>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
