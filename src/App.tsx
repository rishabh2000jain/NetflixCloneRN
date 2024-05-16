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
import LoginScreen from './screens/login/LoginScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import HomeScreen from './screens/home/HomeScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppState {
  loading: boolean;
  showOnboarding: boolean;
  user?: FirebaseAuthTypes.User | null;
};

type AppActions = | { type: 'updateAppState'; user: FirebaseAuthTypes.User | null, showOnboarding: boolean} | { type: 'loading' } | { type: 'userAuthChanged',user: FirebaseAuthTypes.User | null };

const appInitialState: AppState = { loading: false, showOnboarding: false ,};

const appStateReducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case 'updateAppState': {
      return { loading: false, showOnboarding: action.showOnboarding,user:action.user};
    };
    case 'userAuthChanged': {
      return { ...state, user:action.user};
    }
    case 'loading': {
      return { loading: false, showOnboarding: false };
    }
    default:
      return state;
  }
};

const headerParams = {
  headerShown: false,
};
const credentials = {
  clientId: '',
  appId: '1:361672344306:android:c4695642dab64e5705866b',
  apiKey: 'AIzaSyAnDj8UpChcBdDZ0hVsFSlXr1zh828dgDs',
  databaseURL: '',
  storageBucket: 'rninstaclone-3b49b.appspot.com',
  messagingSenderId: '',
  projectId: 'rninstaclone-3b49b',
};

function App(): React.JSX.Element {
  const [state, dispatch] = useReducer<Reducer<AppState, AppActions>, AppState>(
    appStateReducer,
    appInitialState,
    () => appInitialState,
  );
  const onAuthStateChanged = (user:FirebaseAuthTypes.User|null) => {
    dispatch({ type: 'userAuthChanged', user: auth().currentUser });
  }
  useEffect(() => {
    const fetchAppState = async () => {
      if(firebase.apps.length==0){
        await firebase.initializeApp(credentials).catch((e)=>{});
      }
      dispatch({ type: 'loading' });
      const shown = await getValue(StorageKeys.onboardingShown, 'false');
      dispatch({ type: 'updateAppState', showOnboarding: shown == 'false', user: auth().currentUser });
      auth().onAuthStateChanged((user)=>{
        onAuthStateChanged(user);
      });
      SplashScreen.hide();
    };
    fetchAppState();
  }, []);

  const getInitialRoute = ()=>{
    if(state.user){
      return ScreenRouteNames.Home
    }
    if(state.showOnboarding){
      return ScreenRouteNames.Onboarding; 
    }
    return ScreenRouteNames.Login; 
  };

  if (state.loading) {
    return (<View style={{ backgroundColor: 'black' }} />);
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={getInitialRoute()}>
            <Stack.Screen name={ScreenRouteNames.Onboarding}
              component={OnboardingScreen}
              options={{
                ...headerParams,
                statusBarTranslucent: true,
                statusBarColor: 'transparent'
              }} />
            <Stack.Screen name={ScreenRouteNames.Login}
              component={LoginScreen}
              options={{
                ...headerParams,
                statusBarTranslucent: true,
                statusBarColor: 'transparent'
              }} />
              <Stack.Screen name={ScreenRouteNames.Home}
              component={HomeScreen}
              options={headerParams} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}


export default App;
