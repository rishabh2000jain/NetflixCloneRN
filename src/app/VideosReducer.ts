import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchVideoList from '../screens/home/VideosController';
import { VideoType } from '../screens/home/VideoTypes';

type VideosState = {
  videos: VideoType[];
  loading: boolean;
  loadingMore: boolean;
  playingVideo?: number;
  mute: boolean;
};

const initialState: VideosState = {
  loading: true,
  loadingMore: false,
  mute: false,
  videos: [],
};

const VideosReducer = createSlice({
  name: 'Videos',
  reducers: {
    setPlayingVideo: (state, action) => {
      state.playingVideo = action.payload;
    },
    muteVideos: (state, action) => {
      state.mute = action.payload;
    }
  },
  initialState,
  extraReducers: builder => {
    builder
      .addCase(videosListThunk.pending, (state, action) => {
        if (state.videos.length == 0) {
          state.loading = true;
          state.loadingMore = false;
        } else {
          state.loading = false;
          state.loadingMore = true;
        }
      })
      .addCase(videosListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.videos = [...state.videos, ...action.payload];
      });
  },
});

const videosListThunk = createAsyncThunk('videos-list', async (data: any, thunk) => {
  const result = await fetchVideoList(data.pageNo, data.pageSize);
  return thunk.fulfillWithValue(result);
});

export default VideosReducer.reducer;
export const { setPlayingVideo, muteVideos } = VideosReducer.actions;
export { videosListThunk };