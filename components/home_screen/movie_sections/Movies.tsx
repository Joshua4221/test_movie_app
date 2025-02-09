import { View } from 'react-native';
import React from 'react';
import { movie_categories } from '@/constants/data/Home';
import Movie_Component from './Movie_Component';
import { useCategory } from '@/services/models/useMoviesCategory';

const Movies = () => {
  const {
    continueWatching,
    mostTranding,
    forYou,
    drama,
    romance,
    documentary,
    loadingCategory,
    errorCategory,
  } = useCategory();

  return (
    <View style={{ gap: 35, paddingBottom: 120 }}>
      <Movie_Component
        list={continueWatching}
        title="Continue watching"
        height={285}
      />

      <Movie_Component list={mostTranding} title="Most Trending" />

      <Movie_Component
        list_category={movie_categories}
        title="By category"
        category
        height={125}
      />

      <Movie_Component list={forYou} title="For you" />

      <Movie_Component list={drama} title="Drama" />

      <Movie_Component list={romance} title="Romance" />

      <Movie_Component list={documentary} title="Documentary" />
    </View>
  );
};

export default Movies;
