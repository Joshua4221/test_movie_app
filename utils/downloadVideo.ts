import * as FileSystem from 'expo-file-system';

export const downloadVideo = async (videoUri: string) => {
  try {
    const fileUri = `${FileSystem.cacheDirectory}video.mp4`;

    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (fileInfo.exists) {
      console.log('Video already cached:', fileInfo.uri);
      return fileInfo.uri;
    }

    console.log('Downloading video...');
    const downloadedFile = await FileSystem.downloadAsync(videoUri, fileUri);

    if (downloadedFile.status !== 200) {
      console.warn('Failed to download video');
      return videoUri; // Fallback to online URI
    }

    console.log('Video downloaded successfully:', downloadedFile.uri);
    return downloadedFile.uri;
  } catch (error) {
    console.error('Error downloading video:', error);
    return videoUri; // Fallback
  }
};
