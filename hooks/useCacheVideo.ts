import { useState, useEffect, useRef, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseVideoCacheReturn {
  localUri: string | null;
  isLoading: boolean;
  progress: number;
  preloadNextVideo: (nextUri: string) => Promise<void>;
  error: Error | null;
}

export const useVideoCache = (
  videoSource: string | null
): UseVideoCacheReturn => {
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);

  const getCacheFileName = useCallback((uri: string) => {
    return `${FileSystem.cacheDirectory}video-${uri.split('/').pop()}`;
  }, []);

  const checkCache = useCallback(
    async (uri: string): Promise<string | null> => {
      try {
        const cacheKey = `video-cache-${uri}`;
        const cachedUri = await AsyncStorage.getItem(cacheKey);

        if (cachedUri) {
          const fileInfo = await FileSystem.getInfoAsync(cachedUri);
          if (fileInfo.exists) {
            return cachedUri;
          }
        }
        return null;
      } catch (error) {
        console.warn('Cache check error:', error);
        return null;
      }
    },
    []
  );

  const downloadVideo = useCallback(
    async (uri: string): Promise<string | null> => {
      try {
        const cacheFileName = getCacheFileName(uri);
        const cacheKey = `video-cache-${uri}`;

        const downloadResumable = FileSystem.createDownloadResumable(
          uri,
          cacheFileName,
          {},
          (downloadProgress) => {
            const calculatedProgress =
              downloadProgress.totalBytesWritten /
              downloadProgress.totalBytesExpectedToWrite;

            if (isMounted.current) {
              setProgress(calculatedProgress);
            }
          }
        );

        const { uri: downloadedUri } = await downloadResumable.downloadAsync();
        await AsyncStorage.setItem(cacheKey, downloadedUri);
        return downloadedUri;
      } catch (error) {
        console.warn('Download error:', error);
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('Failed to download video'));
        }
        return null;
      }
    },
    [getCacheFileName]
  );

  const preloadNextVideo = useCallback(
    async (nextUri: string) => {
      if (!nextUri) return;

      try {
        const cachedUri = await checkCache(nextUri);
        if (!cachedUri) {
          await downloadVideo(nextUri);
        }
      } catch (error) {
        console.warn('Preload error:', error);
      }
    },
    [checkCache, downloadVideo]
  );

  useEffect(() => {
    const loadVideo = async () => {
      if (!videoSource) {
        setIsLoading(false);
        return;
      }

      if (typeof videoSource !== 'string') {
        setLocalUri(videoSource);
        setIsLoading(false);
        return;
      }

      try {
        setError(null);
        // Check cache first
        const cachedUri = await checkCache(videoSource);
        if (cachedUri && isMounted.current) {
          setLocalUri(cachedUri);
          setIsLoading(false);
          return;
        }

        // Download if not cached
        const downloadedUri = await downloadVideo(videoSource);
        if (downloadedUri && isMounted.current) {
          setLocalUri(downloadedUri);
        }
      } catch (error) {
        console.warn('Video loading error:', error);
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    loadVideo();

    return () => {
      isMounted.current = false;
    };
  }, [videoSource, checkCache, downloadVideo]);

  return {
    localUri,
    isLoading,
    progress,
    preloadNextVideo,
    error,
  };
};
