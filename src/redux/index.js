import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import {
  assetsReducer,
  permissionsReducer,
  albumsReducer,
  appReducer,
  viewerReducer,
  tagsReducer,
  albumReducer,
} from './states';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  assets: assetsReducer,
  albums: albumsReducer,
  permissions: permissionsReducer,
  app: appReducer,
  viewer: viewerReducer,
  tags: tagsReducer,
  album: albumReducer,
});

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
export default store;
sagaMiddleware.run(rootSaga);
