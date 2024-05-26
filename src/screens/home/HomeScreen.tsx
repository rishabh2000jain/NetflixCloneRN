import { View, Text, Button,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon  from 'react-native-vector-icons/FontAwesome6';
import { BottomTabsParamList } from '../../routes/RouteParamList';
import { useAppDispatch } from '../../app/Hooks';
import { checkAuthStatus } from '../../app/AppReducer';



type Props = NativeStackScreenProps<BottomTabsParamList,'Home'>;

const HomeScreen = ({navigation}:Props) => {
  const appDispatcher = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <Image source={require('../../images/Logonetflix.png')} style={styles.netflixLogo}/>
      <TouchableOpacity onPress={()=>{
        navigation.getParent()?.navigate('Search');
      }}>
          <Icon name='magnifying-glass' color={'#FFFBFB'} size={20}/>
      </TouchableOpacity>
      </View>
      <Text>HomeScreen</Text>
      <Button title='Logout' onPress={()=>{
        auth().signOut().then((e)=>{
          appDispatcher(checkAuthStatus());
        });
      }}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black'
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingRight:24
  },
  netflixLogo:{
    height:30,
    width:124,
    resizeMode:'contain',
    paddingTop:12
  }
});

export default HomeScreen