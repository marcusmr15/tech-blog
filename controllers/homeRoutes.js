// Import necessary packages and models
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to render homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homePage", {
      layout: "main",
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json(err); // Return JSON error response or handle differently
  }
});

// Route to render individual post page
router.get("/post/:id", withAuth, async (req, res) => {
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
    
    if (!postData) {
      // Handle case where post is not found
      return res.status(404).json({ message: "No post found with this id!" });
    }
    
    // Convert post data to plain JavaScript object
    const post = postData.get({ plain: true });
    
    // Render post template with post data and login status
    res.render("post", {
      layout: "main", // Specify the layout file name here without extension
      ...post,
      logged_in: req.session.logged_in,
      postId: req.params.id, // Pass the postId to the template
    });
  } catch (err) {
    // Handle error if data retrieval fails
    console.error('Error fetching post:', err);
    res.status(500).json(err); // Return JSON error response or handle differently
  }
});

// Route to get all posts with associated usernames as JSON
router.get("/api/posts", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    const posts = postData.map(post => ({
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      user: {
        username: post.User ? post.User.username : null, // Safeguard against undefined User
      }
    }));

    res.status(200).json({ posts }); // Ensure response is { posts: [...] }
  } catch (err) {
    // Handle error if data retrieval fails
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Route to render login page
router.get("/login", (req, res) => {
  // Redirect to dashboard if already logged in
  if (req.session.logged_in) {
    return res.redirect("/dashboard");
  }
  res.render("login", { layout: "main" }); // Specify the layout file name here without extension
});

// Route to render signup page
router.get("/signup", (req, res) => {
  // Redirect to dashboard if already logged in
  if (req.session.logged_in) {
    return res.redirect("/dashboard");
  }
  res.render("signup", { layout: "main" }); // Specify the layout file name here without extension
});

// Route to render new post page
router.get("/newPost", (req, res) => {
  // Redirect to login page if not logged in
  if (req.session.logged_in) {
    res.render("newPost", { layout: "main" }); // Specify the layout file name here without extension
    return;
  }
  res.redirect("/login");
});

// Route to render the edit post page
router.get("/editPost/:id", withAuth, async (req, res) => {
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

    if (!postData) {
      // Handle case where post is not found
      return res.status(404).json({ message: "No post found with this id!" });
    }

    // Convert post data to plain JavaScript object
    const post = postData.get({ plain: true });

    // Render edit post template with post data and login status
    res.render("editPost", {
      layout: "main", // Specify the layout file name here without extension
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Handle error if data retrieval fails
    console.error('Error fetching post for edit:', err);
    res.status(500).json(err); // Return JSON error response or handle differently
  }
});

// Route to render the dashboard page
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Fetch all posts with associated usernames for the logged-in user
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id }, // Filter posts by user_id from session
      include: [{ model: User, attributes: ["username"] }],
      order: [['createdAt', 'DESC']], // Optional: Order posts by createdAt descending
    });

    // Convert post data to plain JavaScript object
    const posts = postData.map(post => ({
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      user: {
        username: post.User ? post.User.username : null, // Safeguard against undefined User
      },
    }));

    // Render the dashboard template with posts and login status
    res.render("dashboard", {
      layout: "main", // Specify the layout file name here without extension
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Handle error if data retrieval fails
    console.error('Error fetching posts for dashboard:', err);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});

// Route to check session data
router.get("/check-session", (req, res) => {
  res.json({
    user_id: req.session.user_id,
    logged_in: req.session.logged_in,
  });
});

// Export the router
module.exports = router;
