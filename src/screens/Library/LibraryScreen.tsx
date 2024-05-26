import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
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

type Props = NativeStackScreenProps<BottomTabsParamList, 'Library'>;

const LibraryScreen = ({navigation, route}: Props) => {
  const librarySelector = useAppSelector(state => state.bookmark);
  const libraryDispature = useAppDispatch();

  useEffect(() => {
    if (
      librarySelector.loadBookmarkState == 'none' ||
      librarySelector.loadBookmarkState == 'error'
    ) {
      libraryDispature(getBookmarks());
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../images/Logonetflix.png')}
        style={styles.netflixLogo}
      />
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
            contentContainerStyle={{marginTop: 20}}
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
                  <LibraryListItem libraryName={item.name} />
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
});
