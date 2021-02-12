import actionTypes from '../actions/actionTypes';

const initialState = {
  messages: [],
  connectedStatus: false,
  users: [],
};

const getUsername = (userid, array) => {
  const aUser = array.find((x) => x.userid === userid);
  return aUser === undefined ? 'unknown' : aUser.username;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_UI_MESSAGE:
      const newUsername = getUsername(action.payload.userid, state.users);
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            username: newUsername,
            userid: action.payload.userid,
            content: action.payload.content,
            msgTime: action.payload.msgTime,
            type: action.payload.type
          },
        ],
      };
    case actionTypes.SET_CONNECTED_STATUS:
      return {
        ...state,
        connectedStatus: action.status,
      };
    case actionTypes.SET_USER_LIST:
      return {
        ...state,
        users: action.payload.users,
      };
    case actionTypes.SET_USER_JOINED:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case actionTypes.SET_USER_REMOVED:
      return {
        ...state,
        users: state.users.filter((user) => user.userid !== action.payload),
      };
    default:
      return state;
  }
};
