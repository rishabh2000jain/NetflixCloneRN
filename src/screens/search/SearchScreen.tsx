import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/NavigationParamList';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchWidget from './SearchWidget';
import Icon from 'react-native-vector-icons/FontAwesome6'
import { useEffect } from 'react';
import { DebounceContext, useDebounce } from '../../util/Debounce';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {debounce} = useDebounce({
    onComplete: (data) => {
      console.log('====================================');
      console.log('debounce called',data);
      console.log('====================================');
      setLoading(false);
    },
    key: 'movie-search-debounce',
    time: 1000
  });
  
  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => {
          navigation.pop();
        }}>
          <Icon name='arrow-left' size={24} color={'white'} style={styles.backButton} />
        </TouchableOpacity>
        <SearchWidget onTextChange={(text)=>{
          setLoading(true);
          debounce(text);
        }} />
        {loading ? <ActivityIndicator color={'red'} size={'large'} style={styles.loader} /> : <></>}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backButton: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  }
});

export default SearchScreen;