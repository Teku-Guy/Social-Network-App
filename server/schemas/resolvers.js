import { AuthenticationError, UserInputError, ApolloError } from 'apollo-server-express';

import { User, Post } from '../models/index.js';
import auth from '../utils/auth.js';
import { validateRegisterInput, validateLoginInput } from '../utils/validators.js';

const { signToken } = auth;

const resolvers = {
  Query: { 
    users: async (parent, args, context) => {
      const userData = await User.find();
      return userData;
    },
    getUser: async (parent, args, context) => {
      const userData = await User.findOne({username: args.username, id: args.userId});
      if(!userData){
        throw new Error('Post not found');
      }
      return userData;
    },
    getPosts: async(parent, args, context) => {
      const postsData = await Post.find().sort({ createdAt: -1});
      return postsData;
    },
    getPostByUser: async (parent, args, context) => {
      const postData = await (await Post.find()).filter(post => post.username === args.username);
      if(postData.length <= 0){
        throw new Error('User has no posts');
      }
      return postData;
    },
    getPost: async (parent, {postId}, context) => {
      const postData = await Post.findById(postId);
      if(!postData){
        throw new Error('Post not found');
      }
      return postData;
    }
  },
  Mutation: {
    //create user data
    register: async (parents, {
      registerInput: { username, email, password}
    }, context) => {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const checkUser = await User.findOne({username});
      if(checkUser){
        throw new UserInputError('Username is taken', {
          errors: {username: 'This username is taken'}
        })
      }
      if(password.length < 6){
        throw new UserInputError('Password too short', {
          errors: {password: 'Password must be at least 6 characters'}
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
      const { errors, valid } = validateLoginInput(username, password); 

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({username});

      if (!user || user === '') {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      //check if password matches
      const match = await user.isCorrectPassword(password);
      if (!match) {
        errors.general = 'Wrong crendetials';
        throw new UserInputError('Wrong crendetials', { errors });
      }

      const token = signToken(user);
      return {token, user};
    },

    destroyUser: async (parents, args) => {
      //todo delete user
    },

    addPost: async (parents, { body, username }, context) => {
      if(context.user){
        if(body.trim() === ''){
          throw new Error('Body must not be empty');
        }
  
        const newPost = new Post({
          body,
          user: context.user.id,
          username: context.user.username,
          createdAt: new Date().toISOString()
        });
  
        const post = await newPost.save();
  
        return post;
      } 
      throw new AuthenticationError('Not Authenticated!');
    },
    
    deletePost: async (parents, { postId }, context) => {
      if(context.user){
        const postData = await Post.findById(postId);
        if(context.user.username === postData.username){
          await postData.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      }
      throw new AuthenticationError('Invalid Token');
    },
    submitComment: async(_, { postId, body }, context) => {
      if(context.user){
        if (body.trim() === '') {
          throw new UserInputError('Empty Comment', {
            errors: {
              body: 'Body must not empty'
            }
          });
        }

        const comData = await Post.findById(postId);
        const {username} = context.user;

        if(comData) {
          comData.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString()
          });
          await comData.save();
          return comData;
        } else throw new UserInputError('Post not found');
      }
      throw new AuthenticationError('Not Authenticated!')
    },
    deleteComment: async(_, { postId, commentId }, context) => {
      if(context.user){
        const {username} = context.user;
        const comData = await Post.findById(postId);

        if(comData){
          const comIndex = comData.comments.findIndex(c => c.id === commentId);

          if(comData.comments[comIndex].username === username){
            comData.comments.splice(comIndex, 1);
            await comData.save();
            return comData;
          } else throw new AuthenticationError('Action Not Allowed!')
        }
        throw new UserInputError('Comment not found');
      }
      throw new AuthenticationError('Not Authenticated!')
    },
    likePost: async(_, { postId }, context) => {
      if(context.user){
        const { username } = context.user;
        const postData = await Post.findById(postId);
        if(postData){
          if(postData.likes.find(like => like.username === username )){
            // Post already likes, unlike it
            postData.likes = postData.likes.filter((like) => like.username !== username);
          } else {
            // Not liked, like post
            postData.likes.push({
              username,
              createdAt: new Date().toISOString()
            });
          }

          await postData.save();
          return postData;
        } else throw new UserInputError('Post not found');
      }
      throw new AuthenticationError('Not Authenticated!')
    },
    addFriend: async (parents, args) => {},
    removeFriend: async (parents, args) => {},
    uploadProfileImg: async (parents, {username, url}) => {
      const userData = await User.findOneAndUpdate({username: username}, {profileImgUrl: url});
      return "Profile image updated successfully";
    },
  }
};

export default resolvers;