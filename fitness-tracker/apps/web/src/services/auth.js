// fitness-tracker/apps/web/src/services/auth.js
import localForage from 'localForage'; // Version 1.10.0
import { API_URL } from '../config'; // Ensure your API URL is set properly

const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    const data = await response.json(); // Assuming backend returns JSON
    await localForage.setItem('auth_token', data.token); // Store token locally

    return { token: data.token, user: data.user };
  } catch (error) {
    console.error('Login error:', error); // Log the error for debugging
    throw error; // Re-throw the error so the calling component can handle it
  }
};

const register = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.status}`);
    }

    const data = await response.json(); // Assuming backend returns JSON
    await localForage.setItem('auth_token', data.token); // Store token locally

    return { token: data.token, user: data.user };
  } catch (error) {
    console.error('Registration error:', error); // Log the error for debugging
    throw error; // Re-throw the error so the calling component can handle it
  }
};

const logout = async () => {
  try {
    await localForage.removeItem('auth_token'); // Remove token from local storage

    // Optionally: Notify the backend about the logout

    return true; 
  } catch (error) {
    console.error('Logout error:', error);
    throw error; 
  }
};

const verifyToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include token in Authorization header
      },
    });

    if (!response.ok) {
      throw new Error(`Token verification failed: ${response.status}`);
    }

    const data = await response.json(); 
    return data.user; 
  } catch (error) {
    console.error('Token verification error:', error); 
    throw error;
  }
};

export { login, register, logout, verifyToken };