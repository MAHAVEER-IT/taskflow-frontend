import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChatWidget from '../components/ChatWidget';
import { FiMessageCircle } from 'react-icons/fi';

/**
 * UserLayout - Layout for authenticated users with sidebar and navbar
 */
const UserLayout = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8fbff]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Chat Widget */}
      {isChatOpen && (
        <ChatWidget
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      {/* Chat floating button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-primary-600 transition flex items-center justify-center z-40"
          title="Open chat"
        >
          <FiMessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default UserLayout;
