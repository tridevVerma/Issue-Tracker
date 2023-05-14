const development = {
  name: "development",
  domain: "localhost",
  mongodb_URI: "mongodb://127.0.0.1:27017/issue_tracker_dev",
  db_name: "issue_tracker_dev",
  server_port: 8000,
  asset_path: "./assets",
  views_path: "./views",
};

const production = {
  name: "development",
  domain: "localhost",
  mongodb_URI:
    "mongodb+srv://tridev23:s1n3qN0vf5NLeTkG@cluster0.bljbc4x.mongodb.net/issue_tracker_db?retryWrites=true&w=majority",
  db_name: "issue_tracker_db",
  server_port: 8000,
  asset_path: "./assets",
  views_path: "./views",
};

module.exports = production;
