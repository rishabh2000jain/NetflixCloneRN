import React, { Reducer, useEffect, useReducer } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './util/NavigationParamList'
import { ScreenRouteNames } from './util/ScreenRouteNames';
import OnboardingScreen from './screens/onboarding/OnboardingScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StorageKeys, { setValue, getValue } from './util/AppDBStorage'
import { View } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppState {
  loading: boolean;
  showOnboarding: boolean;
};

type FetchAppStateType = {
  showOnboarding: boolean
};

type AppActions = | { type: 'updateAppState'; payload: FetchAppStateType } | { type: 'loading' };

const appInitialState: AppState = { loading: false, showOnboarding: false };

const appStateReducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case 'updateAppState': {
      return { loading: false, showOnboarding: action.payload.showOnboarding };
    };
    case 'loading': {
      return { loading: false, showOnboarding: false };
    }
    default:
      return state;
  }
};

function App(): React.JSX.Element {
  const [state, dispatch] = useReducer<Reducer<AppState, AppActions>, AppState>(
    appStateReducer,
    appInitialState,
    () => appInitialState,
  );
  useEffect(() => {
    const fetchAppState = async()=>{
      dispatch({type:'loading'});
      const shown = await getValue(StorageKeys.onboardingShown,'false');
      dispatch({type:'updateAppState',payload:{showOnboarding:shown=='false'}});
      SplashScreen.hide();
    };
    fetchAppState();
  }, []);

  if(state.loading){
    return (<View style={{backgroundColor:'black'}}/>);
  }

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ScreenRouteNames.Onboarding}>
          <Stack.Screen name={ScreenRouteNames.Onboarding}
            component={OnboardingScreen}
            options={{
              headerShown: false,
              statusBarTranslucent: true,
              statusBarColor: 'transparent'
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


export default App;
