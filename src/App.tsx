import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './util/NavigationParamList'
import { ScreenRouteNames } from './util/ScreenRouteNames';
import OnboardingScreen from './screens/onboarding/OnboardingScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Stack = createNativeStackNavigator<RootStackParamList>();



function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenRouteNames.Onboarding}>
        <Stack.Screen name={ScreenRouteNames.Onboarding}
          component={OnboardingScreen}
          options={{
            headerShown: false,
            statusBarTranslucent:true,
            statusBarColor:'transparent'
          }} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}


export default App;
