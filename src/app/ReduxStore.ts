import {configureStore} from '@reduxjs/toolkit';
import {AppReducers} from './AppReducer';

import BookmarkReducers from './BookmarksReducer';

const store = configureStore({
  reducer: {
    bookmark: BookmarkReducers,
    application: AppReducers,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
