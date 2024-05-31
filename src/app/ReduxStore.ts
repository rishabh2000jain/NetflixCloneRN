import {configureStore} from '@reduxjs/toolkit';
import {AppReducers} from './AppReducer';

import BookmarkReducers from './BookmarksReducer';
import VideosReducer from './VideosReducer';

const store = configureStore({
  reducer: {
    bookmark: BookmarkReducers,
    application: AppReducers,
    videos:VideosReducer
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
