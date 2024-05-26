import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AppColors} from '../../../util/AppColors';
import {
  getBookmarks,
  createLibrary,
  addMovie,
} from '../../../app/BookmarksReducer';
import {useAppDispatch, useAppSelector} from '../../../app/Hooks';
import EmptyListComponent from './EmptyListComponent';
import LibraryListItem from '../../../components/LibraryListItem';

const BookmarkWidget = ({
  movie,
  setIsOpen,
}: {
  movie: any;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const dispature = useAppDispatch();
  const bookmarkLibrarySelector = useAppSelector(state => state.bookmark);
  const [libraryName, setLibraryName] = useState<string>();
  const screehHeight = Dimensions.get('window').height;
  useEffect(() => {
    if (['none', 'error'].includes(bookmarkLibrarySelector.loadBookmarkState)) {
      dispature(getBookmarks());
    }
  }, []);

  useEffect(() => {
    if (
      bookmarkLibrarySelector.createLibraryState == 'success'
    ) {
      setLibraryName('');
      setIsOpen(false);
    }
  }, [
    bookmarkLibrarySelector.createLibraryState,
  ]);

  return (
    <View style={{height: screehHeight * 0.5}}>
      <View style={styles.newLibraryContainer}>
        <TextInput
          style={styles.newLibraryTextInput}
          value={libraryName}
          onChangeText={text => {
            setLibraryName(text);
          }}
          placeholderTextColor={AppColors.onModalBackground}
          placeholder="New Library Name"
          cursorColor={AppColors.onBackground}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            dispature(createLibrary({movie, libraryName: libraryName}));
          }}>
          {bookmarkLibrarySelector.createLibraryState == 'loading' ? (
            <ActivityIndicator color={AppColors.onPrimary} />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
      {bookmarkLibrarySelector.loadBookmarkState == 'loading' && (
        <ActivityIndicator />
      )}
      {bookmarkLibrarySelector.loadBookmarkState == 'error' && (
        <Text>{bookmarkLibrarySelector.extra}</Text>
      )}
      {bookmarkLibrarySelector.loadBookmarkState == 'success' && (
        <FlatList
          contentContainerStyle={{paddingTop: 16, gap: 8}}
          data={bookmarkLibrarySelector.bookmarks}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  dispature(addMovie({movie, libraryId: item.id}));
                  setIsOpen(false);
                }}>
                <LibraryListItem libraryName={item.name}/>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <EmptyListComponent text="No Library found!Please add one." />
            );
          }}
        />
      )}
    </View>
  );
};

export default BookmarkWidget;

const styles = StyleSheet.create({
  newLibraryContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 18,
    backgroundColor: AppColors.secondary,
  },
  newLibraryTextInput: {
    height: 50,
    flex: 3,
    color: AppColors.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    height: 35,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    color: AppColors.onPrimary,
    fontSize: 16,
    fontWeight: 'semibold',
  }
});
function ApiState(ApiState: any) {
  throw new Error('Function not implemented.');
}
