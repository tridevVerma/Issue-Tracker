const Project = require("../models/Project");

module.exports.addProject = async (req, res) => {
  try {
    console.log(req.body);
    const newProject = await Project.create(req.body);

    return res.status(200).json({
      success: true,
      data: {
        newProject,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
