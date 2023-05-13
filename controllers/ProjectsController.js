const Project = require("../models/Project");
const Issue = require("../models/Issue");

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

module.exports.previousIssuesList = async (req, res) => {
  console.log(req.params);
  const project = await Project.findOne({ _id: req.params.projectID }).populate(
    "issues"
  );

  let labels = project.issues.reduce(
    (ans, issue) => [...ans, ...issue.labels],
    []
  );

  labels = [...new Set(labels)];

  return res.status(200).json({
    success: true,
    labels,
  });
};

module.exports.filter = async (req, res) => {
  let results = [];
  console.log(req.body);

  const { type, projectID } = req.body;

  try {
    switch (type) {
      case "filter-by-labels":
        const filtersList = req.body.labelsList.toUpperCase().split(",");
        let filteredIssues = await Promise.all(
          filtersList.map(async (issue) => {
            return await Issue.find({
              $and: [{ project: projectID }, { labels: issue }],
            }).sort({
              createdAt: -1,
            });
          })
        );

        filteredIssues = filteredIssues.reduce((ans, data) => {
          return [...ans, ...data];
        }, []);

        results = [
          ...new Map(filteredIssues.map((item) => [item.id, item])).values(),
        ];
        break;

      case "filter-by-author":
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(200).json({
    success: true,
    filteredData: results,
  });
};
