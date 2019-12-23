import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import chatReducer from '../reducers/chatReducer';

const store = createStore(
  combineReducers({
    auth: authReducer,
    chat: chatReducer
  }),
  applyMiddleware(thunk)
);

export default store;
