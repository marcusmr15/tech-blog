// Import necessary modules
const router = require("express").Router();
const { Comment } = require("../../models"); // Import Comment model
const withAuth = require("../../utils/auth"); // Import authentication middleware

// Route to create a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new comment with the provided data and user_id from the session
    const newComment = await Comment.create({
      ...req.body, // Extract data from request body
      user_id: req.session.user_id, // Associate the comment with the current user
    });
    // Send a response with the new comment data
    res.status(200).json(newComment);
  } catch (err) {
    // Send an error response if something went wrong
    res.status(400).json(err);
  }
});

// Export the router
module.exports = router;
