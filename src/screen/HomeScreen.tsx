import { ActivityIndicator, FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestGetMovieList } from '../redux/slice/movieListSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp, wp } from '../helper/Responsive';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IMAGE_URL } from '../helper/AxoisService';
import { colors } from '../utils/Colors';
import { RootState } from '../redux/store';

const HomeScreen = () => {
  const { movieList,isLoadingMoreData } = useSelector((state: RootState )=> state.movieReducers)
  const dispatch = useDispatch<any>();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMovieList()
  }, [])

  const getMovieList = async () => {
    dispatch(requestGetMovieList(page))
  }

  const onEndReached = () => {
    if(!isLoadingMoreData && (page < movieList?.total_pages)){
      dispatch(requestGetMovieList(page + 1))
      setPage(page + 1)
    }
  }

  const ListFooterComponent = () => {
  return isLoadingMoreData ? <ActivityIndicator/> : null
  }

  return (
    <View style={[styles.mainContainer, { paddingTop: top }]}>
      <Text style={styles.popularText}>POPULAR</Text>
     {movieList?.results.length > 0 ? 
     <FlatList
        data={movieList?.results}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => navigation.navigate('Details', { id: item?.id })}>
              <ImageBackground borderRadius={12} source={{ uri: IMAGE_URL + item?.backdrop_path }} style={styles.image}>
                <View style={styles.textView}>
                  <Text style={styles.title}>{item?.title}</Text>
                  <Text numberOfLines={2} style={styles.overviewText}>{item?.overview}</Text>
                </View>
              </ImageBackground>
            </Pressable>
          )
        }}
      />:
      <View style={styles.noData}>
        <Text style={styles.noDataText}>No Data Available Now Please Try Again After Sometime </Text>
      </View>}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  popularText: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: hp(2)
  },
  image: {
    width: wp(95),
    alignSelf: 'center',
    marginBottom: hp(1),
    height: wp(50),
  },
  textView: {
    backgroundColor: colors.black_50,
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center'
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    alignSelf: 'center',
    textAlign: 'center',
    maxWidth: wp(80)
  },
  voteView: {
    alignSelf: 'center',
    backgroundColor: colors.black,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 20,
    borderWidth: 2,
    marginTop: hp(2),
    borderColor: colors.white
  },
  voteText: {
    color: colors.white,
    fontWeight: '500'
  },
  overviewText:{
    color:colors.white,
    alignSelf:'center',
    textAlign:'center',
    fontSize:13,
    width:wp(80)
  },
  noData:{
    flex:1, 
    justifyContent:'center', 
    alignSelf:'center'
  },
  noDataText:{
    color:colors.black, 
    fontWeight:'500', 
    fontSize:18,
    textAlign:'center',
    marginHorizontal:wp(16)
  }
})