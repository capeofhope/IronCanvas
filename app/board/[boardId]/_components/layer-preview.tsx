"use client";

import { LayerType } from "@/types/canvas";
import { useStorage } from "@/liveblocks.config";
import { memo } from "react";
import { Rectangle } from "./rectangle";

interface LayerPreviewProps {
  id: any;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}
export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {    const layer = useStorage((root) => {
      const layers = root.layers;
      if (layers instanceof Map) {
        return layers.get(id);
      }
      return undefined;
    });
    if (!layer) {
      return null;
    }
    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Ellipse:
        return <div className="">Ellipse</div>;
      case LayerType.Path:
        return <div className="">Path</div>;
      case LayerType.Text:
        return <div className="">Text</div>;
      case LayerType.Note:
        return <div className="">Note</div>;
      default:
        console.log("Unknown layer type:", layer.type);
        return null; // Handle unknown layer types gracefully
    }
  }
);

LayerPreview.displayName = "LayerPreview";
