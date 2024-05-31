import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomNavScreen from '../screens/BottomNavScreen';
import MoviesListScreen from '../screens/Movies/MoviesListScreen';
import TermsAndCondition from '../screens/public/TermsAndCondition';
import SearchScreen from '../screens/search/SearchScreen';
import { AppColors } from '../util/AppColors';
import {AppStackParamList} from './RouteParamList';

const Stack = createNativeStackNavigator<AppStackParamList>();

const headerParams = {
  headerShown: false,
  statusBarTranslucent: true,
  statusBarColor: 'transparent',
  navigationBarColor:AppColors.background
};

export function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={'BottomNav'}
      screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{...headerParams,headerShown: true}}
      />
      <Stack.Screen
        name="BottomNav"
        component={BottomNavScreen}
        options={headerParams}
      />
      <Stack.Screen
        name="MoviesList"
        component={MoviesListScreen}
        options={{...headerParams,headerShown: true}}
      />
      <Stack.Screen
        name="TermsAndCondition"
        component={TermsAndCondition}
        options={{...headerParams, headerShown: true}}
      />
    </Stack.Navigator>
  );
}
