import { useState, useEffect } from 'react';
import localForage from 'localForage';

const useFetch = () => {
  const [error, setError] = useState(null);

  const fetchData = async (key) => {
    try {
      const data = await localForage.getItem(key);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const saveData = async (key, data) => {
    try {
      await localForage.setItem(key, data);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    fetchData,
    saveData,
    error,
    setError,
  };
};

export default useFetch;