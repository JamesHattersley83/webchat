import actionTypes from './actionTypes';

export const setRegisterStatus = (status) => {
  return {
    type: actionTypes.SET_REGISTER_STATUS,
    status: status,
  };
};

export const setLoginStatus = (status) => {
  return {
    type: actionTypes.SET_LOGIN_STATUS,
    status: status,
  };
};

export const userLoggedIn = (username, userid, token) => {
  return {
    type: actionTypes.SET_LOGIN_USER,
    username: username,
    userid: userid,
    token: token,
  };
};

export const registerNewUser = (username, password) => {
  const data = { username, password };
  return (dispatch) => {
    dispatch(setRegisterStatus('Attempting registration..'));

    return fetch('/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'cors',
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status == 400) {
            return response.json();
          }
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Success
          dispatch(userLoggedIn(data.username, data.userid, data.token));
          console.log(data);
        } else {
          // Server did not return success = true
          dispatch(setRegisterStatus('Error Registering user..'));
        }
      })
      .catch((e) => {
        // Exception
        dispatch(setRegisterStatus('Server Error..'));
      });
  };
};

export const loginUser = (username, password) => {
  const data = { username, password };
  return (dispatch) => {
    dispatch(setLoginStatus('Attempting login..'));

    return fetch(`/user/${data.username}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'cors',
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status == 400) {
            return response.json();
          }
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Success
          dispatch(userLoggedIn(data.username, data.userid, data.token));
          console.log(data);
        } else {
          // Server did not return success = true
          dispatch(setLoginStatus('Error Logging in user..'));
          console.log(data);
        }
      })
      .catch((e) => {
        // Exception
        dispatch(setLoginStatus('Server Error..'));
      });
  };
};

export const setUImessage = (msgTime, userid, content) => {
  return {
    type: actionTypes.SET_UI_MESSAGE,
    payload: {
      msgTime: msgTime,
      userid: userid,
      content: content,
    },
  };
};

export const setConnectedStatus = (status) => {
  return {
    type: actionTypes.SET_CONNECTED_STATUS,
    status: status,
  };
};

export const setUserList = (users) => {
  return {
    type: actionTypes.SET_USER_LIST,
    payload: users,
  };
};

export const setUserJoined = (user) => {
  return {
    type: actionTypes.SET_USER_JOINED,
    payload: user,
  };
};

export const setUserRemoved = (userid) => {
  return {
    type: actionTypes.SET_USER_REMOVED,
    payload: userid,
  };
};
