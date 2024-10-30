// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions, Session, JWT } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/db'; // Adjust the path as needed

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt", // Use JWT for session strategy
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.sub as string; // Add the user ID to the session
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add user info to the JWT token if available
      if (user) {
        token.sub = user.id; // Assign the user ID to the token
      }
      return token;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };