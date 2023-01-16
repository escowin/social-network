const { Schema, model, SchemaType } = require("mongoose");
// const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // mongoose matching validation | valid email
            trim: trim
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: SchemaType.Types.ObjectId,
                // self-referencing
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

UserSchema.virtual("friendCount").get(function () {
    // create a virtual called friendCount that retrieves the length of the user's friends array field on query.
})