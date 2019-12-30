import actionTypes from '../actions/actionTypes';

const initialState = {
  messages: ''
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case actionTypes.SET_UI_MESSAGE:
      updated['messages'] =
        updated['messages'] + action.username + ':' + action.message + '\n';
      return updated;
    default:
      return state;
  }
};
