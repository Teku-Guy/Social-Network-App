import mongoose from 'mongoose';
import commentSchema from './Comment.js';

const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
      minLength: [1, 'Must be between 1 and 280 characters'],
      maxLength: [280, 'Must be between 1 and 280 characters'],
    },

    // Keep an actual ref to the user (for future joins/admin, etc.)
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Denormalized snapshot for fast reads (what your UI needs immediately)
    username: { type: String, required: true },
    profileImgUrl: { type: String, default: null },

    createdAt: { type: String, default: () => new Date().toISOString() },

    comments: [commentSchema],
    likes: [
      {
        username: String,
        createdAt: String,
      },
    ],
  },
  { toJSON: { virtuals: true, getters: true } }
);

// Handy virtuals
PostSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});
PostSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

// Optional: virtual to populate the full author when you *do* want it
PostSchema.virtual('author', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true,
});

// Auto-fill snapshot fields from the user ref when creating/updating
PostSchema.pre('validate', async function (next) {
  if (this.isModified('user') && this.user) {
    const User = mongoose.model('User');
    const u = await User.findById(this.user).select('username profileImgUrl').lean();
    if (u) {
      this.username = u.username;
      this.profileImgUrl = u.profileImgUrl ?? null;
    }
  }
  next();
});

const Post = model('Post', PostSchema);
export default Post;