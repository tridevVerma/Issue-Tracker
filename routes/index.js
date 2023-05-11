const router = require("express").Router();
const HomeController = require("../controllers/HomeController");

router.get("/", HomeController.UI);

module.exports = router;
