const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //match a valid email address
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    //thoughts model thru id
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
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
    },
    id: false
  }
);

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
    //returns the length of the friends array
    return this.friends.length;
});

const User = model('User', UserSchema)

module.exports = User;