const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// schema
// - subdocument | reaction
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);

// - document | thought
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      // current char range
      minLength: 1,
      maxLength: 280,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter method
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

// virtual | gets the total reaction count
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
