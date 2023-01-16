const router = require("express").Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../../controllers/user-controller");

// duplicate route paths are combined, imported controller methods are implmented
// - route | /api/users/ | GET all, POST
router.route("/").get(getAllUsers).post(createUser);

// - route | /api/users/:id | GET one, PUT, DELETE
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
