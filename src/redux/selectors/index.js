import { createSelector } from 'reselect';

/* Assets */
export const getAllAssets = state => state.assets.assets;
export const getAssetsLength = state => state.assets.assetsLength;
export const getAssetsLoading = state => state.assets.isLoading;
export const getImageCountPerRow = state => state.assets.imageCountPerRow;
export const getSFModalVisible = state => state.assets.isSFModalVisible;
export const getViewerModalVisible = state => state.assets.isViewerModalVisible;
export const getViewerModalState = state => state.assets.viewerModalState;

/* Albums */
export const getAllAlbums = state => state.albums.albums;
export const getAlbumsLoading = state => state.albums.isLoading;

/* App */
export const getAppIsLoaded = state => state.app.appIsLoaded;
