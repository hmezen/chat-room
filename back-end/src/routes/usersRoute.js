const express = require("express");
const cors = require("cors");
const router = express.Router();
router.all("*", cors());
const { getUsersInRoom } = require("../users");

router.get("/rooms/:roomId/users", (req, res) => {
  const users = getUsersInRoom(req.params.roomId);
  return res.json({ users });
});

module.exports = router;
