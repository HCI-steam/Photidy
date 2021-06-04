import { all, call, put, take, fork } from 'redux-saga/effects';
import { actions, types } from '../states/permissionsState';
import { callApiPermissions } from '../api';

export function* fetchMediaLibraryPermission(action) {
  // console.log(action);
  while (true) {
    yield take(types.REQUEST_MEDIA_LIBRARY_PERMISSION);
    const permission = yield call(callApiPermissions);
    yield put(actions.getMediaLibraryPermission(permission));
  }
}

export function* watchFetchingPermissions() {
  yield all([fork(fetchMediaLibraryPermission)]);
}
