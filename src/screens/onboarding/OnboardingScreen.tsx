import { TouchableOpacity, Image, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import React, { FunctionComponent, useRef, useState } from 'react';
import OnboardingPageComponent from './OnboardingPageComponent';
import StorageKeys,{setValue,getValue} from '../../util/AppDBStorage'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/NavigationParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen = ({navigation}:Props) => {

  const [currentPage, setCurrentPage] = useState(0);
  const viewPager = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;
  const onNextButtonTap = () => {
    if (currentPage > 2) {
      setValue({key:StorageKeys.onboardingShown,value:'true'});
      navigation.replace('Login');
      return;
    }
    viewPager.current?.scrollTo({ x: (currentPage + 1) * screenWidth, y: 0, animated: true });
  };

  const showBgImage = () => {
    return currentPage == 3;
  }
  
  return (
    <View style={styles.container}>
      {showBgImage() ?
        <Image source={require('../../images/Onboarding4.jpeg')} style={styles.largeImage} /> :
        null}
      {showBgImage() ? <View style={{
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
      }} /> : null}
      <View style={styles.body}>
        <View style={styles.header}>
          <Image source={require('../../images/Logonetflix.png')} style={styles.netflixIcon} />
        </View>
        <ScrollView
          style={{ flex: 1 }}
          scrollEnabled
          horizontal={true}
          pagingEnabled={true}
          ref={viewPager}
          onScroll={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x;
            setCurrentPage(Math.ceil(offsetX / screenWidth));
          }}>
          <OnboardingPageComponent 
            image={require('../../images/Onboarding1.png')}
            title='Watch on any device'
            subtitle='Stream on your phone, tablet, laptop and TV without playing more'
          />
          <OnboardingPageComponent 
            image={require('../../images/Onboarding2.png')}
            title='3, 2, 1,... download!'
            subtitle='Always have something to Watch offline.'
          />
          <OnboardingPageComponent 
            image={require('../../images/Onboarding3.png')}
            title='No pesky contracts.'
            subtitle='cancel anytime'
          />
          <OnboardingPageComponent
            title='How do I watch?'
            subtitle='Members that subscribe to Netflix can watch here in the app'
          />
        </ScrollView>
        <View style={styles.pagerIndicatorGroup}>
          {
            [0, 1, 2, 3].map((e) => {
              return <View key={e}
                style={[styles.pagerIndicator,
                e == currentPage ?
                  { backgroundColor: 'red' } :
                  {},
                ]} />
            })
          }
        </View>
        <TouchableOpacity style={styles.button} onPress={onNextButtonTap}>
          <Text style={styles.buttonText}>{currentPage == 3 ? 'Done' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  body: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 60,
    zIndex: 3
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  largeImage: {
    height: '100%',
    width: '100%',
  },
  netflixIcon: {
    height: 40,
    width: 130,
  },
  button: {
    backgroundColor: 'red',
    height: 32,
    left: 10,
    right: 10,
    marginBottom: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pagerIndicator: {
    height: 8,
    width: 8,
    backgroundColor: '#cccccc',
    borderRadius: 16,
  },
  pagerIndicatorGroup: {
    flexDirection: 'row',
    width: 100,
    height: 20,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginBottom: 30
  }
});

export default OnboardingScreen;