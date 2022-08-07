const { Schema, model, Types } = require('mongoose');

//Reaction Schema
const ReactionSchema = new Schema(
    {
      body: {
          type: String,
          required: true,
          //280 character maximum
          maxLength: [280, 'Max characters of 280 is allowed.']
      },
      //username
      username: String,
      createdAt: {
          type: String
      },
    },
    {
      toJSON: {
          getters: true
      }
    }    
);

module.exports = ReactionSchema;