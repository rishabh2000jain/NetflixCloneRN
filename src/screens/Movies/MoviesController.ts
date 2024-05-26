import {firebase} from '@react-native-firebase/firestore';
import {MovieListItemType} from '../Library/type';

export async function getSavedMoviesList(
  libraryId: string,
): Promise<MovieListItemType[]> {
  const snapshot = await firebase
    .firestore()
    .collection('Bookmarks')
    .doc(libraryId)
    .get();
  return (snapshot.data()?.movies ?? []) as MovieListItemType[];
}


export async function removeSavedMovie(
  libraryId: string,
  movieImdbId: string,
): Promise<MovieListItemType[]> {
  const movies = await getSavedMoviesList(libraryId);
  const updatedMovieList = movies.filter((movie)=>movie.imdbID!=movieImdbId);
  await firebase
    .firestore()
    .collection('Bookmarks')
    .doc(libraryId)
    .update({
      movies:updatedMovieList
    });
  return updatedMovieList;
}
