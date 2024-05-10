// Import necessary modules
const router = require("express").Router();
const { User } = require("../../models");

// Route to get all users (excluding password field)
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to sign up a new user
router.post("/signup", async (req, res) => {
  try {
    // Create a new user instance with provided data
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Save the user data in session and log them in
    req.session.user_id = newUser.id;
    req.session.logged_in = true;

    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Route to log in a user
router.post("/login", async (req, res) => {
  try {
    // Find user by username
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      // If user not found, send error response
      res.status(400).json({ message: "Incorrect username or password, please try again" });
      return;
    }

    // Check if password is correct
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      // If password is incorrect, send error response
      res.status(400).json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Save user data in session and log them in
    req.session.user_id = userData.id;
    req.session.logged_in = true;

    res.status(200).json({ user: userData, message: "You are now logged in!" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Route to log out a user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Destroy session if user is logged in
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Export the router
module.exports = router;
