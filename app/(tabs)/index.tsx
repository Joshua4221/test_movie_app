import ErrorComponent from '@/components/ErrorComponent';
import Hero from '@/components/home_screen/hero/Hero';
import Movies from '@/components/home_screen/movie_sections/Movies';
import { useCategory } from '@/services/models/useMoviesCategory';
import { HomeContainerStyle } from '@/styles/home_styles/Home_container_styles';
import { ScrollView, View } from 'react-native';

export default function HomeScreen() {
  const { errorCategory, retry, retrying } = useCategory();

  return (
    <View style={HomeContainerStyle.container}>
      {retrying || errorCategory ? (
        <ErrorComponent Retry={retry} />
      ) : (
        <ScrollView>
          <View>
            <Hero />

            <Movies />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
