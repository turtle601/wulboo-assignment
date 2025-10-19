import express from 'express';
import cors from 'cors';
import { createMiddleware } from '@mswjs/http-middleware';
import { handlers } from '../src/mocks/handlers';

const app = express();
const PORT = process.env.MOCK_PORT || 9090;

// Enable CORS for all origins in development
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// MSW middleware
app.use(createMiddleware(...handlers));

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Mock server is running on http://localhost:${PORT}`);
  console.log('📡 Available endpoints:');
  console.log('   GET    /api/users');
  console.log('   GET    /api/users/:id');
  console.log('   POST   /api/users');
  console.log('   PUT    /api/users/:id');
  console.log('   DELETE /api/users/:id');
  console.log('   GET    /api/posts');
  console.log('   GET    /api/posts/:id');
  console.log('   GET    /api/users/:userId/posts');
  console.log('   POST   /api/posts');
  console.log('   PUT    /api/posts/:id');
  console.log('   DELETE /api/posts/:id');
  console.log('   POST   /api/posts/:postId/comments');
  console.log('   DELETE /api/comments/:id');
});
