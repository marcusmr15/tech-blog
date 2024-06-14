const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require('express-handlebars');
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

// Create Handlebars instance with custom helpers and configuration
const hbs = exphbs.create({
  helpers,
  layoutsDir: `${__dirname}/views/layouts`, // Path to layouts directory
  defaultLayout: 'main', // Name of main layout file without extension
  extname: '.handlebars' // File extension of the templates
});

// Session configuration
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Set cookie expiration (in milliseconds)
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Set Handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
app.use(routes);

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
