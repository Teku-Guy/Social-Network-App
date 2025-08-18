// server/schemas/resolvers.js (ESM + Apollo v5)

import { GraphQLError } from 'graphql';
import Models from '../models/index.js';
import { signToken } from '../utils/auth.js';
import { validateRegisterInput, validateLoginInput } from '../utils/validators.js';

const { User, Post } = Models;

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    getUser: async (_, args) => {
      const userData = await User.findOne({ username: args.username, id: args.userId });
      if (!userData) {
        throw new GraphQLError('User not found', { extensions: { code: 'BAD_USER_INPUT' } });
      }
      return userData;
    },

    getPosts: async () => {
      return Post.find().sort({ createdAt: -1 });
    },

    getPostByUser: async (_, args) => {
      const postData = (await Post.find()).filter((p) => p.username === args.username);
      if (postData.length === 0) {
        throw new GraphQLError('User has no posts', { extensions: { code: 'BAD_USER_INPUT' } });
      }
      return postData;
    },

    getPost: async (_, { postId }) => {
      const postData = await Post.findById(postId);
      if (!postData) {
        throw new GraphQLError('Post not found', { extensions: { code: 'BAD_USER_INPUT' } });
      }
      return postData;
    },
  },

  Mutation: {
    // create user
    register: async (
      _,
      { registerInput: { username, email, password } },
    ) => {
      const { valid, errors } = validateRegisterInput(username, email, password);
      if (!valid) {
        throw new GraphQLError('Validation errors', {
          extensions: { code: 'BAD_USER_INPUT', errors },
        });
      }

      const existing = await User.findOne({ username });
      if (existing) {
        throw new GraphQLError('Username is taken', {
          extensions: { code: 'BAD_USER_INPUT', errors: { username: 'This username is taken' } },
        });
      }

      if (typeof password !== 'string' || password.length < 6) {
        throw new GraphQLError('Password too short', {
          extensions: { code: 'BAD_USER_INPUT', errors: { password: 'Password must be at least 6 characters' } },
        });
      }

      const user = await User.create({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const token = signToken(user);
      return { token, user };
    },

    login: async (_, { username, password }) => {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new GraphQLError('Validation errors', { extensions: { code: 'BAD_USER_INPUT', errors } });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found';
        throw new GraphQLError('User not found', { extensions: { code: 'BAD_USER_INPUT', errors } });
      }

      const match = await user.isCorrectPassword(password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new GraphQLError('Wrong credentials', { extensions: { code: 'BAD_USER_INPUT', errors } });
      }

      const token = signToken(user);
      return { token, user };
    },

    destroyUser: async () => {
      // implement if needed
      throw new GraphQLError('Not implemented', { extensions: { code: 'NOT_IMPLEMENTED' } });
    },

    addPost: async (_, { body }, context) => {
      if (!context.user) {
        throw new GraphQLError('Not Authenticated!', { extensions: { code: 'UNAUTHENTICATED' } });
      }
      if (typeof body !== 'string' || body.trim() === '') {
        throw new GraphQLError('Body must not be empty', { extensions: { code: 'BAD_USER_INPUT' } });
      }

      const newPost = new Post({
        body,
        user: context.user.id,
        username: context.user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },

    deletePost: async (_, { postId }, context) => {
      if (!context.user) {
        throw new GraphQLError('Invalid Token', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      const postData = await Post.findById(postId);
      if (!postData) {
        throw new GraphQLError('Post not found', { extensions: { code: 'BAD_USER_INPUT' } });
      }

      if (context.user.username !== postData.username) {
        throw new GraphQLError('Action not allowed', { extensions: { code: 'FORBIDDEN' } });
      }

      await postData.deleteOne();
      return 'Post deleted successfully';
    },

    submitComment: async (_, { postId, body }, context) => {
      if (!context.user) {
        throw new GraphQLError('Not Authenticated!', { extensions: { code: 'UNAUTHENTICATED' } });
      }
      if (typeof body !== 'string' || body.trim() === '') {
        throw new GraphQLError('Empty Comment', {
          extensions: { code: 'BAD_USER_INPUT', errors: { body: 'Body must not be empty' } },
        });
      }

      const comData = await Post.findById(postId);
      if (!comData) {
        throw new GraphQLError('Post not found', { extensions: { code: 'BAD_USER_INPUT' } });
      }

      const { username } = context.user;
      comData.comments.unshift({
        body,
        username,
        createdAt: new Date().toISOString(),
      });
      await comData.save();
      return comData;
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      if (!context.user) {
        throw new GraphQLError('Not Authenticated!', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      const { username } = context.user;
      const comData = await Post.findById(postId);
      if (!comData) {
        throw new GraphQLError('Post not found', { extensions: { code: 'BAD_USER_INPUT' } });
      }

      const comIndex = comData.comments.findIndex((c) => c.id === commentId);
      if (comIndex === -1) {
        throw new GraphQLError('Comment not found', { extensions: { code: 'BAD_USER_INPUT' } });
      }

      if (comData.comments[comIndex].username !== username) {
        throw new GraphQLError('Action Not Allowed!', { extensions: { code: 'FORBIDDEN' } });
      }

      comData.comments.splice(comIndex, 1);
      await comData.save();
      return comData;
    },

    likePost: async (_, { postId }, context) => {
      if (!context.user) {
        throw new GraphQLError('Not Authenticated!', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      const { username } = context.user;
      const postData = await Post.findById(postId);
      if (!postData) {
        throw new GraphQLError('Post not found', { extensions: { code: 'BAD_USER_INPUT' } });
      }

      const existing = postData.likes.find((like) => like.username === username);
      if (existing) {
        // Unlike
        postData.likes = postData.likes.filter((like) => like.username !== username);
      } else {
        // Like
        postData.likes.push({ username, createdAt: new Date().toISOString() });
      }

      await postData.save();
      return postData;
    },

    addFriend: async () => {
      throw new GraphQLError('Not implemented', { extensions: { code: 'NOT_IMPLEMENTED' } });
    },

    removeFriend: async () => {
      throw new GraphQLError('Not implemented', { extensions: { code: 'NOT_IMPLEMENTED' } });
    },

    saveProfileImage: async (_, { user_id, url }) => {
      const userData = await User.findOneAndUpdate({ id: user_id }, { profileImgUrl: url });
      return userData;
    },
  },
};

export default resolvers;