import { useEffect, useState, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { Video } from 'expo-av';
import { useCategory } from '@/services/models/useMoviesCategory';
import { useVideoStore } from '@/store/videoStore';
import { pauseVideo, playVideo } from '@/utils/video_utils';
import { router } from 'expo-router';

export const HeroModel = () => {
  const [showVideo, setShowVideo] = useState(false);
  const { setCurrentVideo, setPlaybackPosition } = useVideoStore();
  const { mostTranding, loadingCategory } = useCategory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const flatListRef = useRef(null);
  const videoRefs = useRef<{ [key: number]: Video | null }>({});
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (loadingCategory) return;
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showVideo]);

  useFocusEffect(
    useCallback(() => {
      playVideo(currentIndex, videoRefs, setIsPlaying);
      return () => {
        pauseVideo(currentIndex, videoRefs, setIsPlaying);
      };
    }, [currentIndex])
  );

  const handlePlayPress = async () => {
    if (loadingCategory) return;
    console.log('joshua ejike', currentIndex, videoRefs.current[currentIndex]);
    if (videoRefs.current) {
      const status = await videoRefs.current?.getStatusAsync();
      const video = mostTranding[currentIndex];
      setCurrentVideo(video);
      setPlaybackPosition(status?.positionMillis || 0);
      router.push('/(tabs)/short');
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      pauseVideo(currentIndex, videoRefs, setIsPlaying);
      setCurrentIndex(newIndex);
      setTimeout(() => {
        playVideo(newIndex, videoRefs, setIsPlaying);
      }, 3000);
    }
  });

  return {
    showVideo,
    currentIndex,
    isPlaying,
    flatListRef,
    videoRefs,
    handlePlayPress,
    onViewableItemsChanged,
    height,
    width,
    loadingCategory,
    mostTranding,
    setCurrentIndex,
  };
};
