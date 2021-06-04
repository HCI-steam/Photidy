import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

// import { mergeReducers } from './common';
import rootSaga from './sagas';
import {
  assetsReducer,
  permissionsReducer,
  albumsReducer,
  appReducer,
} from './states';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  assets: assetsReducer,
  albums: albumsReducer,
  permissions: permissionsReducer,
  app: appReducer,
});

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
export default store;
sagaMiddleware.run(rootSaga);
