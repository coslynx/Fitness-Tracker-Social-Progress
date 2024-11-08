import React, { useState, useEffect } from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import DashboardStats from '../components/DashboardStats';
import GoalList from '../components/GoalList';

const Dashboard = () => {
  const { user, isLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData } = useFetch();

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          const data = await fetchData('userData');
          setUserData(data);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    }
  }, [isLoggedIn, fetchData]);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
      {isLoading && <Grid item xs={12}><CircularProgress /></Grid>}
      {error && (
        <Grid item xs={12}>
          <Typography variant="body1" color="error">
            Error: {error.message}
          </Typography>
        </Grid>
      )}
      {isLoggedIn && userData && (
        <>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>Welcome, {user.username}!</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Your Progress:</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <DashboardStats userData={userData} /> 
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Goals:</Typography>
            <GoalList goals={userData.goals} /> 
          </Grid>
        </>
      )}
      {!isLoggedIn && (
        <Grid item xs={12}>
          <Typography variant="body1">Please log in to access your dashboard.</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;