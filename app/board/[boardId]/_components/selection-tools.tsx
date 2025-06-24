"use client";

import { memo } from "react";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@/liveblocks.config";
import { useSelectionBounds } from "@/convex/hooks/use_selection_bounds";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/convex/hooks/use_delete_layers";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);
    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];
        const arr = liveLayerIds.toImmutable();

        // Find indices of selected layers
        for (let i = 0; i < arr.length; i++) {
          if (selection && selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        // Sort indices in ascending order
        indices.sort((a, b) => a - b);

        // Move each selected layer to the front (end of array)
        indices.reverse().forEach((index, i) => {
          liveLayerIds.move(index, arr.length - 1 - i);
        });
      },
      [selection]
    );
    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];
        const arr = liveLayerIds.toImmutable(); // Find indices of selected layers
        for (let i = 0; i < arr.length; i++) {
          if (selection && selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        // Sort indices in descending order to avoid index shifting issues
        indices.sort((a, b) => b - a);

        // Move each selected layer to the back (beginning of array)
        indices.forEach((index, i) => {
          liveLayerIds.move(index, i);
        });
      },
      [selection]
    );
    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);
        selection?.forEach((layerId: string) => {
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
          <ColorPicker onChange={setFill} />{" "}
          <div className="flex flex-col gap-y-0.5">
            <Hint label="Bring to front">
              <Button variant={"board"} size={"icon"} onClick={moveToFront}>
                <BringToFront />
              </Button>
            </Hint>
            <Hint label="Send to back">
              <Button variant={"board"} size={"icon"} onClick={moveToBack}>
                <SendToBack />
              </Button>
            </Hint>
          </div>
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
