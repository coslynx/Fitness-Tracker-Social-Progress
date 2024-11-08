import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import auth from '../services/auth';
import localForage from 'localForage';

const useAuth = () => {
  const { user, isLoggedIn, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const token = await localForage.getItem('auth_token');
      if (token) {
        try {
          const authUser = await auth.verifyToken(token);
          dispatch({ type: 'LOGIN', payload: { user: authUser, isLoggedIn: true } });
        } catch (err) {
          // Handle token verification errors
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { token, user: authUser } = await auth.login(email, password);
      await localForage.setItem('auth_token', token);
      dispatch({ type: 'LOGIN', payload: { user: authUser, isLoggedIn: true } });
    } catch (err) {
      // Handle login errors (e.g., invalid credentials, server error)
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      const { token, user: authUser } = await auth.register(email, password);
      await localForage.setItem('auth_token', token);
      dispatch({ type: 'REGISTER', payload: { user: authUser, isLoggedIn: true } });
    } catch (err) {
      // Handle registration errors (e.g., email already exists, server error)
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await auth.logout();
      await localForage.removeItem('auth_token');
      dispatch({ type: 'LOGOUT', payload: { user: null, isLoggedIn: false } });
    } catch (err) {
      // Handle logout errors (e.g., server error)
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isLoggedIn,
    loading,
    login,
    register,
    logout,
  };
};

export default useAuth;