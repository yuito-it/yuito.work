import { type NextRequest } from "next/server";
import { getFirstAccessTokenToSpotify } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code") ?? undefined;
  await getFirstAccessTokenToSpotify(code);
  return Response.json({ status: "OK" });
}
