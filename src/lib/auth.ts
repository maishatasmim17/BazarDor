import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import path from 'path';

let dbInstance: Database.Database | undefined = undefined;

try {
  const dbPath = path.join(process.cwd(), 'auth.db');
  dbInstance = new Database(dbPath);
} catch (e) {
  console.warn('SQLite init warning:', e);
}

export const auth = betterAuth({
  database: dbInstance,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET || 'bazardor-secret-key-at-least-32-chars-long-secure-token!',
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-client-secret',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || 'mock-client-id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'mock-client-secret',
    },
  },
});
