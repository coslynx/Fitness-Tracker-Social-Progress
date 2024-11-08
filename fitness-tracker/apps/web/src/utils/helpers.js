import { GoalType } from '../../packages/shared/types';

export const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateGoalInput = (goalData) => {
  if (
    !goalData.type ||
    !goalData.targetValue ||
    !goalData.deadline ||
    !Object.values(GoalType).includes(goalData.type)
  ) {
    return false;
  }
  // Add additional validation checks for each goal field as needed 
  return true;
};