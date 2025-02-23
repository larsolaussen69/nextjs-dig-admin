import { NextResponse } from "next/server";
import { Pool } from "pg";
import { randomBytes } from "crypto";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      const result = await client.query("SELECT id FROM users WHERE email = $1", [email]);

      if (result.rowCount === 0) {
        return NextResponse.json({ success: true }); // Respond with success to avoid email enumeration
      }

      const userId = result.rows[0].id;
      const token = randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + 60 * 60 * 1000); // Token valid for 1 hour

      await client.query(
        "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET token = $2, expires_at = $3",
        [userId, token, expiry]
      );

      // Send email with reset link (pseudo-code for simplicity)
      console.log(`Send reset link: https://your-app/reset-password?token=${token}`);

      return NextResponse.json({ success: true });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error in forgot password:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}