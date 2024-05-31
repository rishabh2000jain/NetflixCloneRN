import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/Hooks';
import {getBookmarks} from '../../app/BookmarksReducer';
import {AppColors} from '../../util/AppColors';
import LibraryListItem from '../../components/LibraryListItem';
import EmptyListComponent from '../search/widgets/EmptyListComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabsParamList} from '../../routes/RouteParamList';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { videosListThunk } from '../../app/VideosReducer';

type Props = NativeStackScreenProps<BottomTabsParamList, 'Library'>;

const LibraryScreen = ({navigation, route}: Props) => {
  const librarySelector = useAppSelector(state => state.bookmark);
  const dispature = useAppDispatch();
  const videoSelector = useAppSelector(state=>state.videos.videos);

  useEffect(() => {
    if (
      librarySelector.loadBookmarkState == 'none' ||
      librarySelector.loadBookmarkState == 'error'
    ) {
      dispature(getBookmarks());
    }
    if(videoSelector.length == 0){      
      dispature(videosListThunk({pageNo:1,pageSize:10}));
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../images/Logonetflix.png')}
          style={styles.netflixLogo}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.getParent()?.navigate('Search');
          }}>
          <Icon name="magnifying-glass" color={'#FFFBFB'} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {librarySelector.loadBookmarkState == 'loading' && (
          <ActivityIndicator
            style={styles.loaderStyle}
            color={AppColors.primary}
          />
        )}
        {librarySelector.loadBookmarkState == 'error' && (
          <Text style={styles.errorTextStyle}>{librarySelector.extra}</Text>
        )}
        {librarySelector.loadBookmarkState == 'success' && (
          <FlatList
            contentContainerStyle={{marginTop: 20, gap: 9}}
            data={librarySelector.bookmarks}
            ListEmptyComponent={() => {
              return <EmptyListComponent text="No library found!" />;
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation
                      .getParent()
                      ?.navigate('MoviesList', {id: item.id, name: item.name});
                  }}>
                  <LibraryListItem key={item.id} libraryName={item.name} />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  content: {
    flex: 1,
  },
  netflixLogo: {
    height: 30,
    width: 124,
    resizeMode: 'contain',
    paddingTop: 12,
  },
  errorTextStyle: {
    color: AppColors.onBackground,
    fontSize: 20,
    fontWeight: '600',
  },
  loaderStyle: {
    alignSelf: 'center',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 24,
  },
});
