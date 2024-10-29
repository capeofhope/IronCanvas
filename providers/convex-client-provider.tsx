'use client';

import { FC, ReactNode } from 'react';
import { ClerkProvider, useAuth, SignInButton, UserButton } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from 'convex/react';
import { Loading } from '@/components/auth/loading';


const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;
const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const convex = new ConvexReactClient(CONVEX_URL);

const ConvexClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>
        {children}
        </Authenticated>
        <AuthLoading>
          <Loading/>
        </AuthLoading>
        <Unauthenticated>
          <SignInButton>
            <UserButton />
          </SignInButton>
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;