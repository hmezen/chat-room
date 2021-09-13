let users = [];

const addUser = (socketId, roomId, name, avatarUrl, email) => {
  return new Promise((resolve, reject) => {
    if (!email || !roomId || !socketId)
      reject("socketId, email and room are required.");

    const existingUser = users.find(
      (user) => user.roomId === roomId && user.email === email
    );
    if (existingUser) throw reject("user is taken.");
    const user = { socketId, name, avatarUrl, roomId, email };
    users.push(user);
    resolve(user);
  });
};

const removeUser = (socketId) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user.socketId === socketId);
    if (index > -1) {
      users.splice(index, 1)[0];
      resolve(true);
    } else {
      reject("Can't find the user.");
    }
  });
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.roomId === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
