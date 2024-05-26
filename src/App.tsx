import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ActivityIndicator, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DebounceContext} from './util/Debounce';
import {useAppDispatch, useAppSelector} from './app/Hooks';
import {initialApplicationState} from './app/AppReducer';
import SplashScreen from 'react-native-splash-screen';
import {AppStack} from './routes/AppStack';
import {AppColors} from './util/AppColors';
import {AuthStack} from './routes/AuthStack';

function App(): React.JSX.Element {
  const appDispatcher = useAppDispatch();
  const appSelector = useAppSelector(state => state.application);

  useEffect(() => {
    appDispatcher(initialApplicationState());
  }, []);

  useEffect(() => {
    if (appSelector.initAppState != 'loading') {
      SplashScreen.hide();
    }
  }, [appSelector.initAppState]);

  if (appSelector.initAppState == 'loading') {
    return (
      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={AppColors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <DebounceContext.Provider value={new Map()}>
        <GestureHandlerRootView>
          <NavigationContainer>
            {appSelector.isLoggedIn ? (
              <AppStack />
            ) : (
              <AuthStack
                showOnBoardingScreen={appSelector.showOnBoardingScreen}
              />
            )}
          </NavigationContainer>
        </GestureHandlerRootView>
      </DebounceContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;
