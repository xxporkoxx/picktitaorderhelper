import { createStore, applyMiddleware } from 'redux';
import { Reducers } from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk ,logger);

export const Store = createStore(Reducers, middleware);