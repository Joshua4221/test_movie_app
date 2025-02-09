import { useCallback, useEffect, useState } from 'react';
import { movieService } from '../api_services';

export const useMovies = () => {
  const [movies, setMovies] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [retrying, setRetrying] = useState(false);

  const fetchMovies = useCallback(async () => {
    try {
      setError(null);
      const moviesData = await movieService.getAllMovies();
      setMovies(moviesData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch movies');
      throw err; // Re-throw to handle in retry function
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  }, []);

  const retry = useCallback(async () => {
    setRetrying(true);
    setLoading(true);
    try {
      await fetchMovies();
    } catch (err) {
      // Error is already set in fetchMovies
      console.warn('Retry failed:', err);
    }
  }, [fetchMovies]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, loading, error, retrying, retry };
};
