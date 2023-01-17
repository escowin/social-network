const router = require("express").Router();
const { createThought, getAllThoughts } = require("../../controllers/thought-controller");

// - route | /api/thoughts/ | GET all
router.route("/").get(getAllThoughts);

// - route | /api/thoughts/:userId/ | POST
router.route("/:userId").post(createThought);

// - route | /api/thoughts/:userId/:thoughtId | PUT, DELETE
router.route("/:userId/:thoughtId").put().delete();

module.exports = router;