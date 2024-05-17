import { View, Text, Button } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/NavigationParamList';


type Props = NativeStackScreenProps<RootStackParamList,'Home'>;

const HomeScreen = ({navigation}:Props) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='Logout' onPress={()=>{
        auth().signOut().then((e)=>{
          navigation.replace('Login');
        });
      }}/>
    </View>
  )
}

export default HomeScreen