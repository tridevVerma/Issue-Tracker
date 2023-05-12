const router = require("express").Router();
const HomeController = require("../controllers/HomeController");

router.get("/", HomeController.UI);
router.use("/projects", require("./projects"));
router.use("/issues", require("./issues"));

module.exports = router;
