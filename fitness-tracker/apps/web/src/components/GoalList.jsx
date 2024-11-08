import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, LinearProgress } from '@mui/material';
import { useFetch } from '../hooks/useFetch';
import { formatDate } from '../utils/helpers';
import { GoalType } from '../../packages/shared/types';

const GoalList = () => {
  const [goals, setGoals] = useState(null);
  const [error, setError] = useState(null);
  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goals = await fetchData('userGoals');
        setGoals(goals);
      } catch (err) {
        setError(err);
      }
    };

    fetchGoals();
  }, [fetchData]);

  const calculateProgress = (goal) => {
    if (goal.type === GoalType.WEIGHT_LOSS) {
      const currentWeight = 80; // Replace with actual data from user profile
      const progress = (goal.targetValue - currentWeight) / goal.targetValue * 100;
      return progress;
    } else if (goal.type === GoalType.DISTANCE) {
      const distanceCovered = 5; // Replace with actual data from user activity logs
      const progress = distanceCovered / goal.targetValue * 100;
      return progress;
    } else if (goal.type === GoalType.MUSCLE_GAIN) {
      // Implement progress calculation for muscle gain based on user data
      return 0;
    } else {
      return 0;
    }
  };

  return (
    <List>
      {goals?.map((goal, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={
              <Typography variant="subtitle1" gutterBottom>
                {goal.type === GoalType.WEIGHT_LOSS
                  ? 'Lose Weight'
                  : goal.type === GoalType.DISTANCE
                  ? 'Distance'
                  : 'Muscle Gain'}
              </Typography>
            }
            secondary={
              <Typography variant="body2">
                Target: {goal.targetValue}
                {goal.type === GoalType.WEIGHT_LOSS
                  ? ' kg'
                  : goal.type === GoalType.DISTANCE
                  ? ' km'
                  : ''} - Deadline: {formatDate(goal.deadline)}
                <br />
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress(goal)}
                  style={{ marginTop: '8px' }}
                />
              </Typography>
            }
          />
        </ListItem>
      ))}
      {error && (
        <ListItem>
          <ListItemText>
            <Typography variant="body1" color="error">
              Error fetching goals: {error.message}
            </Typography>
          </ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export default GoalList;