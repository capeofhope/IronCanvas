import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex=new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: "sk_prod_6JsNEl7RhYteg9yhBgLF7htoiZYkuLquLgTvii4UTMm7wgiW09_rMfZzuaI8f-zt",
});

export async function POST(request: Request) {
    const authorization=await auth();
  // Get the current user from your database
  const user =await currentUser();
  if(!user || !authorization){
    return new Response("Unauthorized", { status: 403 });
  }
  const {room} = await request.json();
    if (!room) {
        return new Response("Room ID is required", { status: 400 });
    }
    const board=await convex.query(api.board.get,{id:room});

  //   console.log("AUTH_INFO",{
  //   room,
  //   board,
  //   boardOrdId:board?.orgId,
  //   userOrgId:authorization.orgId,
  // })

    if(board?.orgId!== authorization.orgId){
        return new Response("Unauthorized", { status: 403 });
    }
    const userInfo={
        name:user.firstName!,
        picture:user.imageUrl,
    }
    // console.log("USER_INFO",{userInfo});
    const session=liveblocks.prepareSession(user.id,{
        userInfo
    })
    if(room){
        session.allow(room,session.FULL_ACCESS);
    }
    const {status,body}=await session.authorize();
    // console.log({status,body},"ALLOWED");
    return new Response(body,{status});
}