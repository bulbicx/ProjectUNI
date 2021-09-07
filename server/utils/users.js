let users = [];

// Join user to chat
function userJoin(id, username) {
  const user = { id, username };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
  
    //if not found return -1
    if (index !== -1) {// found user
      return users.splice(index, 1)[0];
    }
}
  

function getAllUsers() {
    return users
}

function removeAllUsers() {
  users = []
}

module.exports = {
    userJoin,
    getCurrentUser,
    getAllUsers,
    userLeave,
  removeAllUsers,
}