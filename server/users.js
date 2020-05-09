const users = [];

const addUser = ({ id, nickname, room }) => {
  const userIdx = getUserIdx({ nickname, room });

  if (userIdx === -1) {
    return {
      error: "User already exists",
    };
  }

  users.push({ id, nickname, room });

  return { id, nickname, room };
};

const removeUser = ({ id, nickname, room }) => {
  const userIdx = getUserIdx({ nickname, room });

  if (userIdx === -1) {
    return {
      error: "User not found!",
    };
  }
  users.splice(userIdx, 1);
  return { id, nickname, room };
};

const getUserById = (id) => {
  return users.find((user) => user.id === id)[0];
};

const getUserIdx = ({ nickname, room }) => {
  return users.findIndex(
    (user) => user.nickname === nickname && user.room === room
  );
};

module.exports = { addUser, removeUser, getUserById };
