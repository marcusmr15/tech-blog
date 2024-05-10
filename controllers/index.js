// Import the necessary modules and routes
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
// Set up routes
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
// Export the router
module.exports = router;