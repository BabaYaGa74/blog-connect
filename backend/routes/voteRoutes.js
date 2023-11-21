const express = require("express");
const router = express.Router();
const { getVotes, vote, downVote } = require("../controllers/voteController");

router.post("/", getVotes);
router.post("/up", vote);
router.post("/down", downVote);

module.exports = router;
