import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas/index.js';
import auth from './utils/auth.js';
import db from './config/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
const {
  ApolloServerPluginLandingPageLocalDefault,
} = from 'apollo-server-core';

const { authMiddleware } = auth;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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