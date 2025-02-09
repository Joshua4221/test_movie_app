import { useCallback, useEffect, useState } from 'react';
import { movieService } from '../api_services';

export const useCategory = () => {
  const [continueWatching, setContinueWatching] = useState<any>([]);
  const [mostTranding, setMostTranding] = useState<any>([]);
  const [forYou, setForYou] = useState<any>([]);
  const [drama, setDrama] = useState<any>([]);
  const [romance, setRomance] = useState<any>([]);
  const [documentary, setDocumentary] = useState<any>([]);
  const [loadingCategory, setLoading] = useState(true);
  const [errorCategory, setError] = useState<any>(null);
  const [retrying, setRetrying] = useState(false);

  const fetchMovies = async () => {
    try {
      const moviesData: any = await Promise.all([
        movieService.getAllContinueWatching(),
        movieService.getAllMostTranding(),
        movieService.getAllForYou(),
        movieService.getAllDrama(),
        movieService.getAllRomance(),
        movieService.getAllDocumentary(),
      ]);

      await setContinueWatching(moviesData[0]);

      await setMostTranding(moviesData[1]);

      await setForYou(moviesData[2]);

      await setDrama(moviesData[3]);

      await setRomance(moviesData[4]);

      await setDocumentary(moviesData[5]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  return {
    continueWatching,
    mostTranding,
    forYou,
    drama,
    romance,
    documentary,
    loadingCategory,
    errorCategory,
    retry,
    retrying,
  };
};
