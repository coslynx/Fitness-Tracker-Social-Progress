import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button, Alert, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import { styled } from '@emotion/react';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import GoalList from '../components/GoalList';
import GoalCreationForm from '../components/GoalCreationForm';
import { validateGoalInput } from '../utils/validators';
import { GoalType } from '../../packages/shared/types';

const GoalsPage = () => {
  const { isLoggedIn } = useAuth();
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState(null);
  const { fetchData, saveData } = useFetch();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const fetchedGoals = await fetchData('userGoals');
        setGoals(fetchedGoals);
      } catch (err) {
        setError(err.message);
      }
    };

    if (isLoggedIn) {
      fetchGoals();
    }
  }, [isLoggedIn, fetchData]);

  const handleGoalCreation = async (newGoalData) => {
    try {
      if (!validateGoalInput(newGoalData)) {
        setError('Please fill in all fields correctly.');
        return;
      }

      await saveData('userGoals', [...goals, newGoalData]);
      setGoals([...goals, newGoalData]);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoalEdit = async (updatedGoal) => {
    try {
      const updatedGoals = goals.map((goal) =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      );
      await saveData('userGoals', updatedGoals);
      setGoals(updatedGoals);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoalDelete = async (goalId) => {
    try {
      const updatedGoals = goals.filter((goal) => goal.id !== goalId);
      await saveData('userGoals', updatedGoals);
      setGoals(updatedGoals);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} style={{ minHeight: '80vh' }}>
      {error && (
        <Grid item xs={12}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Grid>
      )}
      {isLoggedIn ? (
        <>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Your Goals
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <GoalCreationForm onGoalCreate={handleGoalCreation} />
          </Grid>
          <Grid item xs={12} md={6}>
            <GoalList goals={goals} onGoalEdit={handleGoalEdit} onGoalDelete={handleGoalDelete} />
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">Please log in to manage your goals.</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default GoalsPage;