import React, { useEffect, useRef, useCallback } from 'react';
import { StyleSheet, AppState } from 'react-native';
import { useDispatch } from 'react-redux';

import { actions } from '../redux/states/assetsState';
import { ImageGridList, SortAndFilterModal } from '../components';
import { SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const appState = useRef(AppState.currentState);
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = useCallback(
    nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        dispatch(actions.requestAllAssets());
      }
      console.log(appState.current);
      appState.current = nextAppState;
    },
    [dispatch, appState.current]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageGridList navigation={navigation} />
      <SortAndFilterModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;
