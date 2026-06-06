import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiShield, FiCalendar } from 'react-icons/fi';

/**
 * ProfilePage - User profile information
 */
const ProfilePage = () => {
  const { user } = useAuth();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="p-6 bg-bg-light min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Profile</h1>
          <p className="text-text-secondary mt-2">Manage your account information</p>
        </div>

        {/* Profile Card */}
        {user && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                  <FiUser className="text-primary-500" size={32} />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{user.name}</h2>
                <p className="text-text-secondary">{user.email}</p>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-4">
              <ProfileField
                icon={FiUser}
                label="Full Name"
                value={user.name}
              />
              <ProfileField
                icon={FiMail}
                label="Email"
                value={user.email}
              />
              <ProfileField
                icon={FiShield}
                label="Role"
                value={user.role || 'User'}
                badge={true}
                badgeColor={user.role === 'Admin' ? 'primary' : 'secondary'}
              />
              <ProfileField
                icon={FiCalendar}
                label="Member Since"
                value={user.createdAt ? formatDate(user.createdAt) : 'N/A'}
              />
            </div>

            {/* Account Settings */}
            <div className="pt-6 border-t border-gray-200 space-y-3">
              <h3 className="font-semibold text-text-primary">Account Settings</h3>
              <button className="w-full px-4 py-2 border border-gray-300 text-text-secondary rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                Change Password
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-text-secondary rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                Download Data
              </button>
              <button className="w-full px-4 py-2 border border-danger text-danger rounded-lg hover:bg-red-50 transition text-sm font-medium">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * ProfileField - Single profile field component
 */
const ProfileField = ({ icon: Icon, label, value, badge = false, badgeColor = 'primary' }) => {
  const colorClass = {
    primary: 'bg-primary-50 text-primary-600',
    secondary: 'bg-blue-50 text-blue-600',
  }[badgeColor];

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Icon className="text-text-tertiary" size={20} />
        </div>
        <div>
          <p className="text-text-tertiary text-sm">{label}</p>
          {!badge ? (
            <p className="text-text-primary font-medium">{value}</p>
          ) : (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
              {value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
