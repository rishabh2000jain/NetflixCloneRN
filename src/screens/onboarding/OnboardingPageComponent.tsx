import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {FunctionComponent} from 'react';

type OnboardingPageProps = {
  image?: object;
  title: string;
  subtitle: string;
};

const OnboardingPageComponent: FunctionComponent<OnboardingPageProps> = ({
  image,
  title,
  subtitle,
}) => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={{width: screenWidth}}>
      {image ? (
        <Image source={image} style={styles.centerImage} />
      ) : (
        <View style={styles.centerImage} />
      )}
      <Text style={styles.componentTitle}>{title}</Text>
      <Text style={styles.componentSubTitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  componentTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  componentSubTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#cccccc',
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 50,
  },
  centerImage: {
    height: '40%',
    minHeight: 150,
    width: 'auto',
    marginTop: 71,
    resizeMode: 'contain',
    marginHorizontal: 69,
  },
});

export default OnboardingPageComponent;
