import { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Video } from 'expo-av';
import { useVideoStore } from '@/store/videoStore';
import { useMovies } from '@/services/models/useMovies';

export const ShortListModel = () => {
  const { movies } = useMovies();
  const { currentVideo, playbackPosition, setIsPlaying } = useVideoStore();
  const { height } = useWindowDimensions();
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const videoRefs = useRef<{ [key: number]: Video | null }>({});
  const flatListRef = useRef(null);
  const [status, setStatus] = useState({
    positionMillis: 0,
    durationMillis: 0,
  });
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  useEffect(() => {
    if (!currentVideo) return;

    const findVideoIndex = movies.findIndex(
      (movie: any) => movie.id === currentVideo.id
    );

    if (findVideoIndex === -1) return;

    const resumeVideo = async () => {
      try {
        setTimeout(async () => {
          flatListRef.current?.scrollToIndex({
            index: findVideoIndex,
            animated: false,
          });

          let video = videoRefs.current[findVideoIndex];

          if (video) {
            await video.setPositionAsync(playbackPosition);
            await video.playAsync();
            setIsPlaying(true);
          }
        }, 500);
      } catch (error) {
        console.error('Error resuming video:', error);
      }
    };

    const interval = setInterval(() => {
      if (videoRefs.current) {
        clearInterval(interval);
        resumeVideo();
      }
    }, 100);

    return () => {
      clearInterval(interval);
      videoRefs.current[findVideoIndex - 1]?.pauseAsync();
    };
  }, [currentVideo?.id]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveVideoIndex(viewableItems[0].index);
    }
  });

  return {
    activeVideoIndex,
    videoRefs,
    flatListRef,
    onViewableItemsChanged,
    movies,
    setStatus,
    status,
    viewabilityConfig,
    height,
  };
};
