import _ from 'loadsh';

import { createReducer } from '../common';

export const types = {
  REQUEST_ALL_ASSETS: 'assets/REQUEST_ALL_ASSETS',
  GET_ALL_ASSETS: 'assets/GET_ALL_ASSETS',
  UPDATE_IMAGE_COUNT_PER_ROW: 'assets/UPDATE_IMAGE_COUNT_PER_ROW',
  SET_LOADING_ASSETS: 'assets/SET_LOADING_ASSETS',
  SET_SF_MODAL_VISIBLE: 'assets/SET_SF_MODAL_VISIBLE',
  SET_SELECTION_MODE: 'assets/SET_SELECTION_MODE',
  SELECT_ASSET: 'assets/SELECT_ASSET',
  UNSELECT_ASSET: 'assets/UNSELECT_ASSET',
  SET_SELECTED_ASSETS: 'assets/SET_SELECTED_ASSETS',
  SET_RANGE_START_INDEX: 'assets/SET_RANGE_START_INDEX',
};

const SelectionMode = Object.freeze({
  NONE: 'NONE',
  SINGLE: 'SINGLE',
  RANGE: 'RANGE',
});

export const actions = {
  requestAllAssets: () => ({
    type: types.REQUEST_ALL_ASSETS,
  }),
  getAllAssets: (assets, assetsLength) => ({
    type: types.GET_ALL_ASSETS,
    assets,
    assetsLength,
  }),
  updateImageCountPerRow: () => ({
    type: types.UPDATE_IMAGE_COUNT_PER_ROW,
  }),
  setLoadingAssets: isLoading => ({
    type: types.SET_LOADING_ASSETS,
    isLoading,
  }),
  setSFModalVisible: isSFModalVisible => ({
    type: types.SET_SF_MODAL_VISIBLE,
    isSFModalVisible,
  }),
  setSelectionMode: selectionMode => ({
    type: types.SET_SELECTION_MODE,
    selectionMode,
  }),
  selectAsset: selectedAsset => ({
    type: types.SELECT_ASSET,
    selectedAsset,
  }),
  unselectAsset: unselectedAsset => ({
    type: types.UNSELECT_ASSET,
    unselectedAsset,
  }),
  setSelectedAssets: selectedArray => ({
    type: types.SET_SELECTED_ASSETS,
    selectedArray,
  }),
  setRangeStartIndex: rangeStartIndex => ({
    type: types.SET_RANGE_START_INDEX,
    rangeStartIndex,
  }),
};

const initialState = {
  assets: [],
  assetsLength: 0,
  imageCountPerRow: 3,
  isLoading: false,
  isSFModalVisible: false,
  isViewerModalVisible: false,
  viewerModalState: null,
  selectionMode: SelectionMode.NONE,
  selectedAssets: [],
  rangeStartIndex: -1,
};

const assetsReducer = createReducer(initialState, {
  [types.GET_ALL_ASSETS]: (state, action) => {
    if (!_.isEqual(state.assets, action.assets)) {
      state.assets = action.assets;
      state.assetsLength = action.assetsLength;
    }
  },
  [types.UPDATE_IMAGE_COUNT_PER_ROW]: (state, action) => {
    if (state.imageCountPerRow === 5) {
      state.imageCountPerRow = 1;
    } else {
      state.imageCountPerRow += 1;
    }
  },
  [types.SET_LOADING_ASSETS]: (state, action) =>
    (state.isLoading = action.isLoading),
  [types.SET_SF_MODAL_VISIBLE]: (state, action) =>
    (state.isSFModalVisible = action.isSFModalVisible),
  [types.SET_SELECTION_MODE]: (state, action) =>
    (state.selectionMode = action.selectionMode),
  [types.SELECT_ASSET]: (state, action) => {
    state.selectedAssets.push(action.selectedAsset);
  },
  [types.UNSELECT_ASSET]: (state, action) => {
    state.selectedAssets = state.selectedAssets.filter(
      asset => action.unselectedAsset.id !== asset.id
    );
  },
  [types.SET_SELECTED_ASSETS]: (state, action) =>
    (state.selectedAssets = action.selectedArray),
  [types.SET_RANGE_START_INDEX]: (state, action) =>
    (state.rangeStartIndex = action.rangeStartIndex),
});

export default assetsReducer;
