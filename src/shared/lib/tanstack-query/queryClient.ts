import {
  QueryClient,
  QueryClientConfig,
  isServer,
} from '@tanstack/react-query';

function makeQueryClient(config?: QueryClientConfig) {
  return new QueryClient(config);
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient(config?: QueryClientConfig) {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient(config);
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render
    if (!browserQueryClient) browserQueryClient = makeQueryClient(config);
    return browserQueryClient;
  }
}
