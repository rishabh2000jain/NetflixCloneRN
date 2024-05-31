import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../routes/RouteParamList';
import WebView from 'react-native-webview';
import {AppColors} from '../../util/AppColors';

type AuthProps = NativeStackScreenProps<AppStackParamList, 'TermsAndCondition'>;
type AppProps = NativeStackScreenProps<AppStackParamList, 'TermsAndCondition'>;

const TermsAndCondition = ({navigation, route}: AppProps | AuthProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    navigation.setOptions({
      title: 'Terms And Condition',
      headerBackTitle: 'Back',
      headerTitleStyle: {
        color: AppColors.onBackground,
      },
      headerTintColor: AppColors.onBackground,
      headerStyle: {
        backgroundColor: AppColors.background,
      },
    });
  });

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'https://www.powerlook.in/terms-and-conditions'}}
        style={styles.webView}
        cacheEnabled
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
      {loading && (
        <ActivityIndicator
          color={AppColors.primary}
          size="large"
          style={styles.loader}
        />
      )}
    </View>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  webView: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
