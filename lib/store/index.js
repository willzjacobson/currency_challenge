import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import { NODE_ENV } from '../config';
import rootReducer from '../reducers';

const middleware = [thunk];
if (NODE_ENV === 'development')
  middleware.push(reduxImmutableStateInvariant(), logger);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
