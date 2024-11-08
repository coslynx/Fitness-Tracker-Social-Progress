import { GoalType } from '../../packages/shared/types';

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
  if (typeof goalData.targetValue !== 'number' || goalData.targetValue <= 0) {
    return false;
  }
  if (!(goalData.deadline instanceof Date) || goalData.deadline <= new Date()) {
    return false;
  }
  return true;
};