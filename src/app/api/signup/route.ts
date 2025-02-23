import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import * as React from "react";

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Ensure this is set in your .env file
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined, // Enable SSL in production
});

// Signup API handler
export async function POST(req: Request) {
    try {
      const { email, password } = await req.json();
  
      // Validate input
      if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
      }
  
      const client = await pool.connect();
      try {
        // Check if the user exists
        const result = await client.query("SELECT id, password FROM users WHERE email = $1", [email]);
  
        if (result.rowCount > 0) {
          const user = result.rows[0];
  
          // If the user already has a password, prevent overwriting
          if (user.password) {
            return NextResponse.json({ error: "User already has a password" }, { status: 400 });
          }
  
          // If the user exists but has no password, set the password
          const hashedPassword = await bcrypt.hash(password, 10);
          await client.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, email]);
  
          return NextResponse.json({ success: true, message: "Password set successfully" }, { status: 200 });
        }
  
        // If the user doesn't exist, create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.query(
          "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)",
          [email, email, hashedPassword]
        );
  
        return NextResponse.json({ success: true, message: "User created successfully" }, { status: 201 });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error("Error in signup:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }