import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server-plugin-landing-page-local-default';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import cors from 'cors';
import { typeDefs, resolvers } from './schemas/index.js';
import auth from './utils/auth.js';
import db from './config/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';

const { authMiddleware } = auth;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: new InMemoryLRUCache(),
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

// Start Apollo Server
await server.start();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apply Apollo GraphQL middleware
app.use('/graphql', expressMiddleware(server, {
  context: async ({ req }) => {
    return authMiddleware({ req });
  },
}));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});