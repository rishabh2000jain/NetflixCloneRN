import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getBookmarkList,createLibraryToFirebase,addMovieToLibrary} from '../screens/search/BookmarkController';


type ApiStates = 'loading'|'error'|'success'|'none';

type BookmarksState = {
  loadBookmarkState: ApiStates;
  createLibraryState: ApiStates;
  bookmarks: any[];
  extra?:any|null;
};

const initialState: BookmarksState = {
  bookmarks: [],
  loadBookmarkState:'none',
  createLibraryState:'none',
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
    builder
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.loadBookmarkState = 'success';
        state.bookmarks = action.payload;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.loadBookmarkState = 'error';
        state.extra = action.error.message;
      })
      .addCase(getBookmarks.pending, (state, action) => {
        state.loadBookmarkState = 'loading';
      }).addCase(createLibrary.pending, (state, action) => {
        state.createLibraryState = 'loading';
      }).addCase(createLibrary.fulfilled, (state, action) => {
        state.createLibraryState = 'success';
      }).addCase(createLibrary.rejected, (state, action) => {
        state.createLibraryState = 'error';
        state.extra = action.payload;
      }).addCase(addMovie.fulfilled, (state, action) => {
          state.createLibraryState = 'none';
      });
  },
});

const createLibrary = createAsyncThunk('bookmarks/add-library', async (data:any, thunk) => {  
  const libraryId = await createLibraryToFirebase({libraryName:data.libraryName});
  if(libraryId == null){
    return thunk.rejectWithValue('Failed to create library');
  }else{
    thunk.dispatch(addMovie({movie:data.movie,libraryId}));
  }
});

const getBookmarks = createAsyncThunk('bookmarks/get', async (data, thunk) => {
    const bookmarks = await getBookmarkList();
    return thunk.fulfillWithValue(bookmarks);
});

const addMovie = createAsyncThunk('bookmarks/add-movie', async (data:any, thunk) => {
  const bookmarks = await addMovieToLibrary({movie:data.movie,libraryId:data.libraryId});
   thunk.fulfillWithValue(bookmarks);
   thunk.dispatch(getBookmarks());
});

export {createLibrary, getBookmarks,addMovie};
export default bookmarkSlice.reducer;
