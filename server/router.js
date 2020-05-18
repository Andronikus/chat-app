const router = require("express").Router();

const { getUserIdx } = require("./users");

router.get("/getUser", (req, res) => {
  const { nickname, room } = req.query;
  const nicknameNormalized = nickname.trim().toLowerCase();

  const userIdx = getUserIdx({ nicknameNormalized, room });

  let response = {};

  if (userIdx >= 0) {
    response = { nickname, room };
  }

  res.send(response);
});

module.exports = router;
