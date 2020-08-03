import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import chatReducer from '../reducers/chatReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    auth: authReducer,
    chat: chatReducer,
  }),
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
