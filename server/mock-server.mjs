import express from 'express';
import cors from 'cors';
import { createMiddleware } from '@mswjs/http-middleware';
import { handlers } from './mocks/handlers.js';

const app = express();
const PORT = 9090;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());

// ✅ 로깅을 먼저!
app.use((req, res, next) => {
  next();
});

// MSW middleware
app.use('/api', createMiddleware(...handlers));

// ✅ 404 핸들러
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.url });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock server is running on http://localhost:${PORT}`);
});
