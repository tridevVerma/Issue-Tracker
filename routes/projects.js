const router = require("express").Router();
const projectsController = require("../controllers/ProjectsController");

router.get("/all-projects", projectsController.UI);
router.post("/add-project", projectsController.addProject);
router.get("/:projectID", projectsController.details);
router.get(
  "/previous-issues/:projectID",
  projectsController.previousIssuesList
);
router.post("/filter", projectsController.filter);

module.exports = router;
