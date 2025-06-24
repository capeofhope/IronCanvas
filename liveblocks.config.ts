import { createClient, LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer, Color } from "./types/canvas";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblocks-auth",
});

type Presence = {
  cursor: { x: number, y: number } | null;
  selection: string[];
  pencilDraft: [x: number, y: number, pressure: number][] | null;
  penColor: Color | null;
};

type Storage = {
  layers: LiveMap<string, LiveObject<Layer>>;
  layerIds: LiveList<string>;
};

export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useSelf,
  useOthers,
  useOther,
  useOthersConnectionIds,
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
  useOthersMapped,
} = createRoomContext<Presence, Storage>(client);