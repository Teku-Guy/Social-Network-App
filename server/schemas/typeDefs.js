const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Reaction {
        reactionId: ID
        reactionBody: String
        username: String
        createdAt: String
    }
    type Thought{
        thoughtText: String
        createdAt: String
        username: String
        reactions: [Reaction]
    }
    type User {
        _id: ID
        username: String
        email: String
        thoughts: [Thought]
        friends: [User]
        password: String
    }
    


    type Query{
        users: [User]
    }

    type Mutation{
        addUser(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
        removeUser(email: String!): User
    }

`;

module.exports = typeDefs;