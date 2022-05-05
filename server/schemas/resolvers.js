const { User }= require('../models');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = { 
  Query: { 
    users: async (parent, args, context) => {
        const userData = await User.find();
        return userData;
    }
  },
  Mutation: {
      //create user data
    addUser: async (parents, args) => {
        const newUser = await User.create(args);
    }
  }
};

module.exports = resolvers;