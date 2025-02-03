import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectToDB(); // ✅ Ensure DB is connected
      
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        console.log("🆕 New user detected, adding to MongoDB...");
        const newUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
          role: "user", // Default role
        });
        await newUser.save();
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      await connectToDB();
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id;
        session.user.role = dbUser.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};