import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MovieSectionStyles } from '@/styles/home_styles/movie_section_styles';
import { Image } from 'expo-image';
import { MovieDetailsType } from '@/types/home_types/movie_types';
import { handlePlayPress } from '@/utils/video_utils';
import { router } from 'expo-router';
import { useVideoStore } from '@/store/videoStore';

const Movie_Details = ({
  title,
  genres,
  imageSource,
  item,
}: MovieDetailsType) => {
  const { setCurrentVideo, setPlaybackPosition } = useVideoStore();
  return (
    <TouchableOpacity
      style={MovieSectionStyles.cardContainer}
      onPress={() =>
        handlePlayPress(item, setCurrentVideo, setPlaybackPosition, router)
      }
    >
      <Image
        source={
          typeof imageSource === 'string' ? { uri: imageSource } : imageSource
        }
        style={MovieSectionStyles.cardImage}
      />

      <View style={MovieSectionStyles.cardContent}>
        <View style={MovieSectionStyles.cardGenres}>
          {genres.map((genre, index) => (
            <Text key={index} style={MovieSectionStyles.cardGenreText}>
              {genre}
            </Text>
          ))}
        </View>
        <Text
          style={MovieSectionStyles.cardTitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Movie_Details;
