const router = require('express').Router();
const { getAllUsers } = require('../../controllers/user-controller');

// duplicate route paths are combined, imported controller methods are implmented
// - route | /api/pizzas | GET all
router
  .route('/')
  .get(getAllUsers);

module.exports = router;
