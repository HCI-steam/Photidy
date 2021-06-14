import _ from 'lodash';

import { createReducer } from '../common';

export const types = {
  REQUEST_ALL_ALBUMS: 'albums/REQUEST_ALL_ALBUMS',
  GET_ALL_ALBUMS: 'albums/GET_ALL_ALBUMS',
  SET_LOADING_ALBUMS: 'albums/SET_LOADING_ALBUMS',
  SET_EDIT_MODE: 'albums/SET_EDIT_MODE',
  SET_CREAT_MODAL_VISIBLE: 'albums/SET_CREATE_MODAL_VISIBLE',
  SET_ALBUMS_SORT_OPTION: 'albums/SET_ALBUMS_SORT_OPTION',
};

const SortOptions = Object.freeze({
  TIME_ASC: 'TIME_ASC',
  TIME_DESC: 'TIME_DESC',
  TITLE_ASC: 'TITLE_ASC',
  TITLE_DESC: 'TITLE_DESC',
});

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
  setEditMode: isEditMode => ({
    type: types.SET_EDIT_MODE,
    isEditMode,
  }),
  setCreateModalVisible: isCreating => ({
    type: types.SET_CREAT_MODAL_VISIBLE,
    isCreating,
  }),
  setAlbumSortOption: sortOption => ({
    type: types.SET_ALBUMS_SORT_OPTION,
    sortOption,
  }),
};

const initialState = {
  albums: [],
  isLoading: false,
  isEditMode: false,
  isCreating: false,
  sortOption: SortOptions.TIME_ASC,
};

const albumsReducer = createReducer(initialState, {
  [types.GET_ALL_ALBUMS]: (state, action) => {
    if (!_.isEqual(state.albums, action.albums)) state.albums = action.albums;
  },
  [types.SET_LOADING_ALBUMS]: (state, action) =>
    (state.isLoading = action.isLoading),
  [types.SET_EDIT_MODE]: (state, action) =>
    (state.isEditMode = action.isEditMode),
  [types.SET_CREAT_MODAL_VISIBLE]: (state, action) =>
    (state.isCreating = action.isCreating),
  [types.SET_ALBUMS_SORT_OPTION]: (state, action) =>
    (state.sortOption = action.sortOption),
});

export default albumsReducer;
