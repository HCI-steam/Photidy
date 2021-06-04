import { createReducer } from '../common';

export const types = {
  SET_APP_IS_LOADED: 'albums/SET_APP_IS_LOADED',
};

export const actions = {
  setAppIsLoaded: appIsLoaded => ({
    type: types.SET_APP_IS_LOADED,
    appIsLoaded,
  }),
};

const initialState = {
  appIsLoaded: false,
};

const appReducer = createReducer(initialState, {
  [types.SET_APP_IS_LOADED]: (state, action) =>
    (state.appIsLoaded = action.appIsLoaded),
});

export default appReducer;
