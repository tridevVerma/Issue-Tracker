const Project = require("../models/Project");
const Issue = require("../models/Issue");

// Create New Issue
module.exports.create = async (req, res) => {
  const { title, author, desc, issues, projectID, previousIssues } = req.body;
  try {
    // find project
    const project = await Project.findOne({ _id: projectID });

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Project doesn't exist!!",
      });
    }

    let labels = [];

    if (typeof issues === "string") {
      // Store issue labels in upper case only
      labels.push(issues.toUpperCase());
    } else {
      labels = issues ? issues.map((iss) => iss.toUpperCase()) : [];
    }

    if (previousIssues) {
      // add custom issue
      labels.push(previousIssues.toUpperCase());
    }

    // create issue
    const newIssue = await Issue.create({
      project: projectID,
      title,
      author,
      desc,
      labels,
    });

    // push new issue inside project's issue array
    project.issues.push(newIssue);
    await project.save();

    return res.status(200).json({
      success: true,
      newIssue,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get all issue author's names
module.exports.getIssueAuthorNames = async (req, res) => {
  try {
    const authors = await Issue.find({}).select("author -_id");

    // Convert it to simple array of names
    const result = authors.reduce((ans, obj) => [...ans, obj.author], []);

    return res.status(200).json({
      success: true,
      data: {
        authors: [...new Set(result)], // remove duplicacy with Set
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
