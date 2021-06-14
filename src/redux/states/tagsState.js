import _ from 'lodash';

import { createReducer } from '../common';

export const types = {
  REQUEST_TAG_STORAGE: 'tags/REQUEST_TAG_STORAGE',
  SAVE_TAG_STORAGE: 'tags/SAVE_TAG_STORAGE',
  SET_TAG_TO_IDS: 'tags/SET_TAG_TO_IDS',
  SET_ID_TO_TAGS: 'tags/SET_ID_TO_TAGS',
};

export const actions = {
  requestTagStorage: () => ({
    type: types.REQUEST_TAG_STORAGE,
  }),
  saveTagStorage: (idToTags, tagToIds) => ({
    type: types.SAVE_TAG_STORAGE,
    idToTags,
    tagToIds,
  }),
  setTagToIds: tagToIds => ({
    type: types.SET_TAG_TO_IDS,
    tagToIds,
  }),
  setIdToTags: idToTags => ({
    type: types.SET_ID_TO_TAGS,
    idToTags,
  }),
};

const initialState = {
  tagToIds: {},
  idToTags: {},
};

const tagsReducer = createReducer(initialState, {
  [types.SET_TAG_TO_IDS]: (state, action) => {
    if (!_.isEqual(state.tagToIds, action.tagToIds))
      state.tagToIds = action.tagToIds;
  },
  [types.SET_ID_TO_TAGS]: (state, action) => {
    if (!_.isEqual(state.idToTags, action.idToTags))
      state.idToTags = action.idToTags;
  },
});

export default tagsReducer;
