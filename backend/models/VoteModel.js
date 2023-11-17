const db = require("../config/dbConfig");

const votemodel = {
  vote: async (postId, userId) => {
    const query = "INSERT INTO vote (postId, userId) VALUES (?, ?)";
    const values = [postId, userId];

    try {
      await db.query(query, values);
      return { success: true, message: "Vote recorded successfully." };
    } catch (error) {
      console.error("Error voting:", error);
      throw new Error("Error voting for the post.");
    }
  },

  // Function to unvote a post
  unvote: async () => {
    const query = "DELETE FROM votes WHERE post_id = ? AND user_id = ?";
    const values = [this.postId, this.userId];

    try {
      await db.query(query, values);
      return { success: true, message: "Vote removed successfully." };
    } catch (error) {
      console.error("Error unvoting:", error);
      throw new Error("Error removing vote for the post.");
    }
  },
};

module.exports = votemodel;
