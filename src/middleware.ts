import { NextResponse, type NextMiddleware } from "next/server";

const middleware: NextMiddleware = async (req) => {
	const res = NextResponse.next({ request: req });

	// ✅ Add CORS Headers to allow all origins
	res.headers.set("Access-Control-Allow-Origin", "*");
	res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.headers.set(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);

	// ✅ Handle CORS Preflight Requests
	if (req.method === "OPTIONS") {
		return new NextResponse(null, {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		});
	}

	return res;
};

export { middleware };

export const config = {
	matcher: [
		// ✅ Apply to all paths, except for static files, images, and metadata
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};