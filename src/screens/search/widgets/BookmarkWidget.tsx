import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../../util/AppColors';

const BookmarkWidget = () => {
  return (
    <View style={styles.newLibraryContainer}>
      <TextInput
        style={styles.newLibraryTextInput}
        onChangeText={text => {
          console.log(text);
        }}
        placeholderTextColor={AppColors.onModalBackground}
        placeholder="New Library Name"
      />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookmarkWidget;

const styles = StyleSheet.create({
  newLibraryContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 18,
    backgroundColor: AppColors.secondary,
  },
  newLibraryTextInput: {
    height: 50,
    flex: 3,
    color: AppColors.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    height: 35,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    color: AppColors.onPrimary,
    fontSize: 16,
    fontWeight: 'semibold',
  },
});
