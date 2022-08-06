const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        thoughts: [Thought]
        friends: [User]
        password: String!
    }
    type Thought{
        _id: ID!
        body: String!
        createdAt: String!
        username: String!
        reactions: [Reaction]!
        likes: [Like]!
        likeCount: Int!
        reactionCount: Int!
    }
    type Reaction {
        _id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }

    type Auth {
        token: ID!
        user: User!
    }

    type Query{
        users: [User]
        thoughts: [Thought]
        user(user_id: Int, username: String): User
    }
    
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Mutation{
        register(registerInput: RegisterInput): Auth!
        login(email: String!, password: String!): Auth
        destroyUser(email: String!): User
        addThought(thoughtText: String!, username: String!): Thought
        destroyThought(thought_id: Int): Thought
        addFriend(user_id: Int): User
        removeFriend(user_id: Int): User
    }

`;

module.exports = typeDefs;