export async function GET() {
    return new Response(
      JSON.stringify({
        databaseUrl: process.env.DATABASE_URL ? "Exists" : "Missing",
        nextAuthSecret: process.env.NEXTAUTH_SECRET ? "Exists" : "Missing",
      }),
      { status: 200 }
    );
  };