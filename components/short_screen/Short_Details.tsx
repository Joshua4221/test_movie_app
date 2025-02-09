import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';
import { ShortReelsStyle } from '@/styles/short_styles/short_reels_style';
import { ResizeMode, Video } from 'expo-av';
import Short_Socials from './Short_Socials';
import { ShortReelDetailsType } from '@/types/short_types/short_reels_details_type';
import Short_Description from './Short_Description';
import { useVideoCache } from '@/hooks/useCacheVideo';

const Short_Details = ({
  item,
  index,
  isActive,
  videoRefs,
  setStatus,
  status,
}: ShortReelDetailsType) => {
  const [focused, setFocused] = useState(false);
  const { width, height } = useWindowDimensions();

  const { localUri, isLoading, progress, preloadNextVideo } = useVideoCache(
    item?.uri
  );

  return (
    <View
      key={index}
      style={[ShortReelsStyle.videoContainer, { width, height }]}
    >
      {isLoading ? (
        <View style={{ position: 'absolute', top: 60, right: '50%' }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <Video
          ref={(ref) => (videoRefs.current[index] = ref)}
          source={localUri ? { uri: localUri } : item?.uri}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={ResizeMode.COVER}
          shouldPlay={isActive}
          isLooping
          style={ShortReelsStyle.video}
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
          }}
        />
      )}

      <Short_Socials
        likes={item?.likes}
        comments={item?.comments}
        shares={item?.shares}
        focused={focused}
      />

      <Short_Description
        username={item?.username}
        description={item?.description}
        status={status}
      />
    </View>
  );
};

export default Short_Details;
