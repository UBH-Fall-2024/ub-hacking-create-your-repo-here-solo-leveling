import { handleAuth } from '@auth0/nextjs-auth0';

// Debug any configuration issues
console.log('Auth0 Config Check:', {
  hasBaseURL: !!process.env.AUTH0_BASE_URL,
  baseURL: process.env.AUTH0_BASE_URL,
  hasIssuerURL: !!process.env.AUTH0_ISSUER_BASE_URL,
  issuerURL: process.env.AUTH0_ISSUER_BASE_URL,
  hasClientID: !!process.env.AUTH0_CLIENT_ID,
  hasClientSecret: !!process.env.AUTH0_CLIENT_SECRET,
  hasSecret: !!process.env.AUTH0_SECRET,
});

// Create a basic handler with no custom configuration
export const GET = handleAuth();