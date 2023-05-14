const env = require("./configs/environment");
const path = require("path");
const express = require("express");
const app = express();
const db = require("./configs/mongoose"); // mongoose connection
var expressLayouts = require("express-ejs-layouts"); // use layouts with ejs
require("./configs/viewHelper")(app); // provide app to be used by viewHelper to provide local fn to all views
const port = env.server_port;

// set up body parser and path of static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, env.asset_path)));

// set up express-ejs-layouts
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// set up ejs
app.set("view engine", "ejs");
app.set("views", env.views_path);

// set up routes
app.use("/", require("./routes"));

db()
  .then(() => {
    app.listen(port, (err) => {
      if (err) {
        console.log("Error in starting server");
      }
      console.log("Server connected at:", port);
    });
  })
  .catch((err) => console.log(err.message));
