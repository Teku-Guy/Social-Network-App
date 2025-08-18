import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      maxLength: [280, 'Max characters of 280 is allowed.'],
    },
    username: String,
    createdAt: String,
  },
  {
    toJSON: { getters: true },
  }
);

export default CommentSchema;