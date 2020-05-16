const users = [];

const printUsers = () => {
  console.log("users::", users);
};

const addUser = ({ id, nickname, room }) => {
  const nicknameNormalized = normalizeInput(nickname);

  const userIdx = getUserIdx({ nicknameNormalized, room });

  if (userIdx !== -1) {
    return {
      error: "User already exists",
    };
  }

  users.push({ id, nicknameNormalized, nickname, room });

  return { user: { id, nickname, room } };
};

const removeUser = (id) => {
  if (!id) {
    return {
      error: "Invalid user id!",
    };
  }

  const idx = users.findIndex((user) => user.id === id);

  let userRemoved = [{}];

  if (idx >= 0) {
    userRemoved = users.splice(idx, 1);
  }

  return userRemoved[0];
};

const getUserById = (id) => {
  const user = users.find((user) => user.id === id);
  if (user) {
    return user;
  }
};

const getUsersInRoom = (room) => {
  return users.find((user) => user.room === room);
};

const getUserIdx = ({ nicknameNormalized, room }) => {
  return users.findIndex(
    (user) =>
      user.nicknameNormalized === nicknameNormalized && user.room === room
  );
};

const normalizeInput = (input) => input.trim().toLowerCase();

module.exports = {
  addUser,
  removeUser,
  getUserById,
  getUsersInRoom,
  printUsers,
  getUserIdx,
};
