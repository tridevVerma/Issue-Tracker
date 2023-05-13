const Project = require("../models/Project");
const Issue = require("../models/Issue");

module.exports.create = async (req, res) => {
  console.log(req.body);
  const { title, author, desc, issues, projectID } = req.body;

  const project = await Project.findOne({ _id: projectID });

  if (!project) {
    return res.status(400).json({
      success: false,
      message: "Project doesn't exist!!",
    });
  }

  const newIssue = await Issue.create({
    project: projectID,
    title,
    author,
    desc,
    labels:
      typeof issues === "string"
        ? issues.toUpperCase()
        : issues.map((iss) => iss.toUpperCase()),
  });

  project.issues.push(newIssue);
  await project.save();

  return res.status(200).json({
    success: true,
    newIssue,
  });
};

module.exports.getIssueAuthorNames = async (req, res) => {
  try {
    const authors = await Issue.find({}).select("author -_id");

    const result = authors.reduce((ans, obj) => [...ans, obj.author], []);

    return res.status(200).json({
      success: true,
      data: {
        authors: [...new Set(result)],
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
