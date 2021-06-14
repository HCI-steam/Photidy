import { all, call } from 'redux-saga/effects';

import { watchFetchingAssets } from './assetsSaga';
import { watchFetchingPermissions } from './permissionsSaga';
import { watchFetchingAlbums } from './albumsSaga';
import { watchFetchingTags } from './tagsSaga';
import { watchFetchingAlbumAssets } from './albumSaga';

export default function* rootSaga() {
  yield all([
    watchFetchingAssets(),
    watchFetchingPermissions(),
    watchFetchingAlbums(),
    watchFetchingTags(),
    watchFetchingAlbumAssets(),
  ]);
}
