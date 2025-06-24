import { TextLayer } from "@/types/canvas";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Kalam } from "next/font/google";
import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnWidth = width * scaleFactor;
  const fontSizeBasedOnHeight = height * scaleFactor;
  return Math.min(maxFontSize, fontSizeBasedOnWidth, fontSizeBasedOnHeight);
};
interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Text = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer;
  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(id);
    if (layer) {
      layer.update({ value: newValue });
    }
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    const newValue = e.target.value;
    updateValue(newValue);
  };
  return (
    <>
      <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
          outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        }}
      >
        <ContentEditable
          html={value || "Text"}
          onChange={handleContentChange}
          className={cn(
            "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
            font.className
          )}
          style={{
            color: fill ? colorToCss(fill) : "black",
            fontSize: calculateFontSize(width, height),
          }}
        />
      </foreignObject>
    </>
  );
};
