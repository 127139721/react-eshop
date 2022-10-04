import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root.reducer';

//before your actions hit your reducer, the middlewares will receive your actions.
const middlewares = [logger]; //可以有多個 middlewares. ex. [logger, logger2, ....]

//將 moddlewares 加入 compose(他可以幫你依序處理 middlewares)
const composedEnhancers = compose(applyMiddleware(...middlewares));

//params. 1:your reducer, 2:default initial state, 3:middlewares
export const store = createStore(rootReducer, undefined, composedEnhancers);

