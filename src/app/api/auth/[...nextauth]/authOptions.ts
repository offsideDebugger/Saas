import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "@/lib/types";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }
        
        const validation = signInSchema.safeParse(credentials);
        if (!validation.success) {
          console.error("Validation failed:", validation.error);
          throw new Error("Invalid input");
        }
        
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: validation.data.email,
            },
          });
          
          if (!user) {
            throw new Error("Invalid credentials");
          }
          
          // Compare passwords (plain text for now)
          if (user && user.password === validation.data.password) {
            // Any object returned will be saved in `user` property of the JWT
            return { 
              id: user.id, 
              email: user.email, 
              username: user.username 
            };
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Invalid credentials");
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;


