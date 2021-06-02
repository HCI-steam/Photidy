import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';

// import { SortAndFilterModal } from '../components';
import {
  getAllAssets,
  getAssetsLength,
  getAssetsLoading,
  getImageCountPerRow,
} from '../redux/selectors';
import { actions } from '../redux/states/assetsState';

const screen = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [assets, assetsLength, isLoading, imageCountPerRow] = useSelector(
    state => [
      getAllAssets(state),
      getAssetsLength(state),
      getAssetsLoading(state),
      getImageCountPerRow(state),
    ],
    shallowEqual
  );
  const scrollRef = useRef(null);

  useScrollToTop(
    useRef({
      scrollToTop: () => {
        scrollRef.current.scrollToEnd();
      },
    })
  );

  const imageGridSize = screen.width / imageCountPerRow;

  useEffect(() => {
    dispatch(actions.requestAllAssets());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? null : (
        <FlatList
          key={'assetsList_' + imageCountPerRow}
          data={assets}
          ref={scrollRef}
          numColumns={imageCountPerRow}
          getItemLayout={(data, index) => {
            return {
              length: imageGridSize,
              offset: (imageGridSize + 1) * index,
              index,
            };
          }}
          keyExtractor={(item, index) => item.id + index}
          initialScrollIndex={Math.floor(assetsLength / imageCountPerRow) - 1}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('PhotoView', { item })}
            >
              <Image
                style={{
                  width: imageGridSize,
                  height: imageGridSize,
                  marginRight: 1,
                  marginTop: 1,
                  resizeMode: 'cover',
                }}
                source={{ uri: item.uri }}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;
