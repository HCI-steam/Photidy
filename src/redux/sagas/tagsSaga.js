import { all, call, put, take, fork } from 'redux-saga/effects';

import { actions, types } from '../states/tagsState';
import { callApiGetTags, callApiSaveTags } from '../api';

export function* fetchingTagStorage() {
  while (true) {
    yield take(types.REQUEST_TAG_STORAGE);
    const { idToTags, tagToIds } = yield call(callApiGetTags);
    // console.log('fetched : ', idToTags, tagToIds);
    if (!idToTags && !tagToIds) {
      yield put(actions.saveTagStorage({}, {}));
    }
    yield put(actions.setIdToTags(idToTags));
    yield put(actions.setTagToIds(tagToIds));
  }
}

export function* saveTagStorage() {
  while (true) {
    const { idToTags, tagToIds } = yield take(actions.saveTagStorage);
    // console.log('saving : ', idToTags, tagToIds);
    if (idToTags && tagToIds) yield call(callApiSaveTags, idToTags, tagToIds);
  }
}

export function* watchFetchingTags() {
  yield all([fork(fetchingTagStorage), fork(saveTagStorage)]);
}
