const { AuthenticationError, UserInputError } = require('apollo-server-express');

const { User, Thought }= require('../models');
const { signToken } = require('../utils/auth');

const resolvers = { 
  Query: { 
    users: async (parent, args, context) => {
      const userData = await User.find();
      return userData;
    },
    user: async (parent, args, context) => {
      const userData = await User.findOne({'username': args.username});
      return userData;
    },
    getThoughts: async(parent, args, context) => {
      const thoughtsData = await Thought.find().sort({ createdAt: -1});
      return thoughtsData;
    },
    getThought: async (parent, {thoughtId}, context) => {
      const thoughtData = await Thought.findById(thoughtId);
      if(!thoughtData){
        throw new Error('Post not found');
      }
      return thoughtData;
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

    addThought: async (parents, { body, username }, context) => {
      if(context.user){
        if(body.trim() === ''){
          throw new Error('Body must not be empty');
        }
  
        const newThought = new Thought({
          body,
          user: context.user.id,
          username: context.user.username,
          createdAt: new Date().toISOString()
        });
  
        const thought = await newThought.save();
  
        return thought;
      } 
      throw new AuthenticationError('Not Authenticated!');
    },
    
    deleteThought: async (parents, { thoughtId }, context) => {
      if(context.user){
        const thoughtData = await Thought.findById(thoughtId);
        if(context.user.username === thoughtData.username){
          await thoughtData.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      }
      throw new AuthenticationError('Invalid Token');
    },
    createReaction: async(_, { thoughtId, body }, context) => {
      if(context.user){
        if (body.trim() === '') {
          throw new UserInputError('Empty reaction', {
            errors: {
              body: 'Body must not empty'
            }
          });
        }

        const thoughtData = await Thought.findById(thoughtId);
        const {username} = context.user;
        console.log(username);

        if(thoughtData) {
          thoughtData.reactions.unshift({
            body,
            username,
            createdAt: new Date().toISOString()
          });
          await thoughtData.save();
          return thoughtData;
        } else throw new UserInputError('Post not found');
      }
      throw new AuthenticationError('Not Authenticated!')
    },
    deleteReaction: async(_, { thoughtId, reactionId }, context) => {
      if(context.user){
        const {username} = context.user;
        const thoughtData = await Thought.findById(thoughtId);

        if(thoughtData){
          const reactionIndex = thoughtData.reactions.findIndex(r => r.id === reactionId);

          if(thoughtData.reactions[reactionIndex].username === username){
            thoughtData.reactions.splice(reactionIndex, 1);
            await thoughtData.save();
            return thoughtData;
          } else throw new AuthenticationError('Action Not Allowed!')
        }
        throw new UserInputError('Reaction not found');
      }
      throw new AuthenticationError('Not Authenticated!')
    },
    likeThought: async(_, { thoughtId }, context) => {
      if(context.user){
        const { username } = context.user;
        const thoughtData = await Thought.findById(thoughtId);
        if(thoughtData){
          if(thoughtData.likes.find(like => like.username === username )){
            // Post already likes, unlike it
            thoughtData.likes = thoughtData.likes.filter((like) => like.username !== username);
          } else {
            // Not liked, like post
            thoughtData.likes.push({
              username,
              createdAt: new Date().toISOString()
            });
          }

          await thoughtData.save();
          return thoughtData;
        } else throw new UserInputError('Thought not found');
      }
      throw new AuthenticationError('Not Authenticated!')
    },
    addFriend: async (parents, args) => {},
    removeFriend: async (parents, args) => {}

  }
};

module.exports = resolvers;