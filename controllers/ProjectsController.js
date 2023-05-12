const Project = require("../models/Project");

module.exports.addProject = async (req, res) => {
  try {
    console.log(req.body);
    const newProject = await Project.create(req.body);

    return res.status(200).json({
      success: true,
      addedProject: newProject,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.UI = async (req, res) => {
  const allProjects = await Project.find({}).sort({ createdAt: -1 });

  return res.render("AllProjects", {
    title: "All Projects",
    allProjects,
  });
};

module.exports.details = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectID }).populate(
    "issues"
  );

  return res.render("ProjectDetails", { title: "Details Page", project });
};

module.exports.filter = (req, res) => {
  try {
    console.log(req.body);
    return res.status(200).json({
      success: true,
      filteredIssues: [],
    });
  } catch (err) {
    console.log("Error:", err.message);
  }
};
