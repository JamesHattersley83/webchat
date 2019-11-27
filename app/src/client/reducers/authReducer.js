import actionTypes from '../actions/actionTypes';

const initialState = {
  regStatus: 'Test'
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case actionTypes.SET_REGISTER_STATUS:
      updated['regStatus'] = action.status;
      return updated;

    default:
      return state;
  }
};
