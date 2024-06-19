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
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      console.log(`User logged in: ${req.session.user_id}`); // Debug log

      res.status(200).json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
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

// Route to check if the user is logged in
router.get("/check-session", (req, res) => {
  if (req.session.logged_in) {
    res.json({ logged_in: true });
  } else {
    res.json({ logged_in: false });
  }
});

// Export the router
module.exports = router;
