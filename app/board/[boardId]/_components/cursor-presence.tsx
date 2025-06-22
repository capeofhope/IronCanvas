"use client";
import { memo } from "react";
import { useOthersConnectionIds } from "@/liveblocks.config";
import { Cursor } from "./cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};
export const CursorPresence = memo(() => {
  return (
    <>
      {<Cursors />}
      {/* You can add more elements here if needed */}
    </>
  );
});
CursorPresence.displayName = "CursorPresence";
