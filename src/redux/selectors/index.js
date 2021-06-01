import { createSelector } from 'reselect';

export const getAllAssets = state => state.assets.assets;
export const getAssetsLength = state => state.assets.assetsLength;
export const getAssetsLoading = state => state.assets.isLoading;
