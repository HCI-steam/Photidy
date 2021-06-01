import { all, call, put, take, fork } from 'redux-saga/effects';

import { actions, types } from '../states/assetsState';
import { callApiAssets } from '../api';

export function* fetchAllAssets(action) {
  console.log(action);
  console.log(callApiAssets);
  while (true) {
    yield take(types.REQUEST_ALL_ASSETS);
    yield put(actions.setLoadingAssets(true));
    const { assets, assetsLength } = yield call(callApiAssets);
    console.log(assetsLength);
    yield put(actions.getAllAssets(assets, assetsLength));
    yield put(actions.setLoadingAssets(false));
  }
}

export function* watchFetchingAssets() {
  yield all([fork(fetchAllAssets)]);
}
