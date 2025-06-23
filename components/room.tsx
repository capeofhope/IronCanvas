"use client";

import React, { ReactNode } from "react";
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import { RoomProvider } from "../liveblocks.config";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}
export function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
      <RoomProvider
        id={roomId}
        initialPresence={{
          cursor: null, // Initial presence state, can be customized
          selection: [], // Initial selection state, can be customized
          pencilDraft: null, // Initial pencil draft state, can be customized
          penColor: null, // Initial pen color state, can be customized
        }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(), // Initial storage state, can be customized
          layerIds: new LiveList<string>([]), // Initial layer IDs, can be customized
        }}
      >
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
