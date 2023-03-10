const { User, Thought } = require("../models");

const userController = {
  // create | odm | method posts a user document
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // read | odm | method gets all user documents
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v", // ignored in the req
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 }) // DESC order, newest user at the top of the list
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "user does not exist" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // update | odm | method updates a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "user does not exist" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete | odm | method deletes a user
  deleteUser({ params }, res) {
    // locates the queried user by its id
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "user does not exist" });
          return;
        }

        // deletes all thoughts that are located within this user doc under its 'thoughts' field/value
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => res.json({ message: "deleted user and associated thoughts" }))
      .catch((err) => res.status(500).json(err));
  },

  // friends
  // - post | adds friend to User doc friends field
  addFriend({ params }, res) {
    //
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "user does not exist" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // - delete | removes friend from User doc friends field
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "user does not exist" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
