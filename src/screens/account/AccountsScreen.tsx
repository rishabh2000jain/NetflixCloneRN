import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList, BottomTabsParamList} from '../../routes/RouteParamList';
import {AppColors} from '../../util/AppColors';

type Props = NativeStackScreenProps<BottomTabsParamList, 'Account'>;

const AccountsScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={styles.text}
        onPress={() => {
          navigation.getParent()?.navigate('TermsAndCondition');
        }}>
        Screen
      </Text>
    </SafeAreaView>
  );
};

export default AccountsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  text:{
    color:'white'
  }
});
