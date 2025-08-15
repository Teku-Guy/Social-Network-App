import { Schema, model, Types } from 'mongoose';

//Comment Schema
const CommentSchema = new Schema(
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

export default CommentSchema;