import { createReducer, mergeReducers } from '../common';

export const types = {
  REQUEST_ALL_ASSETS: 'assets/REQUEST_ALL_ASSETS',
  GET_ALL_ASSETS: 'assets/GET_ALL_ASSETS',
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
  setLoadingAssets: isLoading => ({
    type: types.SET_LOADING_ASSETS,
    isLoading,
  }),
};

const initialState = { assets: [], assetsLength: 0, isLoading: false };
const assetsReducer = createReducer(initialState, {
  [types.GET_ALL_ASSETS]: (state, action) => {
    state.assets = action.assets;
    state.assetsLength = action.assetsLength;
  },
  [types.SET_LOADING_ASSETS]: (state, action) =>
    (state.isLoading = action.isLoading),
});

export default assetsReducer;
