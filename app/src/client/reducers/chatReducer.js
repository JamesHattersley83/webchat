import actionTypes from '../actions/actionTypes';

const initialState = {
  messages: 'Testing...'
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    default:
      return state;
  }
};
