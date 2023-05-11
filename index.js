const env = require("./configs/environment");
const express = require("express");
const app = express();
require("./configs/mongoose"); // mongoose connection
var expressLayouts = require("express-ejs-layouts"); // use layouts with ejs
const cookieParser = require("cookie-parser"); // cookie parser required by connect-flash
const session = require("express-session"); // express-session required by connect-flash
const flash = require("connect-flash"); // to show toast messages
const { customFlash } = require("./configs/customFlashMiddleware.js"); // toast messages configuration
const port = env.server_port;

// set up body parser and path of static files
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(env.asset_path));

// set up express-ejs-layouts
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// set up ejs
app.set("view engine", "ejs");
app.set("views", env.views_path);

app.use(
  session({
    name: "Issue-Tracker",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000,
    },
  })
);

// configure flash messages (already configured cookie-parser and express-session above)
app.use(flash());
// setup custom flash to store req.flash() toast msg by server to res.locals.flash which can be accessed by views(ejs)
app.use(customFlash);

// set up routes
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in starting server");
  }
  console.log("Server connected at:", port);
});
