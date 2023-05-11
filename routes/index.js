const router = require("express").Router();
const HomeController = require("../controllers/HomeController");

router.get("/", HomeController.UI);
router.use("/projects", require("./projects"));

module.exports = router;
