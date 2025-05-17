import connectDb from '@/db/Connectdb';
import User from '@/models/User';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";

export const authoption = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, email }) {
      if (account.provider === 'github' || account.provider === 'google' ) {
        try {
          await connectDb();

          // Normalize email for consistent lookups
          const emailLower = user.email.toLowerCase();

          // Use `findOneAndUpdate` to atomically find and optionally create the user
          const currentUser = await User.findOneAndUpdate(
            { email: emailLower },
            { $setOnInsert: { email: emailLower, username: emailLower.split('@')[0] } },
            { new: true, upsert: true } // `upsert` ensures only one document is created if it doesn't exist
          );

          user.name = currentUser.username; // Update `user` object with the username
          return true;
        } catch (error) {
          console.error('Error during sign-in:', error);
          return false; // Fail the sign-in if an error occurs
        }
      }
      return true;
    },

    async session({ session }) {
      try {
        await connectDb();

        // Fetch user data from the database
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username; // Add the username to the session
        }
      } catch (error) {
        console.error('Error during session callback:', error);
      }
      return session;
    },
  },
});

export { authoption as GET, authoption as POST };
