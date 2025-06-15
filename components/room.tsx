"use client";

import React, { ReactNode } from "react";
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import { RoomProvider } from "../liveblocks.config";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}
export function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
      <RoomProvider id={roomId} initialPresence={{
        cursor: null, // Initial presence state, can be customized
      }}>
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
