import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Short_List from '@/components/short_screen/Short_List';
import { ShortReelsStyle } from '@/styles/short_styles/short_reels_style';
import { useMovies } from '@/services/models/useMovies';
import ErrorComponent from '@/components/ErrorComponent';

const Short = () => {
  const { error, retry, retrying } = useMovies();

  return (
    <SafeAreaView style={ShortReelsStyle.container}>
      {retrying || error ? <ErrorComponent Retry={retry} /> : <Short_List />}
    </SafeAreaView>
  );
};

export default Short;
