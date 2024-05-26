import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors} from '../util/AppColors';

const LibraryListItem = ({libraryName}: {libraryName:string}) => {
  return (
    <View style={styles.bookmarkListItem}>
      <Text style={styles.bookmarkListItemText}>{libraryName}</Text>
    </View>
  );
};

export default LibraryListItem;

const styles = StyleSheet.create({
  bookmarkListItem: {
    backgroundColor: AppColors.secondary,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bookmarkListItemText: {
    color: AppColors.onBackground,
    fontSize: 20,
    fontWeight: '600',
    marginStart: 16,
  },
});
