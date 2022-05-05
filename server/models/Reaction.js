const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//Reaction Schema
const ReactionSchema = new Schema(
    {
      reactionId: {
        //object id with mongodb
        type: Types.ObjectId,
        default: new Types.ObjectId()
      },
      reactionBody: {
          type: String,
          required: true,
          //280 character maximum
          maxLength: [280, 'Max characters of 280 is allowed.']
      },
      //username
      username: {
          type: String,
          required: true
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => dateFormat(createdAtVal)
      },
    },
    {
      toJSON: {
          getters: true
      },
      id: false
    }    
);

module.exports = ReactionSchema;