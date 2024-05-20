import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Icon  from 'react-native-vector-icons/FontAwesome6';
import { AppColors } from '../../../util/AppColors';

type ComponentPropsType = {
  image: string ;
  title: string;
};

const MovieListItem = ({image, title}: ComponentPropsType) => {
  return (
    <View style={styles.movieListItem}>
      <FastImage 
      source = {{
          uri: image == 'N/A'
              ? 'https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg'
              : image,
          priority: FastImage.priority.normal,
        }}
        style={styles.movieListItemImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={styles.movieListItemTitle}>
        {title}
      </Text>
      <Icon name='bookmark' color={AppColors.onBackground} size={18}/>
    </View>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  movieListItem: {
    width: '100%',
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieListItemImage: {
    height: 72,
    width: 100,
    marginEnd: 8,
    resizeMode: 'contain',
  },
  movieListItemTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    flex: 1,
    textAlign: 'left',
  },
});
