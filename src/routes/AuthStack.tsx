import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import {AuthStackParamList} from './RouteParamList';

const headerParams = {
  headerShown: false,
  statusBarTranslucent: true,
  statusBarColor: 'transparent',
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack({
  showOnBoardingScreen,
}: {
  showOnBoardingScreen: boolean;
}) {
  return (
    <Stack.Navigator
      initialRouteName={showOnBoardingScreen ? 'Onboarding' : 'Login'}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={headerParams}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={headerParams}
      />
    </Stack.Navigator>
  );
}
