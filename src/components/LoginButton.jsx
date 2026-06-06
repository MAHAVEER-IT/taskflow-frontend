import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useState } from 'react';

/**
 * LoginButton - Google OAuth login button
 */
const LoginButton = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      setError(null);
      const response = await authService.googleAuth(credentialResponse.credential);
      login(response.token, response.user);
      navigate('/dashboard');
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  const handleLoginError = () => {
    setError('Login failed. Please try again.');
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
};

export default LoginButton;
