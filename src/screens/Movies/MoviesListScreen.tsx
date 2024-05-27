import {ActivityIndicator, Button, StyleSheet, Text, View,FlatList} from 'react-native';
import React, {useEffect, useReducer, Reducer} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../routes/RouteParamList';
import {getSavedMoviesList, removeSavedMovie} from './MoviesController';
import {MovieListItemType} from '../Library/type';
import {AppColors} from '../../util/AppColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import MovieListItem from '../../components/MovieListItem';
import EmptyListComponent from '../search/widgets/EmptyListComponent';

type Props = NativeStackScreenProps<AppStackParamList, 'MoviesList'>;
type MoviesListState = {
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  movies?: MovieListItemType[];
};
type MoviesListAction =
  | {type: 'loading'}
  | {type: 'success'; movies: MovieListItemType[]}
  | {type: 'error'};
const initialState: MoviesListState = {};

const movieListReducer = (
  state: MoviesListState,
  action: MoviesListAction,
): MoviesListState => {
  switch (action.type) {
    case 'error': {
      return {error: true};
    }
    case 'loading': {
      return {loading: true};
    }
    case 'success': {
      return {success: true, movies: action.movies};
    }
    default: {
      return state;
    }
  }
};

const MoviesListScreen = ({navigation, route}: Props) => {
  const [moviesListState, dispatch] = useReducer<
    Reducer<MoviesListState, MoviesListAction>,
    MoviesListState
  >(movieListReducer, initialState, () => initialState);

  const getMovies = () => {
    dispatch({type: 'loading'});
    getSavedMoviesList(route.params.id)
      .then(movies => {
        dispatch({type: 'success', movies});
      })
      .catch(e => {
        dispatch({type: 'error'});
      });
  };

  const removeMovies = (movieId: string) => {
    dispatch({type: 'loading'});
    removeSavedMovie(route.params.id, movieId)
      .then(movies => {
        dispatch({type: 'success', movies});
      })
      .catch(e => {
        dispatch({type: 'error'});
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
      headerBackTitle: 'Library',
      headerTitleStyle: {
        color: AppColors.onBackground,
      },
      headerTintColor:AppColors.onBackground,
      fullScreenGestureEnabled:true,
      headerStyle: {
        backgroundColor: AppColors.background,
      },
    });

    getMovies();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {moviesListState.loading && (
        <ActivityIndicator
          color={AppColors.primary}
          style={styles.loaderStyle}
        />
      )}
      {moviesListState.success && (
        <FlatList
          style={{flex:1}}
          ItemSeparatorComponent={() => {
            return <View style={styles.movieListSeprator} />;
          }}
          contentContainerStyle={{paddingHorizontal:16}}
          data={moviesListState.movies}
          ListEmptyComponent={() => {
            return <EmptyListComponent text="No Movies Available" />;
          }}
          renderItem={({item}: {item: MovieListItemType}) => {
            return (
              <MovieListItem
                id={item.imdbID}
                image={item.Poster}
                title={item.Title}
                showRemove
                onRemove={id => {
                  removeMovies(id);
                }}
              />
            );
          }}
        />
      )}
      {moviesListState.error && (
        <Button title="Refresh" onPress={getMovies} color={AppColors.primary} />
      )}
    </SafeAreaView>
  );
};

export default MoviesListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background,
    flex: 1,
  },
  loaderStyle: {
    flex: 1,
  },
  movieListSeprator: {
    height: 9,
  },
});
