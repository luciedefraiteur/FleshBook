import { useState, useCallback } from 'react';

const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      if (result.error) {
        setError(result.error);
        setData(null);
      } else {
        setData(result);
      }
      return result;
    } catch (err) {
      setError(err.message || 'Une erreur inattendue est survenue.');
      setData(null);
      return { error: err.message || 'Une erreur inattendue est survenue.' };
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { data, loading, error, execute };
};

export default useApi;