const express = require("express");
const router = express.Router();
const { getVotes, vote, unVote } = require("../controllers/voteController");

router.get("/", getVotes);
router.post("/", vote);
router.delete("/", unVote);

module.exports = router;
