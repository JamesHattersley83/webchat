import actionTypes from '../actions/actionTypes';

const initialState = {
  messages: '',
  connectedStatus: false,
  users: [],
};

export default (state = initialState, action) => {
  console.log(action, state);
  let updated = Object.assign({}, state);

  switch (action.type) {
    case actionTypes.SET_UI_MESSAGE:
      updated['messages'] =
        updated['messages'] + action.username + ':' + action.message + '\n';
      return updated;
    case actionTypes.SET_CONNECTED_STATUS:
      updated['connectedStatus'] = action.status;
      return updated;
    case actionTypes.SET_USER_LIST:
      updated['users'] = action.users.users;
      return updated;
    case actionTypes.SET_USER_JOINED:
      updated['users'] = updated['users'].push(action.user);
      return updated;
    case actionTypes.SET_USER_REMOVED:
      updated['users'] = updated['users'].filter(
        (item) => item !== action.userid
      );
      return updated;
    default:
      return state;
  }
};
