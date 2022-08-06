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
      body: {
          type: String,
          required: true,
          //280 character maximum
          maxLength: [280, 'Max characters of 280 is allowed.']
      },
      //username
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      createdAt: {
          type: String
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