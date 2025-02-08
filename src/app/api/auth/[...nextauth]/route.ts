import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import PgAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Set in .env
});

// TypeScript Interface for User
interface User {
  id: string;
  email: string;
  username: string;
  password: string;
}

// NextAuth.js Configuration
const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  adapter: PgAdapter(pool),
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<Omit<User, "password"> | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const client = await pool.connect();
        try {
          const result = await client.query<User>("SELECT * FROM users WHERE email = $1", [
            credentials.email,
          ]);

          if (result.rows.length === 0) {
            throw new Error("User not found");
          }

          const user = result.rows[0];
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);

          if (!isValidPassword) {
            throw new Error("Invalid credentials");
          }

          // Return user details excluding the password
          return { id: user.id, email: user.email, username: user.username };
        } finally {
          client.release();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        email: token.email as string,
        name: token.username as string,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Correct NextAuth Handler for Next.js App Router
const handler = NextAuth(authOptions);

// Explicitly typed exports for Next.js API routes
export const GET = (req: NextRequest) => handler(req as any, {} as any);
export const POST = (req: NextRequest) => handler(req as any, {} as any);