const env = require("./configs/environment");
const express = require("express");
const app = express();
require("./configs/mongoose"); // mongoose connection
var expressLayouts = require("express-ejs-layouts"); // use layouts with ejs

const port = env.server_port;

// set up body parser and path of static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(env.asset_path));

// set up express-ejs-layouts
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// set up ejs
app.set("view engine", "ejs");
app.set("views", env.views_path);

// set up routes
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in starting server");
  }
  console.log("Server connected at:", port);
});
