import React, { useState, useEffect } from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import useFetch from '../hooks/useFetch';
import localForageService from '../../packages/shared/utils/localForageService';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

const DashboardStats = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData } = useFetch();

  useEffect(() => {
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
  }, [fetchData]);

  const calculateStats = () => {
    if (!userData) {
      return {};
    }

    const currentWeight = userData?.weight?.[userData?.weight?.length - 1]?.value || 0;
    const totalWorkoutsThisWeek = userData?.workouts?.filter((workout) => {
      const workoutDate = new Date(workout.date);
      const today = new Date();
      const daysDifference = (today - workoutDate) / (1000 * 60 * 60 * 24); 
      return daysDifference <= 7;
    }).length || 0; 

    return { 
      currentWeight,
      totalWorkoutsThisWeek,
    };
  };

  const calculatedStats = calculateStats();

  const weightChartData = {
    labels: userData?.weight?.map((entry) => new Date(entry.date).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Weight (kg)',
        data: userData?.weight?.map((entry) => entry.value) || [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const workoutsChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Workouts',
        data: [
          userData?.workouts?.filter((workout) => new Date(workout.date).getDay() === 0).length || 0,
          userData?.workouts?.filter((workout) => new Date(workout.date).getDay() === 1).length || 0,
          userData?.workouts?.filter((workout) => new Date(workout.date).getDay() === 2).length || 0,
          userData?.workouts?.filter((workout) => new Date(workout.date).getDay() === 3).length || 0,
          userData?.workouts?.filter((workout) => new Date(workout.date).getDay() === 4).length || 0,
          userData?.workouts?.filter((workout) => new Date(workout.date).getDay() === 5).length || 0,
          userData?.workouts?.filter((workout) => new Date(workout.date).getDay() === 6).length || 0,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

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
      {userData && (
        <>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Current Weight:</Typography>
            <Typography variant="body1">{calculatedStats.currentWeight} kg</Typography>
            <Typography variant="h6" gutterBottom>Workouts This Week:</Typography>
            <Typography variant="body1">{calculatedStats.totalWorkoutsThisWeek}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Weight Trend:</Typography>
            <Line data={weightChartData} options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Weight Trend',
                },
              },
            }}/>
            <Typography variant="h6" gutterBottom>Workouts This Week:</Typography>
            <Bar data={workoutsChartData} options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Workouts This Week',
                },
              },
            }}/>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default DashboardStats;