import Navbar from '../components/Navbar';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

/**
 * AdminLayout - Layout for admin users
 */
const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-bg-light">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full text-left px-4 py-2 hover:bg-bg-light rounded-lg transition"
          >
            {sidebarOpen && <span className="font-bold">Admin Panel</span>}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <div className="px-4 py-2 text-xs font-semibold text-text-tertiary uppercase">
            {sidebarOpen && 'Menu'}
          </div>
          <a
            href="#tickets"
            className="block px-4 py-2 text-text-secondary hover:bg-primary-50 hover:text-primary-500 rounded-lg transition"
          >
            {sidebarOpen ? '📋 All Tickets' : '📋'}
          </a>
          <a
            href="#analytics"
            className="block px-4 py-2 text-text-secondary hover:bg-primary-50 hover:text-primary-500 rounded-lg transition"
          >
            {sidebarOpen ? '📊 Analytics' : '📊'}
          </a>
          <a
            href="#settings"
            className="block px-4 py-2 text-text-secondary hover:bg-primary-50 hover:text-primary-500 rounded-lg transition"
          >
            {sidebarOpen ? '⚙️ Settings' : '⚙️'}
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
