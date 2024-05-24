import {configureStore} from '@reduxjs/toolkit';

import BookmarkReducers from './BookmarksReducer';

const store = configureStore({
  reducer: {
    bookmark: BookmarkReducers,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
