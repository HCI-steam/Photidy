import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slider } from '@miblanchard/react-native-slider';

import { actions as viewerActions } from '../../redux/states/viewerState';
import { actions as assetsActions } from '../../redux/states/assetsState';
import { getVideoPlayback } from '../../redux/selectors';

const PhotoViewFooter = props => {
  const { currentIndex, currentItem, items } = props;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const videoPlayback = useSelector(
    state => getVideoPlayback(state),
    shallowEqual
  );
  //   const { playbackObject, playbackStatus } = videoPlayback;

  const isVideo = currentItem.mediaType === 'video';

  const handleSharing = useCallback(async () => {
    let uri = `${FileSystem.cacheDirectory}/${currentItem.filename}`;
    await FileSystem.copyAsync({
      from: currentItem.uri,
      to: uri,
    });
    const available = await Sharing.isAvailableAsync();
    if (available) {
      await Sharing.shareAsync(uri);
    }
  }, [currentItem]);

  const handleDelete = useCallback(async () => {
    const length = items.length;
    try {
      await MediaLibrary.deleteAssetsAsync([currentItem]);

      /* stored tags data removal if exists */
      const idToTags = JSON.parse(await AsyncStorage.getItem('idToTags'));
      const tagToIds = JSON.parse(await AsyncStorage.getItem('tagToIds'));
      const idToTagsAfterRemoval = delete idToTags[currentItem.id];
      const tagToIdsAfterRemoval = Object.keys(tagToIds).map(tag => {
        const removed = tagToIds[tag].filter(id => id !== currentItem.id);
        return { tag: removed };
      });
      await AsyncStorage.setItem(
        'idToTags',
        JSON.stringify(idToTagsAfterRemoval)
      );
      await AsyncStorage.setItem(
        'tagToIds',
        JSON.stringify(tagToIdsAfterRemoval)
      );

      if (length === 1) {
        dispatch(viewerActions.setViewerModalVisible(false));
        dispatch(viewerActions.setViewerModalState(null));
      } else {
        dispatch(
          viewerActions.setViewerModalState({
            index: currentIndex - 1,
            item: items[currentIndex - 1],
          })
        );
      }
      dispatch(assetsActions.requestAllAssets());
    } catch (e) {
      console.log('user did not allowed removing image');
    }
  }, [items, currentIndex, dispatch]);

  const handleTagMenu = useCallback(() => {
    dispatch(viewerActions.setTagModalVisible(true));
  }, [dispatch]);

  const handleSaveToAlbumMenu = useCallback(() => {
    dispatch(viewerActions.setSaveToAlbumModalVisible(true));
  }, [dispatch]);

  const handlePlayPause = useCallback(async () => {
    if (videoPlayback?.playbackStatus.isPlaying) {
      await videoPlayback?.playbackObject.pauseAsync();
    } else {
      await videoPlayback?.playbackObject.playAsync();
    }
  }, [videoPlayback?.playbackStatus.isPlaying]);

  const handleSoundMute = useCallback(async () => {
    try {
      if (videoPlayback?.playbackStatus.isMuted) {
        await videoPlayback?.playbackObject.setStatusAsync({ isMuted: false });
      } else {
        await videoPlayback?.playbackObject.setStatusAsync({ isMuted: true });
      }
    } catch (e) {
      console.log(e);
    }
  }, [videoPlayback?.playbackStatus.isMuted]);

  const getSeekSlidePosition = () =>
    videoPlayback?.playbackStatus.positionMillis /
      videoPlayback?.playbackStatus.durationMillis || 0;

  const handleSeekSlideChange = useCallback(
    async value => {
      try {
        const floatValue = Number.parseFloat(value[0]);
        const floatDuration = Number.parseFloat(
          videoPlayback?.playbackStatus.durationMillis
        );

        const moved = Math.round(floatValue * floatDuration);

        await videoPlayback?.playbackObject.setStatusAsync({
          positionMillis: moved ? moved : 0,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [videoPlayback]
  );

  const convertMsToSecString = ms => {
    const sec = Math.floor((ms / 1000) % 60);
    const min = Math.floor((ms / 1000 / 60) % 60);
    const hour = Math.floor((ms / 1000 / 3600) % 24);

    const zeroPadding = num => {
      return num < 10 ? `0${num}` : num.toString();
    };

    const hourStr = zeroPadding(hour),
      minStr = zeroPadding(min),
      secStr = zeroPadding(sec);

    return `${hourStr === '00' ? '' : `${hourStr}:`}${minStr}:${secStr}`;
  };

  return (
    <React.Fragment>
      {isVideo ? (
        <React.Fragment>
          <View style={styles.timeStampWrapper}>
            <View style={styles.timeStampBox}>
              <Text style={styles.timeStampText}>
                {`${convertMsToSecString(
                  videoPlayback?.playbackStatus.positionMillis
                )} / ${convertMsToSecString(
                  videoPlayback?.playbackStatus.durationMillis
                )}`}
              </Text>
            </View>
          </View>
          <Slider
            containerStyle={{ height: 48 }}
            trackStyle={styles.seekBarSliderTrack}
            thumbStyle={styles.seekBarSliderThumb}
            thumbTouchSize={{ width: 6, height: 48 }}
            minimumTrackTintColor="rgba(0,122,255,0.8)"
            animateTransitions={true}
            animationType="timing"
            value={getSeekSlidePosition()}
            onValueChange={handleSeekSlideChange}
          ></Slider>
        </React.Fragment>
      ) : null}
      <View
        style={{
          ...styles.footerContainer,
          height: 49 + insets.bottom,
          paddingBottom: insets.bottom,
        }}
      >
        <View style={styles.leftIconContainer}>
          <TouchableOpacity style={styles.leftIcons} onPress={handleSharing}>
            <Ionicons
              name="ios-share-outline"
              color="rgb(0,122,255)"
              size={28}
            />
          </TouchableOpacity>
          {isVideo ? (
            <React.Fragment>
              <TouchableOpacity
                style={styles.leftIcons}
                onPress={handlePlayPause}
              >
                <Ionicons
                  name={`ios-${
                    videoPlayback?.playbackStatus.isPlaying ? 'pause' : 'play'
                  }-sharp`}
                  color="rgb(0,122,255)"
                  size={28}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.leftIcons}
                onPress={handleSoundMute}
              >
                <Ionicons
                  name={`ios-volume-${
                    videoPlayback?.playbackStatus.isMuted ? 'high' : 'mute'
                  }-sharp`}
                  color="rgb(0,122,255)"
                  size={28}
                />
              </TouchableOpacity>
            </React.Fragment>
          ) : null}
        </View>
        <View style={styles.rightIconContainer}>
          <TouchableOpacity
            style={styles.rightIcons}
            onPress={handleSaveToAlbumMenu}
          >
            <Ionicons
              name="ios-albums-outline"
              color="rgb(0,122,255)"
              size={28}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightIcons} onPress={handleTagMenu}>
            <Ionicons
              name="ios-pricetag-outline"
              color="rgb(0,122,255)"
              size={28}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightIcons} onPress={handleDelete}>
            <Ionicons
              name="ios-trash-outline"
              color="rgb(0,122,255)"
              size={28}
            />
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 0.3,
    borderTopColor: 'rgb(199,199,204)',
    // height: '100%',
  },
  leftIconContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 16,
    alignItems: 'center',
  },
  rightIconContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 16,
    alignItems: 'center',
  },
  leftIcons: {
    marginRight: 24,
  },
  rightIcons: {
    marginLeft: 24,
  },
  seekBarSliderTrack: {
    height: 48,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 0,
  },
  seekBarSliderThumb: {
    height: 48,
    width: 6,
    backgroundColor: 'white',
    borderRadius: 2,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  timeStampWrapper: {
    alignItems: 'center',
    marginBottom: 4,
  },
  timeStampBox: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  timeStampText: { fontSize: 10, color: 'white' },
});

export default PhotoViewFooter;
