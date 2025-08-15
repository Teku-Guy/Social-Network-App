import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import cors from 'cors';
import http from 'http';
import { typeDefs, resolvers } from './schemas/index.js';
import auth from './utils/auth.js';
import db from './config/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';

const { authMiddleware } = auth;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Create Apollo Server with v5 configuration
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
  introspection: true,
});

// Start Apollo Server
await server.start();

// Apply middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Apply Apollo GraphQL middleware
app.use('/graphql', expressMiddleware(server, {
  context: async ({ req }) => {
    return authMiddleware({ req });
  },
}));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Start the server
db.once('open', () => {
  httpServer.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}!`);
    console.log(`📊 Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});