import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { HeroStyles } from '@/styles/home_styles/Hero_styles';
import { Hero_wall_props_extra } from '@/types/home_types/hero_types';
import { ResizeMode, Video } from 'expo-av';
import { useVideoCache } from '@/hooks/useCacheVideo';

const Hero_wall = ({
  showVideo,
  videoRef,
  videoSource,
  imageSource,
  isActive,
  flatListRef,
  currentIndex,
  setCurrentIndex,
  index,
  totalItems,
}: Hero_wall_props_extra) => {
  const { width } = useWindowDimensions();

  const { localUri, isLoading, progress, preloadNextVideo } =
    useVideoCache(videoSource);

  return (
    <View style={[HeroStyles.heroImage, { width: width }]}>
      {isLoading ? (
        <View style={{ position: 'absolute', top: 60, right: '50%' }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <Video
          ref={videoRef}
          source={localUri ? { uri: localUri } : videoSource}
          style={HeroStyles.video}
          resizeMode={ResizeMode.COVER}
          isMuted={true}
          shouldPlay={isActive}
          isLooping={true}
          onPlaybackStatusUpdate={(status) => {
            // onPlaybackStatusUpdate?.(status);

            // Preload next video when current video is 75% complete
            if (status.positionMillis && status.durationMillis) {
              const progress = status.positionMillis / status.durationMillis;

              if (progress > 0.75) {
                // You'll need to implement logic to get the next video URI
                const nextVideoUri = null; // Replace with your logic
                if (nextVideoUri) {
                  preloadNextVideo(nextVideoUri);
                }
              }
            }

            if (status?.didJustFinish) {
              if (flatListRef?.current) {
                try {
                  const nextIndex = currentIndex + 1;

                  if (nextIndex < totalItems) {
                    // Normal scrolling to the next item
                    flatListRef.current.scrollToIndex({
                      index: nextIndex,
                      animated: true,
                    });
                    setCurrentIndex(nextIndex);
                  } else {
                    // Instantly jump back to the first item without animation
                    setTimeout(() => {
                      flatListRef.current?.scrollToIndex({
                        index: 0,
                        animated: false, // Instant jump to avoid scrolling back
                      });
                      setCurrentIndex(0);
                    }, 500); // Small delay to avoid flickering
                  }
                } catch (error) {
                  console.warn('Error scrolling to next index:', error);
                }
              }
            }
          }}
        />
      )}
    </View>
  );
};

export default Hero_wall;
