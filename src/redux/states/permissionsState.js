import { createReducer, mergeReducers } from '../common';

export const types = {
  REQUEST_MEDIA_LIBRARY_PERMISSION:
    'permissions/REQUEST_MEDIA_LIBRARY_PERMISSION',
  GET_MEDIA_LIBRARY_PERMISSION: 'permissions/GET_MEDIA_LIBRARY_PERMISSION',
  SET_LOADING_PERMISSIONS: 'permissions/SET_LOADING_PERMISSIONS',
};

export const actions = {
  requestMediaLibraryPermission: () => ({
    type: types.REQUEST_MEDIA_LIBRARY_PERMISSION,
  }),
  getMediaLibraryPermission: permission => ({
    type: types.GET_MEDIA_LIBRARY_PERMISSION,
    permission,
  }),
};

const initialState = { mediaLibraryPermission: {}, isLoading: false };
const permissionsReducer = createReducer(initialState, {
  [types.GET_MEDIA_LIBRARY_PERMISSION]: (state, action) => {
    state.mediaLibraryPermission = action.mediaLibraryPermission;
  },
});

export default permissionsReducer;
