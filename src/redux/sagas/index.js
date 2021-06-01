import { all, call } from 'redux-saga/effects';

import { watchFetchingAssets } from './assetsSaga';
import { watchFetchingPermissions } from './requestsSaga';

export default function* rootSaga() {
  yield all([watchFetchingAssets(), watchFetchingPermissions()]);
}
