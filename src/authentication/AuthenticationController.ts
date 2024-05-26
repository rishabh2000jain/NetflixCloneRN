import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import StorageKeys, {setValue, getValue} from '../util/AppDBStorage';

export const checkUserAuth =
  async (): Promise<FirebaseAuthTypes.User | null> => {
    return auth().currentUser;
  };
export const showOnBoardingScreen = async (): Promise<boolean> => {
  const shown = await getValue(StorageKeys.onboardingShown, 'false');
  return shown == 'false';
};
