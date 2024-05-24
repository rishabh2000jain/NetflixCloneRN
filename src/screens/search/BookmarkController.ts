import {firebase} from '@react-native-firebase/firestore';

export async function getBookmarkList(): Promise<any[]> {
  const snapshot = await firebase
    .firestore()
    .collection('Users')
    .doc(firebase.app().auth().currentUser?.uid)
    .collection('BookbarkLibrary')
    .get();
  return snapshot.docs.map(e => e.data());
}

export async function createLibraryToFirebase({
  libraryName,
}: {
  libraryName: string;
}): Promise<string | null> {
  const doc = firebase
    .firestore()
    .collection('Users')
    .doc(firebase.app().auth().currentUser?.uid)
    .collection('BookbarkLibrary')
    .doc();

  const snapshot1 = doc.set({
    id: doc.id,
    name: libraryName,
  });
  const snapshot2 = firebase
    .firestore()
    .collection('Bookmarks')
    .doc(doc.id)
    .set({movies: []});

  await Promise.all([snapshot1, snapshot2]);

  return doc.id;
}

export async function addMovieToLibrary({
  movie,
  libraryId,
}: {
  movie: any;
  libraryId: string;
}) {
  const snapshot = await firebase
    .firestore()
    .collection('Bookmarks')
    .doc(libraryId).get();

   await snapshot.ref.update({
      movies: [...(snapshot.data()??[]).movies,movie],
    });
}
