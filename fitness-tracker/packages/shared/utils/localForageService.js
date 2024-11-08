import localForage from 'localForage';

// Configure localForage for user data
localForage.config({
  name: 'FitnessTrackerData',
  storeName: 'userData',
});

// Function to save user data to local storage
export const saveUserData = async (key, data) => {
  try {
    await localForage.setItem(key, data);
    console.log(`Data saved to local storage for key: ${key}`);
  } catch (error) {
    console.error('Error saving data to local storage:', error);
    throw error; // Re-throw the error to allow the calling component to handle it
  }
};

// Function to retrieve user data from local storage
export const getUserData = async (key) => {
  try {
    const data = await localForage.getItem(key);
    console.log(`Data retrieved from local storage for key: ${key}`);
    return data;
  } catch (error) {
    console.error('Error retrieving data from local storage:', error);
    throw error; // Re-throw the error to allow the calling component to handle it
  }
};

// Function to remove user data from local storage
export const removeUserData = async (key) => {
  try {
    await localForage.removeItem(key);
    console.log(`Data removed from local storage for key: ${key}`);
  } catch (error) {
    console.error('Error removing data from local storage:', error);
    throw error; // Re-throw the error to allow the calling component to handle it
  }
};

// Function to clear all user data from local storage
export const clearUserData = async () => {
  try {
    await localForage.clear();
    console.log('All user data cleared from local storage');
  } catch (error) {
    console.error('Error clearing user data from local storage:', error);
    throw error; // Re-throw the error to allow the calling component to handle it
  }
};