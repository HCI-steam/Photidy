import { createSelector } from 'reselect';

export const getAllAssets = state => state.assets.assets;
export const getAssetsLength = state => state.assets.assetsLength;
export const getAssetsLoading = state => state.assets.isLoading;
export const getImageCountPerRow = state => state.assets.imageCountPerRow;

export const getAllAlbums = state => state.albums.albums;
export const getAlbumsLoading = state => state.albums.isLoading;
