import actionTypes from '../actions/actionTypes';

const initialState = {
  messages: [],
  connectedStatus: false,
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_UI_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.username + ':' + action.message + '\n',
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
