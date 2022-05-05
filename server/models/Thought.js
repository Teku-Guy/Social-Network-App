const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      //Must be between 1 and 280 characters
      minLength: [1, 'Must be between 1 and 280 characters'],
      maxLength: [280, 'Must be between 1 and 280 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    //username
    username: {
        type: String,
        required: true
    },
    //import reactionSchema from reaction.js
    reactions:[reactionSchema]
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