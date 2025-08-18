import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, 
      minLength: [6, 'Must be atleast 6 characters long'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    bio: { type: String, trim: true },
    profileImgUrl: { type: String, trim: true },
    createdAt: String,
    // following: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    toJSON: { virtuals: true },
  }
);

UserSchema.virtual('followingCount').get(function () {
  // If you later enable `following`, this will reflect its length.
  return this.following?.length ?? 0;
});

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

export default User;