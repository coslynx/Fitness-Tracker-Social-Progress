import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
} from '@mui/material';
import useAuth from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validators';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegistration, setIsRegistration] = useState(false);

  const { login, register, user, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters.');
      return;
    }

    try {
      if (isRegistration) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} style={{ height: '100vh' }}>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" align="center" gutterBottom>
          {isRegistration ? 'Create Account' : 'Login'}
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={email}
            onChange={handleInputChange}
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={password}
            onChange={handleInputChange}
            required
          />

          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? 'Loading...' : (isRegistration ? 'Create Account' : 'Login')}
          </Button>

          <Button
            onClick={() => setIsRegistration(!isRegistration)}
            variant="outlined"
            fullWidth
          >
            {isRegistration ? 'Already have an account? Login' : 'Create an account'}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginForm;