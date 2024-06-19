// Middleware function to check if user is logged in
const withAuth = (req, res, next) => {
  // Check if user is logged in
  if (!req.session.logged_in || !req.session.user_id) {
    // If user is not logged in, redirect to login page
    return res.redirect("/login");
  }
  // If user is logged in, continue to next middleware or route
  next();
};

// Export the withAuth middleware function
module.exports = withAuth;

    