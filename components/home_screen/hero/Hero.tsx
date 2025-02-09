import { FlatList, useWindowDimensions, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HeroStyles } from '@/styles/home_styles/Hero_styles';
import Hero_wall from './Hero_wall';
import Hero_search from './Hero_search';
import Hero_bottom from './Hero_bottom';
import { Hero_render_item_props } from '@/types/home_types/hero_types';
import { Video } from 'expo-av';
import { router, useFocusEffect } from 'expo-router';
import { useVideoStore } from '@/store/videoStore';
import { useMovies } from '@/services/models/useMovies';
import { useCategory } from '@/services/models/useMoviesCategory';
import Skeleton from '@/utils/skeleton';
import { pauseVideo, playVideo } from '@/utils/video_utils';
import { HeroModel } from '@/screenModel/home/hero_model';
import { Image } from 'expo-image';

const Hero = () => {
  const {
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
  } = HeroModel();

  const renderItem = ({ item, index }: Hero_render_item_props) => {
    const isActive = index === currentIndex;

    return (
      <Hero_wall
        index={index}
        flatListRef={flatListRef}
        setCurrentIndex={setCurrentIndex}
        showVideo={showVideo}
        videoRef={videoRefs}
        videoSource={item?.uri}
        imageSource={item?.imageSource}
        isActive={isActive}
        currentIndex={currentIndex}
        totalItems={mostTranding.length || 0}
      />
    );
  };

  return (
    <View style={[HeroStyles.heroContainer, { height: height * 0.8, width }]}>
      <View style={[HeroStyles.heroWrapper, { width: '100%' }]}>
        {loadingCategory && <Skeleton width={'100%'} height={'100%'} />}

        {!loadingCategory && (
          <>
            {/* {!showVideo ? (
              <Image
                source={{ uri: mostTranding[0]?.imageSource }}
                style={HeroStyles.heroImage}
              />
            ) : ( */}
            <FlatList
              ref={flatListRef}
              data={mostTranding}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              pagingEnabled
              horizontal
              showsVerticalScrollIndicator={false}
              viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
              onViewableItemsChanged={onViewableItemsChanged.current}
              snapToInterval={width}
              decelerationRate="fast"
            />
            {/* )} */}
          </>
        )}

        <Hero_search />

        <Hero_bottom
          currentIndex={currentIndex}
          video={mostTranding || []}
          playVideo={handlePlayPress}
        />
      </View>
    </View>
  );
};

export default Hero;
