const router = require("express").Router();
const IssuesController = require("../controllers/IssuesController");

router.post("/create", IssuesController.create);

module.exports = router;
