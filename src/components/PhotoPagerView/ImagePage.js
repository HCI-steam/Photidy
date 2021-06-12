import React, { useEffect, useRef, useCallback } from 'react';
import { Image } from 'react-native';
import { Video, Audio } from 'expo-av';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getViewerModalState } from '../../redux/selectors';
import { actions } from '../../redux/states/viewerState';

const ImagePage = props => {
  const dispatch = useDispatch();
  const { index, item, width, height } = props;
  const videoRef = useRef(null);
  const isVideo = item.mediaType === 'video';

  const viewerStatus = useSelector(
    state => getViewerModalState(state),
    shallowEqual
  );

  useEffect(() => {
    const setAudioOptions = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
    };

    setAudioOptions();
  }, []);

  useEffect(() => {
    if (!isVideo) {
      dispatch(actions.setVideoPlayback(null));
    }
  }, [dispatch]);

  const handlePlaybackUpdate = useCallback(
    playbackStatus => {
      dispatch(
        actions.setVideoPlayback({
          playbackObject: videoRef.current,
          playbackStatus,
        })
      );
      if (
        playbackStatus.didJustFinish &&
        playbackStatus.positionMillis === playbackStatus.durationMillis
      ) {
        videoRef.current.loadAsync(item);
      }
    },
    [videoRef.current, dispatch]
  );

  return item.mediaType === 'video' ? (
    <Video
      ref={videoRef}
      style={{ width, height }}
      shouldPlay={viewerStatus.index === index}
      resizeMode="cover"
      source={{ uri: item.uri }}
      volume={1}
      isMuted={false}
      onPlaybackStatusUpdate={handlePlaybackUpdate}
    />
  ) : (
    <Image style={{ width, height }} source={{ uri: item.uri }} />
  );
};

export default ImagePage;
