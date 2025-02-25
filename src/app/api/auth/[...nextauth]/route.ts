import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.POSTGRES_URL?.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : undefined,
});

const authOptions = {
  session: { strategy: "jwt" as SessionStrategy },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(pool)
        console.log("Authorize called with:", credentials);
        const client = await pool.connect();
        try {
          console.log("connected to database")
          const result = await client.query("SELECT * FROM users WHERE email = $1", [
            credentials.email,
          ]);
          if (result.rows.length === 0) {
            console.error("User not found for email:", credentials.email);
            return null; // No user found: 401 Unauthorized.
          }
          const user = result.rows[0];
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            console.error("Password invalid for user:", credentials.email);
            return null; // Invalid password: 401 Unauthorized.
          }
          console.log("User authorized:", user);
          return { id: user.id, email: user.email, username: user.username };
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
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
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Use named exports for App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };