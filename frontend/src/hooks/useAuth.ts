import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const token = localStorage.getItem('auth_token');
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  useEffect(() => {
    if (token && context) {
      context.login();
    }
  }, [token, context]);

  return context;
};
