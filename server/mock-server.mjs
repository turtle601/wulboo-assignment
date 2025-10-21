import express from 'express';
import cors from 'cors';
import { createMiddleware } from '@mswjs/http-middleware';
import { handlers } from '../src/mocks/handlers';

const app = express();
const PORT = 9090;

// Enable CORS for all origins in development
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// MSW middleware
app.use(createMiddleware(...handlers));

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Mock server is running on http://localhost:${PORT}`);
});
