import { client } from './mongodb';
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

import { mongodbAdapter } from 'better-auth/adapters/mongodb';
const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();


export const auth = betterAuth({
   emailAndPassword: { 
    enabled: true, 
  }, 


  database: mongodbAdapter(db, { 
    client,}),




  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: 'select_account', // protibar account chooser dekhabe
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});