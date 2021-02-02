const users = [];

// addNewUser
const addNewUser = (userid, username, socketID) => {
  const user = { userid, username, socketID };
  users.push(user);

  return user;
};

// removeUserByUserID
const removeUserByUserID = (id) => {
  const index = getUserByObjectBySocketID(id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// getUserObjectBySocketID
const getUserByObjectBySocketID = (id) => {
  return users.findIndex((user) => user.socketID === id);
};

const getUserById = (id) => {
  const user = users.filter((user) => user.socketID === id);
  return user[0];
};

// getUsers
const getUsers = () => {
  const newUsers = users.map(({ socketID, ...item }) => item);
  return newUsers;
};

// get user by userid
const getUserbyUserid = (userid) => {
  const user = users.filter((user) => user.userid === userid);
  return user[0];
}

module.exports = {
  addNewUser,
  removeUserByUserID,
  getUserById,
  getUsers,
  getUserbyUserid
};
