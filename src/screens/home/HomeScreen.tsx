import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import {BottomTabsParamList} from '../../routes/RouteParamList';
import VideoList from './components/VideoList';


type Props = NativeStackScreenProps<BottomTabsParamList, 'Home'>;
const HomeScreen = ({navigation}: Props) => {
  return (
      <View style={styles.container}>
        <VideoList/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default HomeScreen;
