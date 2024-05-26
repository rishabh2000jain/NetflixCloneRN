import {firebase} from '@react-native-firebase/firestore';
import {MovieListItemType} from './type';

export const getLibraryMovies = async (
  libraryId: string,
): Promise<MovieListItemType[]> => {
  const snapshot = await firebase
    .firestore()
    .collection('Bookmarks')
    .doc(libraryId)
    .get();
  return snapshot.data() as MovieListItemType[];
};

export const removeMovie = async (
  libraryId: string,
  imdbId: string,
): Promise<boolean> => {
  try {
    const movies = await getLibraryMovies(libraryId);
    const filteredMovies = movies.filter(e => e.imdbID != imdbId);
    return await updateMovies(libraryId,filteredMovies);
  } catch (e) {
    console.error(e);
  }
  return false;
};

export const updateMovies = async (
  libraryId: string,
  movies: MovieListItemType[],
): Promise<boolean> => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection('Bookmarks')
      .doc(libraryId)
      .update({
        movies,
      });
    return true;
  } catch (e) {
      console.error(e);
  }
  return false;
};
