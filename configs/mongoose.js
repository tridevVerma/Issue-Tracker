const env = require("./environment");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

main().catch((err) => console.log(err.message));

// connect to mongodb via mongoose
async function main() {
  await mongoose.connect(env.mongodb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Successfully connected to db");
}
