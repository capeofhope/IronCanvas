"use client";
import { nanoid } from "nanoid";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from "@/types/canvas";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import React, { useCallback, useState } from "react";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
} from "@liveblocks/react";
import { CursorPresence } from "./cursor-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";

const MAX_LAYERS = 100;
interface CanvasProps {
  boardId: string;
}
export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
  });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Path
        | LayerType.Rectangle
        | LayerType.Text,
      position: Point
    ) => {
      const liveLayers: any = storage.get("layers");
      if (liveLayers instanceof Array && liveLayers.length >= MAX_LAYERS) {
        return;
      }
      const liveLayerIds: any = storage.get("layerIds");
      if (liveLayerIds.length >= MAX_LAYERS) {
        return;
      }
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      });
      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({
        mode: CanvasMode.None,
      });
    },
    [lastUsedColor]
  );
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);
      setMyPresence({
        cursor: current,
      });
    },
    []
  );
  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        console.log("Inserting layer at", point);
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }
      history.resume();
      console.log({
        point,
        mode: canvasState.mode,
        history,
      });
    },
    [camera, canvasState, history, insertLayer]
  );
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({
      cursor: null,
    });
  }, []);
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {Array.isArray(layerIds)
            ? layerIds.map((layerId: any) => (
                <LayerPreview
                  key={layerId}
                  id={layerId}
                  onLayerPointerDown={() => {}}
                  selectionColor="#000000"
                />
              ))
            : null}
          <CursorPresence />
        </g>
      </svg>
    </main>
  );
};
