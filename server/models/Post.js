import { Schema, model } from 'mongoose';
import commentSchema from './Comment.js';

const PostSchema = new Schema(
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
    username: String,
    //import reactionSchema from reaction.js
    comments:[commentSchema],
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
    }
  }
);

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
PostSchema.virtual('commentCount').get(function() {
    //returns reaction couunt
    return this.comments.length;
});

PostSchema.virtual('likeCount').get(function() {
  //returns reaction couunt
  return this.likes.length;
});

const Post = model('Post', PostSchema);

export default Post;