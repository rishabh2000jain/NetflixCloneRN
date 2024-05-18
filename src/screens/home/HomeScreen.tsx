import { View, Text, Button,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/NavigationParamList';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon  from 'react-native-vector-icons/FontAwesome6';


type Props = NativeStackScreenProps<RootStackParamList,'Home'>;

const HomeScreen = ({navigation}:Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <Image source={require('../../images/Logonetflix.png')} style={styles.netflixLogo}/>
      <TouchableOpacity onPress={()=>{
        navigation.push('Search');
      }}>
          <Icon name='magnifying-glass' color={'#FFFBFB'} size={20}/>
      </TouchableOpacity>
      </View>
      <Text>HomeScreen</Text>
      <Button title='Logout' onPress={()=>{
        auth().signOut().then((e)=>{
          navigation.replace('Login');
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