const router = require("express").Router();
const { createThought, getAllThoughts } = require("../../controllers/thought-controller");

// - route | /api/thoughts/ | GET all, POST
router.route("/").get(getAllThoughts).post(createThought);

module.exports = router;