import { all, call, put, take, fork } from 'redux-saga/effects';

import { actions, types } from '../states/tagsState';
import { callApiGetTags, callApiSetTags } from '../api';

export function* fetchingTagStorage(action) {
  while (true) {
    yield take(types.REQUEST_TAG_STORAGE);
    const { idToTags, tagToIds } = yield call(callApiGetTags);
    if (!idToTags && !tagToIds) {
      yield put(actions.saveTagStorage({}, {}));
    }
    yield put(actions.setIdToTags(idToTags));
    yield put(actions.setTagToIds(tagToIds));
  }
}

export function* saveTagStorage(action) {
  while (true) {
    yield take(types.SAVE_TAG_STORAGE);
    if (action) {
      yield call(callApiSetTags, [action.idToTags, action.tagToIds]);
    } else {
      yield call(callApiSetTags, [{}, {}]);
    }
  }
}

export function* watchFetchingTags() {
  yield all([fork(fetchingTagStorage), fork(saveTagStorage)]);
}
