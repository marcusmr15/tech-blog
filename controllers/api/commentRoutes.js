// Import necessary modules
const router = require("express").Router();
const { Comment } = require("../../models"); // Import Comment model
const withAuth = require("../../utils/auth"); // Import authentication middleware

// Route to create a new comment
router.post("/:postId", withAuth, async (req, res) => {
  try {
      const { comment_text } = req.body;
      const { postId } = req.params;

      const newComment = await Comment.create({
          comment_text,
          user_id: req.session.user_id, // Ensure user_id is correctly set based on session
          post_id: postId, // Associate comment with the correct post
      });

      res.status(200).json(newComment); // Respond with created comment data
  } catch (err) {
      console.error('Error adding comment:', err);
      res.status(400).json({ error: 'Failed to add comment' }); // Handle error response
  }
});

// Export the router
module.exports = router;
