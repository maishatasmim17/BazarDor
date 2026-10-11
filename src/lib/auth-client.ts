'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
});

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;

//98247167181-922n2ioiki92okmplih01eq35o3ph4mc.apps.googleusercontent.com

//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