export const API_BASE_URL =
  typeof window === 'undefined' && process.env.NODE_ENV === 'development'
    ? 'http://localhost:9090/api' // SSR in development → Mock server
    : 'http://localhost:3000/api';
