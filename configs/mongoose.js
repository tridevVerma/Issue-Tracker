const env = require("./environment");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb://${env.mongodb_domain}:${env.mongodb_port}/${env.db_name}`,
    {
      useNewUrlParser: true,
    }
  );
  console.log("Successfully connected to db");
}
