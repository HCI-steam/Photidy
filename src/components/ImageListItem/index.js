import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

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
  };
};

const mapStateToProps = state => {
  const { isViewerModalVisible, viewerModalState } = state.viewer;
  return { isViewerModalVisible, viewerModalState };
};

class ImageListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _handleOnPress = () => {
    const { setViewerModalOn, setViewerModalState, index, items } = this.props;
    if (setViewerModalOn) setViewerModalOn();
    if (setViewerModalState) setViewerModalState(index, items[index]);
  };

  render() {
    const { navigation, imageGridSize, items, index } = this.props;
    const item = items[index];
    return (
      <TouchableOpacity onPress={this._handleOnPress}>
        {/* <SharedElement id={`main-screen-photo-${item.id}`}> */}
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
        {/* </SharedElement> */}
      </TouchableOpacity>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageListItem);
