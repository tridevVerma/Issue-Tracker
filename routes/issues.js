const router = require("express").Router();
const IssuesController = require("../controllers/IssuesController");

router.post("/create", IssuesController.create);
router.get("/authors", IssuesController.getIssueAuthorNames);

module.exports = router;
