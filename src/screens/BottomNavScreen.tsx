import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './home/HomeScreen';
import {AppStackParamList} from '../routes/RouteParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {AppColors} from '../util/AppColors';
import AccountsScreen from './account/AccountsScreen';
import {BottomTabsParamList} from '../routes/RouteParamList';
import LibraryScreen from './Library/LibraryScreen';


const Tab = createBottomTabNavigator<BottomTabsParamList>();
type Params = NativeStackScreenProps<AppStackParamList, 'BottomNav'>;

const BottomNavScreen = ({navigation}: Params) => {
  return (
    <View style={{flex: 1,backgroundColor:AppColors.modalBackground}}>
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: AppColors.primary,
        tabBarInactiveTintColor: AppColors.onBackground,
        tabBarAllowFontScaling: true,
        tabBarStyle: {
          backgroundColor: AppColors.modalBackground,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarIcon: ({color, focused, size}) => {
          let iconName = '';
          switch (route.name) {
            case 'Reels':
              iconName = 'video';
              break;
            case 'Library':
              iconName = 'book';
              break;
            case 'Account':
              iconName = 'user';
              break;
            default: {
              return <></>;
            }
          }

          return <Icon name={iconName} size={18} color={color} />;
        },
        tabBarLabel: ({color, focused, position, children}) => {
          const style = focused
            ? styles.focusedTextStyle
            : styles.unfocusedTextStyle;
          return <Text style={style}>{route.name}</Text>;
        },
      })}>
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen
        name="Reels"
        component={HomeScreen}
        options={{tabBarHideOnKeyboard: true,tabBarStyle:{display:'none'},unmountOnBlur:true}}
      />
      <Tab.Screen name="Account" component={AccountsScreen} />
    </Tab.Navigator>
    </View>
  );
};

export default BottomNavScreen;

const styles = StyleSheet.create({
  focusedTextStyle: {
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: '500',
  },
  unfocusedTextStyle: {
    fontSize: 12,
    color: AppColors.onBackground,
    fontWeight: '500',
  },
});
