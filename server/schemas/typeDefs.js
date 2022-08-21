const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		email: String!
		thoughts: [Thought]
		friends: [User]
		token: String!
		createdAt: String
	}
	type Thought{
		id: ID!
		body: String!
		createdAt: String!
		username: String!
		reactions: [Reaction]!
		likes: [Like]!
		likeCount: Int!
		reactionCount: Int!
	}
	type Reaction {
		id: ID!
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
		getThoughts: [Thought]
		getThought(thoughtId: ID!): Thought
		user(userId: ID, username: String): User
	}
	
	input RegisterInput {
		username: String!
		password: String!
		email: String!
	}

	type Mutation{
		register(registerInput: RegisterInput): Auth!
		login(username: String!, password: String!): Auth!
		destroyUser(email: String!): User!
		addThought(body: String!): Thought!
		deleteThought(thoughtId: ID): String!
		createReaction(thoughtId: ID!, body: String!): Thought!
		deleteReaction(thoughtId: ID!, reactionId: ID!): Thought!
		likeThought(thoughtId: ID!): Thought!
		addFriend(user_id: Int): User!
		removeFriend(user_id: Int): User!
	}

`;

module.exports = typeDefs;