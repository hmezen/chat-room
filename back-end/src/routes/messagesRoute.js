const express = require("express");
const cors = require("cors");
const router = express.Router();
router.all("*", cors());
const { getMessages } = require("../messages");

router.get("/rooms/:roomId/messages", (req, res) => {
  const messages = getMessages(req.params.roomId);
  return res.json({ messages });
});

module.exports = router;
