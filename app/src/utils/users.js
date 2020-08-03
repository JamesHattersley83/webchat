const users = [];

// addNewUser
const addNewUser = (userid, username, socketID) => {
  const user = { userid, username, socketID };

  users.push(user);
  console.log(users);

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

// getUsers
const getUsers = () => {
  const newUsers = users.map(({ socketID, ...item }) => item);
  return newUsers;
};

module.exports = {
  addNewUser,
  removeUserByUserID,
  getUsers,
};
