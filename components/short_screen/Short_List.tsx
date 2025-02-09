import { FlatList } from 'react-native';
import React, { Fragment } from 'react';
import Short_Details from './Short_Details';
import { ShortReelDetailsType } from '@/types/short_types/short_reels_details_type';
import { ShortListModel } from '@/screenModel/short/video_short_list_model';

const Short_List = () => {
  const {
    activeVideoIndex,
    videoRefs,
    flatListRef,
    onViewableItemsChanged,
    movies,
    setStatus,
    status,
    viewabilityConfig,
    height,
  } = ShortListModel();

  const renderVideo = ({ item, index }: ShortReelDetailsType) => {
    const isActive = index === activeVideoIndex;

    return (
      <Short_Details
        item={item}
        index={index}
        isActive={isActive}
        videoRefs={videoRefs}
        setStatus={setStatus}
        status={status}
      />
    );
  };

  return (
    <Fragment>
      <FlatList
        ref={flatListRef}
        data={movies}
        renderItem={renderVideo}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
        snapToInterval={height}
        decelerationRate="fast"
      />
    </Fragment>
  );
};

export default Short_List;
