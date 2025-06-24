import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

if (!process.env.LIVEBLOCKS_SECRET_KEY) {
  throw new Error("LIVEBLOCKS_SECRET_KEY environment variable is not set");
}

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY,
});

export async function POST(request: Request) {
    try {
        const authorization = await auth();
        // Get the current user from your database
        const user = await currentUser();
        
        if (!user || !authorization) {
            return new Response("Unauthorized", { status: 403 });
        }
        
        const { room } = await request.json();
        if (!room) {
            return new Response("Room ID is required", { status: 400 });
        }
        
        const board = await convex.query(api.board.get, { id: room });

        if (board?.orgId !== authorization.orgId) {
            return new Response("Unauthorized", { status: 403 });
        }
        
        const userInfo = {
            name: user.firstName || user.username || "Anonymous",
            picture: user.imageUrl,
        };
        
        const session = liveblocks.prepareSession(user.id, {
            userInfo
        });
        
        if (room) {
            session.allow(room, session.FULL_ACCESS);
        }
        
        const { status, body } = await session.authorize();
        return new Response(body, { status });
    } catch (error) {
        console.error("Liveblocks auth error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}