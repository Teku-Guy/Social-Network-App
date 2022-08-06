const { User, Thought, Reaction }= require('../models');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = { 
  Query: { 
    users: async (parent, args, context) => {
      const userData = await User.find();
      return userData;
    },
    user: async(parent, args, context) => {
      const userData = await User.findOne({'username': args.username});
      return userData;
    }
  },
  Mutation: {
    //create user data
    register: async (parents, {
      registerInput: { username, email, password, confirmPassword}
    }, context) => {
      const checkUser = await User.findOne({username});
      if(checkUser){
        throw new UserInputError('Username is taken', {
          errors: {username: 'This username is taken'}
        })
      }
      const newUser = await User.create(args);
      return newUser;
    },
    destroyUser: async (parents, args) => {

    },
    addThought: async (parents, args) => {
      const newThought = await Thought.create(args);
      console.log(newThought);
      return newThought;
    },
    destroyThought: async (parents, args) => {},
    addFriend: async (parents, args) => {},
    removeFriend: async (parents, args) => {}

  }
};

module.exports = resolvers;