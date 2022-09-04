const express = require('express');
const {graphqlUploadExpress} = require('graphql-upload');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const path = require('path');
const {InMemoryLRUCache} = require('@apollo/utils.keyvaluecache');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: authMiddleware,
  cache: new InMemoryLRUCache(),
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

app.use(graphqlUploadExpress());

server.start().then(() => {
	server.applyMiddleware({ app });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/build/index.html'));
 });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});