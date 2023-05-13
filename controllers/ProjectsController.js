const Project = require("../models/Project");
const Issue = require("../models/Issue");

// Add New Project
module.exports.addProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);

    return res.status(200).json({
      success: true,
      addedProject: newProject,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Render All Projects Page
module.exports.UI = async (req, res) => {
  const allProjects = await Project.find({}).sort({ createdAt: -1 });

  return res.render("AllProjects", {
    title: "All Projects",
    allProjects,
  });
};

// Render Detailed Project Page
module.exports.details = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectID }).populate(
    "issues"
  );

  return res.render("ProjectDetails", { title: "Details Page", project });
};

// Get all the previous issues list on a project
module.exports.previousIssuesList = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectID }).populate(
    "issues"
  );

  // make it a simple array of issues
  let labels = project.issues.reduce(
    (ans, issue) => [...ans, ...issue.labels],
    []
  );

  // remove duplicacy
  labels = [...new Set(labels)];

  return res.status(200).json({
    success: true,
    labels,
  });
};

// Apply filters on Issues
module.exports.filter = async (req, res) => {
  let results = [];

  // type --> type of filter (label-filter, author-filter, search-filter)
  // projectID --> project on which filters are applied
  const { type, projectID } = req.body;

  try {
    switch (type) {
      case "filter-by-labels":
        // Filter Issues by labels
        const filtersList = req.body.labelsList.toUpperCase().split(",");

        // Collect all issues found on project's issues list
        let filteredIssues = await Promise.all(
          filtersList.map(async (issue) => {
            return await Issue.find({
              $and: [{ project: projectID }, { labels: issue }],
            }).sort({
              createdAt: -1,
            });
          })
        );

        // Make them simple array of issues
        filteredIssues = filteredIssues.reduce((ans, data) => {
          return [...ans, ...data];
        }, []);

        // remove duplicacy
        results = [
          ...new Map(filteredIssues.map((item) => [item.id, item])).values(),
        ];
        break;

      case "filter-by-author":
        // Filter by Author names
        const filteredAuthor = await Issue.find({
          $and: [
            { project: projectID },
            {
              author: req.body.authorName,
            },
          ],
        }).sort({ createdAt: -1 });
        results = filteredAuthor;
        break;

      case "search":
        // Filter by Title / Description Search
        const { searchBy } = req.body;
        const filteredSearch = await Issue.find({
          $and: [
            { project: projectID },
            {
              $text: { $search: searchBy },
            },
          ],
        }).sort({ createdAt: -1 });
        results = filteredSearch;
        break;
      default:
        break;
    }
    return res.status(200).json({
      success: true,
      filteredData: results,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
