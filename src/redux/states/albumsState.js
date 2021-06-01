import { createReducer } from '../common';

export const types = {
  REQUEST_ALL_ALBUMS: 'albums/REQUEST_ALL_ALBUMS',
  GET_ALL_ALBUMS: 'albums/GET_ALL_ALBUMS',
  SET_LOADING_ALBUMS: 'albums/SET_LOADING_ALBUMS',
};

export const actions = {
  requestAllAlbums: () => ({
    type: types.REQUEST_ALL_ALBUMS,
  }),
  getAllAlbums: (albums, assetsLength) => ({
    type: types.GET_ALL_ALBUMS,
    albums,
    assetsLength,
  }),
  setLoadingAlbums: isLoading => ({
    type: types.SET_LOADING_ALBUMS,
    isLoading,
  }),
};

const initialState = {
  albums: [],
  isLoading: false,
};

const albumsReducer = createReducer(initialState, {
  [types.GET_ALL_ALBUMS]: (state, action) => {
    state.albums = action.albums;
  },
  [types.SET_LOADING_ALBUMS]: (state, action) =>
    (state.isLoading = action.isLoading),
});

export default albumsReducer;
