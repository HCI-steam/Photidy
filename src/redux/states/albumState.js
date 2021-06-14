import _ from 'lodash';

import { createReducer } from '../common';

export const types = {
  REQUEST_ALBUM_ASSETS: 'albums/REQUEST_ALBUM_ASSETS',
  GET_ALBUM_ASSETS: 'albums/GET_ALBUM_ASSETS',
  SET_LOADING_ALBUM: 'albums/SET_LOADING_ALBUM',
};

export const actions = {
  requestAlbumAssets: (albumId, assetCount) => ({
    type: types.REQUEST_ALBUM_ASSETS,
    albumId,
    assetCount,
  }),
  getAlbumAssets: albumAssets => ({
    type: types.GET_ALBUM_ASSETS,
    albumAssets,
  }),
  setLoadingAlbum: isLoading => ({
    type: types.SET_LOADING_ALBUM,
    isLoading,
  }),
};

const initialState = {
  albumAssets: [],
  isLoading: false,
};

const albumReducer = createReducer(initialState, {
  [types.GET_ALBUM_ASSETS]: (state, action) => {
    if (!_.isEqual(state.albumAssets, action.albumAssets))
      state.albumAssets = action.albumAssets;
  },
  [types.SET_LOADING_ALBUM]: (state, action) =>
    (state.isLoading = action.isLoading),
});

export default albumReducer;
