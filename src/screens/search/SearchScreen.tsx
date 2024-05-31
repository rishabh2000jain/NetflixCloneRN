import {
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../routes/RouteParamList';
import SearchWidget from './widgets/SearchWidget';
import {useDebounce} from '../../util/Debounce';
import {searchMovieByTitle} from './SearchController';
import {PagingType} from '../../util/PagingType';
import MovieListItem from '../../components/MovieListItem';
import {FlashList} from '@shopify/flash-list';
import EmptyListComponent from './widgets/EmptyListComponent';
import BottomSheetModal from '../../components/BottomSheetModal';
import BookmarkWidget from './widgets/BookmarkWidget';
import { AppColors } from '../../util/AppColors';

type Props = NativeStackScreenProps<AppStackParamList, 'Search'>;


const SearchScreen = ({navigation, route}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [showBookmarkModal, setShowBookmarkModal] = useState<boolean>(false);
  const [bookmarkItem, setBookmarkItem] = useState<any>();
  const [searchData, setSearchData] = useState<Array<any>>([]);
  const pagingData = useRef<PagingType>({nextPageKey: 1, currPageKey: null});

  useEffect(() => {
    navigation.setOptions({
      title: 'Search',
      headerBackTitle: 'Back',
      headerTitleStyle: {
        color: AppColors.onBackground,
      },
      headerTintColor: AppColors.onBackground,
      headerStyle: {
        backgroundColor: AppColors.background,
      },
    });
  });

  const searchMovies = async (title: string) => {
    const data = await searchMovieByTitle(
      title,
      pagingData.current.nextPageKey,
    );
    if (data.success) {
      const currPage = pagingData.current.nextPageKey;
      if (data.success.length > 0) {
        pagingData.current = {
          nextPageKey: pagingData.current.nextPageKey + 1,
          currPageKey: pagingData.current.nextPageKey,
          data: title,
        };
      } else {
        pagingData.current = {
          nextPageKey: null,
          currPageKey: pagingData.current.nextPageKey,
          data: title,
        };
      }
      setSearchData(prev => {
        if (currPage == 1) {
          return data.success;
        }
        return [...prev, ...data.success];
      });
    } else if (pagingData.current.nextPageKey == 1) {
      setSearchData([]);
    }
  };

  const {debounce} = useDebounce({
    onStart: () => {
      setSearchData([]);
      setLoading(true);
    },
    onComplete: data => {
      pagingData.current = {
        nextPageKey: 1,
        currPageKey: null,
      };
      searchMovies(data).then(data => {
        setLoading(false);
      });
    },
    key: 'movie-search-debounce',
    time: 700,
  });

  return (
    <View style={styles.container}>
      <SearchWidget
        onTextChange={text => {
          setLoading(true);
          debounce(text);
        }}
      />
      <View style={styles.movieList}>
        <FlashList
          estimatedItemSize={72}
          contentContainerStyle={{paddingBottom: 40}}
          data={searchData}
          scrollEventThrottle={20}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={'on-drag'}
          ListEmptyComponent={() => {
            return <EmptyListComponent text="No data found!" />;
          }}
          onEndReachedThreshold={0.3}
          ItemSeparatorComponent={() => {
            return <View style={styles.movieListSeprator} />;
          }}
          ListFooterComponent={() => {
            return loadingMore ? (
              <ActivityIndicator color={'red'} size={'large'} />
            ) : null;
          }}
          onEndReached={() => {
            if (
              loadingMore ||
              pagingData.current.nextPageKey == null ||
              pagingData.current.currPageKey == null
            ) {
              return;
            }
            setLoadingMore(true);
            searchMovies(pagingData.current.data ?? '').then(data => {
              setLoadingMore(false);
            });
          }}
          renderItem={({item}) => {
            return (
              <MovieListItem
                id={item.imdbID}
                image={item.Poster}
                title={item.Title}
                onBookmark={id => {
                  setBookmarkItem(item);
                  setShowBookmarkModal(true);
                }}
              />
            );
          }}
        />
      </View>
      {showBookmarkModal && (

        <BottomSheetModal
          isOpen={showBookmarkModal}
          setIsOpen={setShowBookmarkModal}
          title='Bookmark'
          >
            <BookmarkWidget movie={bookmarkItem}  setIsOpen={setShowBookmarkModal}/>
        </BottomSheetModal>
      )}
      {loading ? (
        <ActivityIndicator color={'red'} size={'large'} style={styles.loader} />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1000,
  },
  movieList: {
    flex: 1,
    marginHorizontal: 9,
    marginTop: 20,
  },
  movieListSeprator: {
    height: 9,
  },
});

export default SearchScreen;
