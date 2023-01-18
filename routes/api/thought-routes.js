const router = require("express").Router();
const {
  createThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require("../../controllers/thought-controller");

// - route | /api/thoughts/ | GET all
router.route("/:userId").get(getAllThoughts).post(createThought);

// - route | /api/thoughts/:thoughtId/ | GET one, POST, DELETE a thought associated with a specific user
router
  .route("/:userId/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// - route | /api/thoughts/:thoughtId/reactions | POST
router.route("/:thoughtId/reactions").post(addReaction)

// - route | /api/thoughts/:thoughtId/reactions/:reactionId | DELETE
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction)

module.exports = router;
