import { createReducer, mergeReducers } from '../common';

export const types = {
  REQUEST_ALL_ASSETS: 'assets/REQUEST_ALL_ASSETS',
  GET_ALL_ASSETS: 'assets/GET_ALL_ASSETS',
  UPDATE_IMAGE_COUNT_PER_ROW: 'assets/UPDATE_IMAGE_COUNT_PER_ROW',
  SET_LOADING_ASSETS: 'assets/SET_LOADING_ASSETS',
};

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
};

const initialState = {
  assets: [],
  assetsLength: 0,
  imageCountPerRow: 3,
  isLoading: false,
};

const assetsReducer = createReducer(initialState, {
  [types.GET_ALL_ASSETS]: (state, action) => {
    state.assets = action.assets;
    state.assetsLength = action.assetsLength;
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
});

export default assetsReducer;
