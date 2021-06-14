import { all, call, put, take, fork } from 'redux-saga/effects';

import { actions } from '../states/albumState';
import { callApiAlbum } from '../api';

export function* fetchAlbumAssets() {
  while (true) {
    const { type, assetCount, albumId } = yield take(
      actions.requestAlbumAssets
    );
    yield put(actions.setLoadingAlbum(true));
    const { albumAssets } = yield call(callApiAlbum, albumId, assetCount);
    yield put(actions.getAlbumAssets(albumAssets));
    yield put(actions.setLoadingAlbum(false));
  }
}

export function* watchFetchingAlbumAssets() {
  yield all([fork(fetchAlbumAssets)]);
}
