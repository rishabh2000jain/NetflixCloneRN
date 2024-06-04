import { StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { AppColors } from '../util/AppColors';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { clamp, useAnimatedStyle, useSharedValue, withClamp, withSpring, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome6';

const [MIN_DRAG_VAL, MAX_DRAG_VAL] = [-100, 0];

const LibraryListItem = ({ libraryName,onPress,onDelete}: { libraryName: string,onPress:()=>void,onDelete:()=>void }) => {
  let dragCloseTimer: NodeJS.Timeout | null = null;
  const dragSharedValue = useSharedValue(0);
  const prevDragVal = useRef(0);
  const dragAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: dragSharedValue.value
      },
    ]
  }));

  return (
    <View style={styles.bookmarkListItem}>
      <View style={styles.bookmarkListItemBg}>
        <Icon name='trash-can' color={AppColors.onPrimary} size={25} onPress={(e) => {
          e.preventDefault();
            onDelete();
        }} />
      </View>

      <PanGestureHandler
        onGestureEvent={(event) => {
          const isClosing = event.nativeEvent.translationX > prevDragVal.current;
          prevDragVal.current = dragSharedValue.value;
          if (isClosing) {
            dragSharedValue.value = clamp((event.nativeEvent.translationX + MIN_DRAG_VAL), MIN_DRAG_VAL, MAX_DRAG_VAL);
          } else {
            dragSharedValue.value = clamp(event.nativeEvent.translationX, MIN_DRAG_VAL, MAX_DRAG_VAL);
          }
        }}
        onEnded={(event) => {
          if (dragSharedValue.value > (MIN_DRAG_VAL / 2)) {
            dragSharedValue.value = withTiming(MAX_DRAG_VAL);
          } else {
            dragSharedValue.value = withTiming(MIN_DRAG_VAL);
          }
          if (dragCloseTimer) {
            clearTimeout(dragCloseTimer);
            dragCloseTimer = null;
          }
          if (dragSharedValue.value != MIN_DRAG_VAL) {
            dragCloseTimer = setTimeout(() => {
              dragSharedValue.value = withTiming(MAX_DRAG_VAL);
            }, 3000);
          }
        }}
      >
        <TapGestureHandler
          onEnded={onPress}>
          <Animated.View style={[styles.bookmarkListItemFg, dragAnimatedStyle]}>
            <Text style={styles.bookmarkListItemText}>{libraryName}</Text>
          </Animated.View>
        </TapGestureHandler>
      </PanGestureHandler>
    </View>
  );
};

export default LibraryListItem;

const styles = StyleSheet.create({
  bookmarkListItemBg: {
    height: 50,
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bookmarkListItemFg: {
    height: 50,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: AppColors.secondary,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bookmarkListItem: {
    height: 50,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  bookmarkListItemText: {
    color: AppColors.onBackground,
    fontSize: 20,
    fontWeight: '600',
    marginStart: 16,
  },
});
