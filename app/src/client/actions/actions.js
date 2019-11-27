import actionTypes from './actionTypes';

export const setRegisterStatus = status => {
  return {
    type: actionTypes.SET_REGISTER_STATUS,
    status: status
  };
};
