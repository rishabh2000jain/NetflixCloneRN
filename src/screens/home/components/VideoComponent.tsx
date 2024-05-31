import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { VideoType } from '../VideoTypes';
import Video, { VideoRef } from 'react-native-video';
import { AppColors } from '../../../util/AppColors';
import { useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import convertToProxyURL from 'react-native-video-cache';
import { Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import { muteVideos } from '../../../app/VideosReducer';


const VideoComponent = ({
  video,
  index,
}: {
  video: VideoType;
  index: number;
}) => {
  const { height, width } = Dimensions.get('screen');
  const videoController = useRef<VideoRef>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const videoSelector = useAppSelector(state => state.videos);
  const fadeAnimationRef = useRef(new Animated.Value(1)).current;
  const dispach = useAppDispatch();

  const fadeCenterIcon = () => {
    Animated.timing(fadeAnimationRef, {
      toValue: 0,
      duration: 1.5 * 1000,
      useNativeDriver: true,
      easing: Easing.elastic(0.5)
    }).start();
  };

  useEffect(() => {
    if (!isFocused) {
      pause();
    }
  }, [isFocused]);

  useEffect(() => {
    if (videoSelector.playingVideo == index) {
      play();
    } else {
      pause();
    }
  }, [videoSelector.playingVideo]);

  const play = () => {
    videoController.current?.resume();
    fadeAnimationRef.setValue(1);
    fadeCenterIcon();
    setPlaying(true);
    if(videoSelector.mute){
      mute();
    }else{
      unmute();
    }
  };
  const pause = () => {
    videoController.current?.pause();
    fadeAnimationRef.setValue(1);
    fadeCenterIcon();
    setPlaying(false);
    if(videoSelector.mute){
      mute();
    }else{
      unmute();
    }
  };

  const mute = () => {
    dispach(muteVideos(true));
    videoController.current?.setVolume(0);

  };
  const unmute = () => {
    dispach(muteVideos(false));
    videoController.current?.setVolume(1);
  };



  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: AppColors.background,
        justifyContent: 'center',
      }}>
      <Video
        ref={videoController}
        source={{ uri: (video.playbackUrl) }}
        bufferConfig={{ cacheSizeMB: 2, bufferForPlaybackMs: 10, }}
        controls={false}
        paused
        playInBackground={false}
        onLoadStart={() => {
          setLoading(true);
        }}
        onReadyForDisplay={() => {
          setLoading(false);
        }}
        repeat
        style={{ width: '100%', aspectRatio: video.aspectRatio }}
      />
      {loading && (
        <FastImage source={{ uri: video.thumbnailUrl }} style={[styles.thumbnail, { aspectRatio: video.aspectRatio }]} />
      )}
      {loading && (
        <ActivityIndicator
          color={AppColors.primary}
          size={'large'}
          style={styles.centerIcon}
        />
      )}
      {!loading && <TouchableOpacity
        style={StyleSheet.absoluteFillObject}
        onPress={(event) => {
          if (playing) {
            pause();
          } else {
            play();
          }
        }}>
        <Animated.View
          style={[styles.centerIcon, { opacity: fadeAnimationRef }]}>
          <Icon name={playing ? 'play' : 'pause'} size={50} color={AppColors.onBackground} />
        </Animated.View>
      </TouchableOpacity>}
      <OcticonsIcon name={videoSelector.mute ? 'mute' : 'unmute'} color={AppColors.onBackground} size={26} style={styles.muteIcon} onPress={
        (e) => {
          if (videoSelector.mute) {
            unmute();
          } else {
            mute();
          }
        }
      } />
    </View>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({
  centerIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnail: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    resizeMode: 'contain'
  },
  muteIcon: {
    position: 'absolute',
    top: 60,
    right: 30,
  }
});
