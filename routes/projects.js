const router = require("express").Router();
const projectsController = require("../controllers/ProjectsController");

router.post("/add-project", projectsController.addProject);

module.exports = router;
