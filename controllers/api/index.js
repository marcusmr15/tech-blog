// Import necessary modules
const router = require("express").Router();
const userRoutes = require("./userRoutes"); // Import user routes
const postRoutes = require("./postRoutes"); // Import post routes
const commentRoutes = require("./commentRoutes"); // Import comment routes

// Set up the routes
router.use("/users", userRoutes); // Routes for user-related functionality
router.use("/posts", postRoutes); // Routes for post-related functionality
router.use("/comments", commentRoutes); // Routes for comment-related functionality

// Export the router
module.exports = router;
