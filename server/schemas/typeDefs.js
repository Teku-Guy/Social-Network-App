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
        thoughts: [Thought]
        user(user_id: Int, username: String): User
    }

    type Mutation{
        addUser(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
        removeUser(email: String!): User
        addThought(thoughtText: String!, username: String!): Thought
        addFriend(user_id: Int): User
        deleteFriend(user_id: Int): User
    }

`;

module.exports = typeDefs;