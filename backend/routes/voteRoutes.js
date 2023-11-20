const express = require("express");
const router = express.Router();
const { getVotes, vote, unVote } = require("../controllers/voteController");

router.post("/", getVotes);
router.post("/up", vote);
router.delete("/down", unVote);

module.exports = router;
