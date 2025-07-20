import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "@/lib/types";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

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
      name: "Credentials",
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

          const isPasswordValid = await bcrypt.compare(validation.data.password, user.password);
         
          if (user && isPasswordValid) {
            return { 
              id: user.id, 
              email: user.email, 
              username: user.username 
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Error during authorization:", error);
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
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;


