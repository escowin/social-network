const { Thought, User } = require("../models");

const thoughtController = {
  // - create
  createThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } }, // adds thought id to user document
          { new: true } // true | allows update, user document will include thought
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "user does not exist" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // - read
  getAllThoughts(req, res) {
    Thought.find({})
      // .populate()
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getThoughtById(req, res) {},

  // - put
  updateThought(req, res) {},

  // - delete
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deleteThought) => {
        if (!deleteThought) {
          return res.status(404).json({ message: "thought does not exist" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thought: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "user does not exist" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
