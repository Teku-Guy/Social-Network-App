import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';   // ✅ v5 adapter
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';

import schema from './schemas/index.js';
const { typeDefs, resolvers: baseResolvers } = schema;
import { authMiddleware } from './utils/auth.js';
import db from './config/connection.js';

// __dirname shim for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Health check for proxy/dev tools
app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Merge Upload scalar into existing resolvers (ensure your typeDefs include: `scalar Upload`)
const resolvers = { Upload: GraphQLUpload, ...baseResolvers };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: new InMemoryLRUCache(),
});

await server.start();

// Order matters: register upload middleware BEFORE expressMiddleware(server)
app.use(graphqlUploadExpress());

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GraphQL endpoint
app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => {
      const reqWithUser = authMiddleware({ req });
      return { user: reqWithUser.user };
    },
  })
);

// Static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Start server after DB is ready
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});