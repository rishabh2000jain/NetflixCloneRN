import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firebase from '@react-native-firebase/app';
import {credentials} from '../FirebaseCreds';

import {
  checkUserAuth,
  showOnBoardingScreen,
} from '../authentication/AuthenticationController';
import {ApiStates} from '../util/ApiResponse';
type AppStateType = {
  isLoggedIn: boolean;
  showOnBoardingScreen: boolean;
  initAppState: ApiStates;
};

const initialState: AppStateType = {
  isLoggedIn: false,
  showOnBoardingScreen: false,
  initAppState: 'loading',
};

const AppSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.user!=null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(initialApplicationState.fulfilled, (state, action) => {
        state.showOnBoardingScreen = action.payload.showOnBoardingScreen;
        state.isLoggedIn = action.payload.user!=null;
        state.initAppState = 'success';
      })
      .addCase(initialApplicationState.pending, (state, action) => {
        state.initAppState = 'loading';
      })
      .addCase(initialApplicationState.rejected, (state, action) => {
        state.showOnBoardingScreen = false;
        state.isLoggedIn = false;
        state.initAppState = 'error';
      });
  },
});

export const checkAuthStatus = createAsyncThunk(
  'check-auth-status',
  async (data, thunkApi) => {
    const response = await checkUserAuth();
    return thunkApi.fulfillWithValue({
      user: response?.toJSON(),
    });
  },
);

export const initialApplicationState = createAsyncThunk(
  'check-initial-app-state',
  async (data, thunkApi) => {
    if(firebase.apps.length == 0){
    await firebase.initializeApp(credentials);
    }
    const response = await Promise.all([
      showOnBoardingScreen(),
      checkUserAuth()
    ]);    
    return thunkApi.fulfillWithValue({
      showOnBoardingScreen: response[0],
      user: response[1]?.toJSON(),
    });
  },
);


export const AppReducers = AppSlice.reducer;