import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import PgAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Force NextAuth to run on Node.js (not Edge)
export const runtime = "nodejs";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in .env
});

const authOptions = {
    session: { strategy: "jwt" as SessionStrategy }, // ✅ Fix: Explicitly cast strategy type
    adapter: PgAdapter(pool),
    providers: [
      CredentialsProvider({
        name: "Email and Password",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "example@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password");
          }
  
          const client = await pool.connect();
          try {
            const result = await client.query("SELECT * FROM users WHERE email = $1", [
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

// ✅ Correct Export for Next.js App Router
const handler = NextAuth(authOptions);

export const GET = async (req: NextRequest) => {
  return handler(req, new NextResponse());
};

export const POST = async (req: NextRequest) => {
  return handler(req, new NextResponse());
};