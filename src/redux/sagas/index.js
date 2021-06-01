import { all, call } from 'redux-saga/effects';

import { watchFetchingAssets } from './assetsSaga';
import { watchFetchingPermissions } from './permissionsSaga';

export default function* rootSaga() {
  yield all([watchFetchingAssets(), watchFetchingPermissions()]);
}
