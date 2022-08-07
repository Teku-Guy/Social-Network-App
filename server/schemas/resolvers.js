const { User, Thought, Reaction }= require('../models');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
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
    },
    thoughts: async(parent, args, context) => {
      const thoughtsData = await Thought.find();
      return thoughtsData;
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
      const user = await User.create({
        email, 
        username, 
        password, 
        createdAt: new Date().toISOString()
      });
      const token = signToken(user);
      return {token, user};
    },
    login: async (_, {username, password}) => {
      //check if username already exists
      const user = await User.findOne({username});
      if(!user){
        throw new AuthenticationError('Username not found')
      }
      //check if password matches
      const match = await user.isCorrectPassword(password);
      if(!match){
        throw new AuthenticationError('Incorrect password')
      }

      const token = signToken(user);
      return {token, user};
    },
    destroyUser: async (parents, args) => {
      //todo delete user
    },
    addThought: async (parents, args) => {
      console.log(args.user, args.body);
      const getUser = await User.findOne({'username': args.user});
      console.log(getUser._id);
      const newThought = await Thought.create({'body': args.body, 'user': getUser._id});
      console.log(newThought);
      const updatedUser = await User.findByIdAndUpdate({'_id': getUser._id}, {"$set": {'thought': newThought._id}});
      console.log(updatedUser);
      return newThought;
    },
    destroyThought: async (parents, args) => {},
    addFriend: async (parents, args) => {},
    removeFriend: async (parents, args) => {}

  }
};

module.exports = resolvers;