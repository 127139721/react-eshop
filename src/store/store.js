import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from "redux-saga";

import { rootReducer } from './root.reducer';
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

//before your actions hit your reducer, the middlewares will receive your actions.
const middlewares = [logger, sagaMiddleware]; //可以有多個 middlewares. ex. [logger, logger2, ....]

//將 moddlewares 加入 compose(他可以幫你依序處理 middlewares)
const composedEnhancers = compose(applyMiddleware(...middlewares));

//for reducer persist
const persistConfig = {
    key: 'root',//root reducer
    storage, //import storage
    blacklist: ['user'], //不想存 user reducder 資料
    whitelist: ['cart'], //暫存 shopping cart 資料
};
//產生 persisted reducer object
const persistedReducer = persistReducer(persistConfig, rootReducer);


//params. 1:your reducer(we use persisted reducer), 2:default initial state, 3:middlewares
export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

//creating a persistor object
export const persistor = persistStore(store); 