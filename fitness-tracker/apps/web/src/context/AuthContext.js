import React, { createContext, useReducer } from 'react';
import auth from '../services/auth';
import localForage from 'localForage';

// Define the initial state for the AuthContext
const initialState = {
  isLoggedIn: false,
  user: null,
};

// Define the reducer function to update the authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isLoggedIn: true, user: action.payload.user };
    case 'LOGOUT':
      return { isLoggedIn: false, user: null };
    default:
      return state;
  }
};

// Create the AuthContext using createContext
const AuthContext = createContext(initialState);

// Define the Provider component to wrap the application
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    try {
      const { token, user } = await auth.login(email, password);
      await localForage.setItem('auth_token', token);
      dispatch({ type: 'LOGIN', payload: { user } });
    } catch (error) {
      // Handle login errors (e.g., invalid credentials, server error)
      console.error('Login error:', error);
      // You might want to display an error message to the user here
    }
  };

  const register = async (email, password) => {
    try {
      const { token, user } = await auth.register(email, password);
      await localForage.setItem('auth_token', token);
      dispatch({ type: 'LOGIN', payload: { user } });
    } catch (error) {
      // Handle registration errors (e.g., email already exists, server error)
      console.error('Registration error:', error);
      // You might want to display an error message to the user here
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
      await localForage.removeItem('auth_token');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      // Handle logout errors (e.g., server error)
      console.error('Logout error:', error);
      // You might want to display an error message to the user here
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };