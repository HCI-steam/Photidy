import { createSelector } from 'reselect';

/* Assets */
export const getAllAssets = state => state.assets.assets;
export const getAssetsLength = state => state.assets.assetsLength;
export const getAssetsLoading = state => state.assets.isLoading;
export const getImageCountPerRow = state => state.assets.imageCountPerRow;
export const getSFModalVisible = state => state.assets.isSFModalVisible;
export const getSelectionMode = state => state.assets.selectionMode;
export const getSelectedAssets = state => state.assets.selectedAssets;
export const getRangeStartIndex = state => state.assets.rangeStartIndex;

/* Albums */
export const getAllAlbums = state => state.albums.albums;
export const getAlbumsLoading = state => state.albums.isLoading;

/* App */
export const getAppIsLoaded = state => state.app.appIsLoaded;

/* Viewer */
export const getViewerModalVisible = state => state.viewer.isViewerModalVisible;
export const getViewerModalState = state => state.viewer.viewerModalState;
export const getInfoModalVisible = state => state.viewer.isInfoModalVisible;
export const getTagModalVisible = state => state.viewer.isTagModalVisible;
export const getSaveToAlbumModalVisible = state =>
  state.viewer.isSaveToAlbumModalVisible;
export const getVideoPlayback = state => state.viewer.videoPlayback;
