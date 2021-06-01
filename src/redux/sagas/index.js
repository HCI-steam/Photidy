import { all, call } from 'redux-saga/effects';

import { watchFetchingAssets } from './assetsSaga';
import { watchFetchingPermissions } from './permissionsSaga';
import { watchFetchingAlbums } from './albumsSaga';

export default function* rootSaga() {
  yield all([
    watchFetchingAssets(),
    watchFetchingPermissions(),
    watchFetchingAlbums(),
  ]);
}
