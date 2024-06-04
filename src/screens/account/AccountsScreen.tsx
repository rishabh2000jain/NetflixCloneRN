import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList, BottomTabsParamList } from '../../routes/RouteParamList';
import { AppColors } from '../../util/AppColors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useAppDispatch } from '../../app/Hooks';
import { checkAuthStatus } from '../../app/AppReducer';
type Props = NativeStackScreenProps<BottomTabsParamList, 'Account'>;

const AccountsScreen = ({ navigation }: Props) => {
  const [loadingLogout, setLoadingLogout] = useState(false);
  const {width} = Dimensions.get('window');
  const dispach = useAppDispatch();
  const buttonSharedValue = useSharedValue(0);
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    width: interpolate(buttonSharedValue.value, [0, 1], [width-24, 60]),
    borderRadius:interpolate(buttonSharedValue.value, [0, 1], [8, 30]),
  }));

  useEffect(() => {
    if (loadingLogout) {
      buttonSharedValue.value = withTiming(1, {duration:600});
    } else {
      buttonSharedValue.value = withTiming(0,{duration:600});
    }

  }, [loadingLogout]);

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={styles.text}
        onPress={() => {
          navigation.getParent()?.navigate('TermsAndCondition');
        }}>
        Screen
      </Text>
      <View style={{flex:1}}/>
      <TouchableOpacity
        onPress={() => {
          setLoadingLogout(true);
          auth().signOut().then(() => {
            dispach(checkAuthStatus());
            setLoadingLogout(false);
          });
        }}>
        <Animated.View style={[styles.logoutButton, buttonAnimatedStyle]}>
          {
            loadingLogout?<ActivityIndicator color={AppColors.onPrimary}/>:<Text style={styles.logoutButtonText}>Logout</Text>
          }
        </Animated.View>
      </TouchableOpacity>


    </SafeAreaView>
  );
};

export default AccountsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  text: {
    color: 'white'
  },
  logoutButton: {
    height: 60,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 12,
    alignSelf:'center'
  },
  logoutButtonText: {
    color: AppColors.onPrimary,
    fontWeight: '500',
    fontSize: 18
  }
});
