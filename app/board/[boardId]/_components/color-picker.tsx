"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

// Convert hex to RGB color format
const hexToRgb = (hex: string): Color => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

// Available colors from utils.ts
const COLORS = [
  "#DC2626", // Red
  "#F59E0B", // Amber
  "#10B981", // Green
  "#3B82F6", // Blue
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#F97316", // Orange
  "#059669", // Teal
  "#6366F1", // Indigo
  "#D97706", // Yellow
];

interface ColorPickerProps {
  onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      {COLORS.map((hex) => (
        <ColorButton key={hex} color={hexToRgb(hex)} onClick={onChange} />
      ))}
    </div>
  );
};

interface ColorButtonProps {
  color: Color;
  onClick: (color: Color) => void;
}

export const ColorButton = ({ color, onClick }: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-6 w-6 rounded-md border border-neutral-300"
        style={{ backgroundColor: colorToCss(color) }}
      ></div>
    </button>
  );
};
