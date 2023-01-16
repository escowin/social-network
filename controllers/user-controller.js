const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        // '__v' ignored by mongoose
        select: "-__v",
      })
      .select("-__v") // mongoose will not return the pizza's __v field as well.
      .sort({ _id: -1 }) // DESC order, newest pizza at the top of the list
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};

module.exports = userController;
