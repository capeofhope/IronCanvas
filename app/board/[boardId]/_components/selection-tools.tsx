"use client";

import { memo } from "react";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@/liveblocks.config";
import { useSelectionBounds } from "@/convex/hooks/use_selection_bounds";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/convex/hooks/use_delete_layers";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me: any) => me.presence.selection);
    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);
        selection.forEach((layerId: any) => {
          const layer = liveLayers.get(layerId);
          if (layer) {
            layer.set("fill", fill);
          }
        });
      },
      [selection, setLastUsedColor]
    );
    const deleteLayers = useDeleteLayers();
    const selectionBounds = useSelectionBounds();
    if (!selectionBounds) {
      return null;
    }
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;
    return (
      <>
        {" "}
        <div
          className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
          style={{
            transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
          }}
        >
          <ColorPicker onChange={setFill} />
          <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
            <Hint label="Delete">
              <Button variant={"board"} size={"icon"} onClick={deleteLayers}>
                <Trash2 />
              </Button>
            </Hint>
          </div>
        </div>
      </>
    );
  }
);
