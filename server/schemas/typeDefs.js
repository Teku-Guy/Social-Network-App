const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		email: String!
		posts: [Post]
		friends: [User]
		token: String!
		createdAt: String
	}
	type Post{
		id: ID!
		body: String!
		createdAt: String!
		username: String!
		comments: [Comment]!
		likes: [Like]!
		likeCount: Int!
		commentCount: Int!
	}
	type Comment {
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
		getPosts: [Post]
		getPost(postId: ID!): Post
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
		addPost(body: String!): Post!
		deletePost(postId: ID): String!
		submitComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!
		likePost(postId: ID!): Post!
		addFriend(user_id: Int): User!
		removeFriend(user_id: Int): User!
	}

`;

module.exports = typeDefs;