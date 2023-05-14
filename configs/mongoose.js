const env = require("./environment");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

// connect to mongodb via mongoose
async function db() {
  await mongoose.connect(env.mongodb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Successfully connected to db");
}

module.exports = db;
