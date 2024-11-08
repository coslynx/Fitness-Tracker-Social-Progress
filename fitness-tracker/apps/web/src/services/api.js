// fitness-tracker/apps/web/src/services/api.js

import localForage from 'localForage'; 

// Function to fetch user data
const fetchUserData = async () => {
  try {
    const userData = await localForage.getItem('userData');
    if (!userData) {
      return null; // Handle case where user data is not found
    }
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle error gracefully (e.g., display an error message to the user)
    throw error; // Re-throw the error so the calling component can handle it
  }
};

// Function to save user goals
const saveUserGoals = async (goals) => {
  try {
    await localForage.setItem('userGoals', goals);
    console.log('User goals saved to local storage'); 
  } catch (error) {
    console.error('Error saving user goals:', error);
    // Handle error gracefully (e.g., display an error message to the user)
    throw error; // Re-throw the error so the calling component can handle it
  }
};

// Function to fetch workout data (for future integration)
const fetchWorkoutData = async () => {
  // Placeholder for future implementation
};

// Export functions for use in components
export { fetchUserData, saveUserGoals, fetchWorkoutData };