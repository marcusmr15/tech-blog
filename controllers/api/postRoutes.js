// Import necessary modules
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth"); // Import authentication middleware

// Route to get all posts for the logged-in user
router.get("/", withAuth, async (req, res) => {
  try {
    console.log(`Fetching posts for user_id: ${req.session.user_id}`); // Debug log

    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });

    console.log(postData); // Debug log

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get one post by ID with associated username and comments
router.get("/:id", async (req, res) => {
  try {
    // Find post by ID with associated username and comments with associated usernames
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    // If post not found, send a 404 response
    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    // Send a response with the post data
    res.status(200).json(postData);
  } catch (err) {
    // Send an error response if something went wrong
    res.status(500).json(err);
  }
});

// Route to create a new post with authenticated user
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new post with the provided data and user_id from the session
    const newPost = await Post.create({
      ...req.body, // Extract data from request body
      user_id: req.session.user_id, // Associate the post with the current user
    });
    // Send a response with the new post data
    res.status(200).json(newPost);
  } catch (err) {
    // Send an error response if something went wrong
    res.status(400).json(err);
  }
});

// Route to update an existing post with authenticated user
router.put("/:id", withAuth, async (req, res) => {
  try {
    // Update the post with the provided data
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id, user_id: req.session.user_id }, // Ensure the post belongs to the logged-in user
    });

    // If post not found, send a 404 response
    if (!updatedPost[0]) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    // Send a response with the updated post data
    res.status(200).json(updatedPost);
  } catch (err) {
    // Send an error response if something went wrong
    res.status(500).json(err);
  }
});

// Route to delete a post with authenticated user
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete the post with the provided id and ensure it belongs to the logged-in user
    const deletedPost = await Post.destroy({
      where: { id: req.params.id, user_id: req.session.user_id },
    });

    // If post not found, send a 404 response
    if (!deletedPost) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    // Send a response with the deleted post data
    res.status(200).json(deletedPost);
  } catch (err) {
    // Send an error response if something went wrong
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;

