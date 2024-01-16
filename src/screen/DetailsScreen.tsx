import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { IMAGE_URL } from '../helper/AxoisService';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetMovieDetails } from '../redux/slice/movieListSlice';
import { hp, isAndroid, wp } from '../helper/Responsive';
import StarIcons from '../assets/svg/StarIcons';
import { colors } from '../utils/Colors';
import BackIcons from '../assets/svg/BackIcons';
import { RootState } from '../redux/store';

interface spoken_languages {
  english_name: string
}

interface production_companies {
  name: string
}

interface genres {
  name: string
}


const DetailsScreen = () => {
  const { movieDetails } = useSelector((state: RootState) => state.movieReducers)
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch<any>();
  const routes = useRoute<any>();
  const isFoused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFoused) {
      getMovieDetails()
    }
  }, [isFoused])

  const getMovieDetails = () => {
    dispatch(requestGetMovieDetails(routes?.params?.id))
  }

  return (
    <ScrollView style={styles.mainContainer} bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(5) }}>
      <TouchableOpacity style={[styles.backIcons, { marginTop: top }]} onPress={() => navigation.goBack()}>
        <BackIcons />
      </TouchableOpacity>
      <Image source={{ uri: IMAGE_URL + movieDetails?.backdrop_path }} style={styles.backImage} />
      <Image source={{ uri: IMAGE_URL + movieDetails?.poster_path }} style={[styles.movieImage, { top: isAndroid ? top + hp(15) : top + hp(8) }]} />
      <View style={[styles.rateView, { top: isAndroid ? top + hp(24) : top + hp(18) }]}>
        <StarIcons />
        <Text style={styles.rateText}>{`${Math.round(movieDetails?.vote_average)} / 10`}</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.title}>{movieDetails?.original_title}</Text>
        <Text style={styles.releaseText}>Release Date: {movieDetails?.release_date}</Text>
        <Text style={styles.languagesText}>Overview</Text>
        <Text style={styles.moviewOverViewText}>{movieDetails?.overview}</Text>
        <Text style={styles.languagesText}>Languages</Text>
        <View style={styles.row}>
          {movieDetails?.spoken_languages?.map((item: spoken_languages) => (
            <View style={styles.langView}>
              <Text style={styles.englishNameText} >{item?.english_name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.languagesText}>Producation</Text>
        {movieDetails?.production_companies?.map((item: production_companies) => (
          <Text style={{ marginVertical: hp(0.2) }}>{item?.name}</Text>
        ))}
        <Text style={styles.languagesText}>Producation</Text>
        <View style={styles.row}>
          {movieDetails?.genres?.map((item: genres) => (
            <View style={styles.langView}>
              <Text style={styles.englishNameText}>{item?.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backImage: {
    width: wp(100),
    height: wp(60),
    resizeMode: 'cover'
  },
  movieImage: {
    width: wp(30),
    height: wp(40),
    resizeMode: 'cover',
    position: 'absolute',
    marginLeft: wp(5),
    borderRadius: 12
  },
  rateView: {
    backgroundColor: colors.white,
    position: 'absolute',
    flexDirection: 'row',
    right: wp(5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.10,
    shadowRadius: 6.68,
    elevation: 11,
  },
  rateText: {
    color: colors.black,
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: wp(2)
  },
  textView: {
    marginTop: hp(8),
    marginHorizontal: wp(5)
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 19,
    maxWidth: wp(80)
  },
  releaseText: {
    color: colors.gray
  },
  moviewOverViewText: {
    fontSize: 18,
    color: colors.gray
  },
  languagesText: {
    color: colors.black,
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: hp(3),
    marginBottom: hp(1)
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  langView: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    padding: wp(2),
    margin: wp(1),
    borderRadius: 20
  },
  englishNameText: {
    fontSize: 12
  },
  backIcons: {
    position: 'absolute',
    backgroundColor: colors.black_50,
    padding: wp(1),
    borderRadius: 20,
    zIndex: 1,
    marginLeft: wp(3)
  }
})