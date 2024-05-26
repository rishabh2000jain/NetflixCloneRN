import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomNavScreen from '../screens/BottomNavScreen';
import MoviesListScreen from '../screens/Movies/MoviesListScreen';
import SearchScreen from '../screens/search/SearchScreen';
import {AppStackParamList} from './RouteParamList';

const Stack = createNativeStackNavigator<AppStackParamList>();

const headerParams = {
  headerShown: false,
  statusBarTranslucent: true,
  statusBarColor: 'transparent',
};

export function AppStack() {
  return (
    <Stack.Navigator initialRouteName={'BottomNav'}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={headerParams}
      />
      <Stack.Screen
        name="BottomNav"
        component={BottomNavScreen}
        options={headerParams}
      />
      <Stack.Screen name="MoviesList" component={MoviesListScreen} />
    </Stack.Navigator>
  );
}
