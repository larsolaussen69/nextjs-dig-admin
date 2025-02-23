import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : undefined,
});

const authOptions = {
  session: { strategy: "jwt" as SessionStrategy },
  adapter: null,
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await pool.connect();
        try {
          const result = await client.query(
            "SELECT * FROM users WHERE email = $1",
            [credentials.email]
          );
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
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
      };
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const, // ✅ Corrected to lowercase "lax"
        path: "/",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Use named exports for App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };