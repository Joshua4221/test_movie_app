import { View } from 'react-native';
import React from 'react';
import Movie_List from './Movie_List';
import Movie_Header from './Movie_Header';
import { MovieComponentType } from '@/types/home_types/movie_types';
import { MovieSectionStyles } from '@/styles/home_styles/movie_section_styles';
import Movie_Category_list from './Movie_Category_list';
import { useCategory } from '@/services/models/useMoviesCategory';
import Skeleton from '@/utils/skeleton';

const Movie_Component = ({
  list,
  title,
  height = 350,
  category = false,
  list_category,
}: MovieComponentType) => {
  const { loadingCategory } = useCategory();

  return (
    <View style={[MovieSectionStyles.containerWrapper, { height }]}>
      <Movie_Header title={title} />

      {!category ? (
        <>
          {loadingCategory ? (
            <Skeleton width={'100%'} height={'90%'} />
          ) : (
            <Movie_List list={list} />
          )}
        </>
      ) : (
        <Movie_Category_list list={list_category} />
      )}
    </View>
  );
};

export default Movie_Component;
