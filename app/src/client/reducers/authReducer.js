import actionTypes from '../actions/actionTypes';

const initialState = {
  regStatus: '',
  logStatus: '',
  userid: '',
  username: '',
  token: '',
  loggedIn: false,
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case actionTypes.SET_REGISTER_STATUS:
      updated['regStatus'] = action.status;
      return updated;
    case actionTypes.SET_LOGIN_STATUS:
      updated['logStatus'] = action.status;
      return updated;
    case actionTypes.SET_LOGIN_USER:
      updated['userid'] = action.userid;
      updated['username'] = action.username;
      updated['token'] = action.token;
      updated['loggedIn'] = true;
      return updated;
    default:
      return state;
  }
};
