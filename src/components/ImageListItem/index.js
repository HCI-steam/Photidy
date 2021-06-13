import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons';

/**
 * This component and its parent component have some rendering issue. (My assumption.)
 * It should be changed to Fast Image (if expo provide that soon.)
 * If they won't support that component, I have to consider to migrate this project to use rn-cli
 */

const mapDispatchToProps = dispatch => {
  return {
    setViewerModalOn: () =>
      dispatch({
        type: 'viewer/SET_VIEWER_MODAL_VISIBLE',
        isViewerModalVisible: true,
      }),
    setViewerModalState: (index, item) =>
      dispatch({
        type: 'viewer/SET_VIEWER_MODAL_STATE',
        viewerModalState: { index, item },
      }),
    selectAsset: item =>
      dispatch({
        type: 'assets/SELECT_ASSET',
        selectedAsset: item,
      }),
    unselectAsset: item =>
      dispatch({
        type: 'assets/UNSELECT_ASSET',
        unselectedAsset: item,
      }),
    setRangeStartIndex: index =>
      dispatch({
        type: 'assets/SET_RANGE_START_INDEX',
        rangeStartIndex: index,
      }),
    setSelectedAssets: selectedArray =>
      dispatch({
        type: 'assets/SET_SELECTED_ASSETS',
        selectedArray,
      }),
  };
};

const mapStateToProps = state => {
  const { selectionMode, selectedAssets, rangeStartIndex } = state.assets;
  const { isViewerModalVisible, viewerModalState } = state.viewer;
  return {
    isViewerModalVisible,
    viewerModalState,
    selectionMode,
    selectedAssets,
    rangeStartIndex,
  };
};

class ImageListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _handleOnPress = () => {
    const {
      setViewerModalOn,
      setViewerModalState,
      selectAsset,
      unselectAsset,
      selectionMode,
      selectedAssets,
      index,
      items,
      rangeStartIndex,
      setRangeStartIndex,
      setSelectedAssets,
    } = this.props;

    if (selectionMode === 'NONE') {
      setViewerModalOn();
      setViewerModalState(index, items[index]);
    } else if (selectionMode === 'SINGLE') {
      if (_.includes(selectedAssets, items[index])) {
        unselectAsset(items[index]);
      } else {
        selectAsset(items[index]);
      }
    } else {
      if (rangeStartIndex < 0) {
        if (selectedAssets.length === 0) {
          selectAsset(items[index]);
          setRangeStartIndex(index);
        } else {
          setSelectedAssets([items[index]]);
          setRangeStartIndex(index);
        }
      } else {
        if (selectedAssets.length === 1) {
          if (index === rangeStartIndex) {
          } else {
            const subArray = items.slice(rangeStartIndex, index + 1);
            setSelectedAssets(subArray);
          }
        }
        setRangeStartIndex(-1);
      }
    }
  };

  render() {
    const {
      navigation,
      imageGridSize,
      selectedAssets,
      selectionMode,
      items,
      index,
    } = this.props;
    const item = items[index];
    const selected =
      selectionMode !== 'NONE' && _.includes(selectedAssets, item);

    return (
      <TouchableOpacity
        onPress={this._handleOnPress}
        style={{
          backgroundColor: '#fff',
          // opacity: selected ? 0.6 : 1,
          // borderColor: selected ? 'rgb(0,122,255)' : 'transparent',
          // borderWidth: selected ? 1 : 0,
        }}
      >
        {selected ? (
          <React.Fragment>
            <Ionicons
              style={{
                position: 'absolute',
                top: 4,
                left: 4,
                zIndex: 5,
              }}
              name="ios-checkmark-circle-outline"
              size={imageGridSize / 4}
              color="white"
            />
            <Ionicons
              style={{
                position: 'absolute',
                top: 4,
                left: 4,
                zIndex: 5,
              }}
              name="ios-checkmark-circle-sharp"
              size={imageGridSize / 4}
              color="rgb(0,122,255)"
            />
          </React.Fragment>
        ) : null}
        <Image
          style={{
            marginRight: 1,
            marginTop: 1,
            width: imageGridSize,
            height: imageGridSize,
            resizeMode: 'cover',
            opacity: selected ? 0.5 : 1,
            borderColor: selected ? 'rgb(0,122,255)' : 'transparent',
            borderWidth: selected ? 2 : 0,
          }}
          source={{ uri: item.uri }}
        />
      </TouchableOpacity>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageListItem);
