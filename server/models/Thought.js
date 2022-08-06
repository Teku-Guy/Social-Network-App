const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
      //Must be between 1 and 280 characters
      minLength: [1, 'Must be between 1 and 280 characters'],
      maxLength: [280, 'Must be between 1 and 280 characters']
    },
    createdAt: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    //import reactionSchema from reaction.js
    reactions:[reactionSchema],
    likes: [
      {
        username: String,
        createdAt: String
      }
    ]
  },
  {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
  }
);

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
    //returns reaction couunt
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;