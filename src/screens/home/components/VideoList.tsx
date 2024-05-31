import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import VideoComponent from './VideoComponent';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { AppColors } from '../../../util/AppColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { FlashList } from '@shopify/flash-list';
import { setPlayingVideo, videosListThunk } from '../../../app/VideosReducer';

const { height } = Dimensions.get('screen');
const VideoList = () => {
  const insets = useSafeAreaInsets();
  const navigator = useNavigation();
  const videoSelector = useAppSelector(state => state.videos);
  const dispach = useAppDispatch();

  const loadNextPage = () => {
    dispach(videosListThunk({ pageNo: (videoSelector.videos.length / 10) + 1, pageSize: 10 }));
  };

  return (
    <View style={styles.container}>
      {(!videoSelector.loading) && (
        <FlashList
          estimatedItemSize={height}
          data={videoSelector.videos}
          pagingEnabled
          onEndReached={() => {
            if(videoSelector.loadingMore){
              return;
            }
            loadNextPage();
          }}
          onEndReachedThreshold={0.8}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return videoSelector.loadingMore ? <ActivityIndicator color={AppColors.primary} size={'large'} style={{marginBottom:30}}/> : <></>
          }}
          onViewableItemsChanged={info => {
            if (info.viewableItems[0]?.index == null || info.viewableItems[0].index == videoSelector.playingVideo) {
              return;
            }
            dispach(setPlayingVideo(info.viewableItems[0].index));
          }}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 90,
            minimumViewTime: 200,
          }}
          renderItem={({ item, index }) => {
            return (
              <VideoComponent
                index={index}
                video={item}
              />
            );
          }}
        />
      )}
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top }]}
        onPress={() => {
          navigator.goBack();
        }}>
        <Icon color={AppColors.onBackground} size={22} name="arrow-left" />
      </TouchableOpacity>
    </View>
  );
};

export default VideoList;

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: AppColors.background,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
});
