import { all, call, put, take, fork } from 'redux-saga/effects';

import { actions, types } from '../states/albumsState';
import { callApiAlbums } from '../api';

export function* fetchAllAlbums(action) {
  console.log(action);
  while (true) {
    yield take(types.REQUEST_ALL_ALBUMS);
    yield put(actions.setLoadingAlbums(true));
    const { albums } = yield call(callApiAlbums);
    yield put(actions.getAllAlbums(albums));
    yield put(actions.setLoadingAlbums(false));
  }
}

export function* watchFetchingAlbums() {
  yield all([fork(fetchAllAlbums)]);
}
