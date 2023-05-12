const Project = require("../models/Project");

module.exports.UI = async (req, res) => {
  const allProjects = await Project.find({}).sort({ createdAt: -1 }).limit(6);

  return res.render("Home", {
    title: "Home",
    allProjects,
  });
};
