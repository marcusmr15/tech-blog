// Import necessary packages and models
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to render homepage
router.get("/", async (req, res) => {
  try {
    // Find all posts with associated usernames
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    // Convert post data to plain JavaScript object
    const posts = postData.map((post) => post.get({ plain: true }));
    // Render homepage template with posts and login status
    res.render('homePage', {
      layout: 'main', 
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If there is an error, return 500 status code and error message
    res.status(500).json(err);
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
    // Convert post data to plain JavaScript object
    const post = postData.get({ plain: true });
    // Render post template with post data and login status
    res.render("post", {
      layout: "main", // Specify the layout file name here without extension
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If there is an error, return 500 status code and error message
    res.status(500).json(err);
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
        username: post.User.username
      }
    }));

    res.status(200).json({ posts }); // Ensure response is { posts: [...] }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Route to render login page
router.get("/login", (req, res) => {
  // Redirect to dashboard if already logged in
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login", { layout: "main" }); // Specify the layout file name here without extension
});

// Route to render signup page
router.get("/signup", (req, res) => {
  // Redirect to dashboard if already logged in
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
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
      res.status(404).json({ message: "No post found with this id!" });
      return;
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
    // If there is an error, return 500 status code and error message
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to render the dashboard page
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Fetch all posts with associated usernames
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [['createdAt', 'DESC']], // Optional: Order posts by createdAt descending
    });

    // Convert post data to plain JavaScript object
    const posts = postData.map(post => ({
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      user: {
        username: post.User.username,
      },
    }));

    // Render the dashboard template with posts and login status
    res.render("dashboard", {
      layout: "main", // Specify the layout file name here without extension
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If there is an error, return 500 status code and error message
    console.error(err);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});


// Export the router
module.exports = router;
