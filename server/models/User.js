const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true 
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
        //match a valid email address
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    createdAt: String,
    //friends model thru id
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
  },
  {
    toJSON: {
        virtuals: true
    }
  }
);

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
  //returns the length of the friends array
  return this.friends.length;
});

UserSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

UserSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema)

module.exports = User;