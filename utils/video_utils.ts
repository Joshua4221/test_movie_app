export const playVideo = async (
  index: number,
  videoRefs: any,
  setIsPlaying: (x: boolean) => void
) => {
  const video = videoRefs.current[index];
  if (video) {
    await video.playAsync();
    setIsPlaying(true);
  }
};

export const pauseVideo = async (
  index: number,
  videoRefs: any,
  setIsPlaying: (x: boolean) => void
) => {
  const video = videoRefs.current[index];
  if (video) {
    await video.pauseAsync();
    setIsPlaying(false);
  }
};

export const startVideo = async (
  index: number,
  videoRefs: any,
  setIsPlaying: (x: boolean) => void
) => {
  const video = videoRefs.current[index];
  if (video) {
    await video.replayAsync();
    setIsPlaying(false);
  }
};

export const handlePlayPress = async (
  video: any,
  setCurrentVideo: any,
  setPlaybackPosition: any,
  router: any
) => {
  setCurrentVideo(video);
  setPlaybackPosition(0);
  router.push('/(tabs)/short');
};
