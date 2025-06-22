import { Camera, Color, Point, Side, XYWH } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(e:React.PointerEvent,camera:Camera) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function colorToCss(color:Color ): string {
  return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
}

export function resizeBounds(bounds:XYWH,corner:Side,point:Point): XYWH {
  const result={
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  }
  if((corner && Side.Left)==Side.Left) {
    result.x=Math.min(point.x, bounds.x + bounds.width);
    result.width=Math.abs(point.x - (bounds.x + bounds.width));
  }
  if((corner && Side.Right)==Side.Right) {
    result.x=Math.min(point.x, bounds.x);
    result.width=Math.abs(point.x - bounds.x);
  }
  if((corner && Side.Top)==Side.Top) {
    result.y=Math.min(point.y, bounds.y + bounds.height);
    result.height=Math.abs(point.y - (bounds.y + bounds.height));
  }
  if((corner && Side.Bottom)==Side.Bottom) {
    result.y=Math.min(point.y, bounds.y);
    result.height=Math.abs(point.y - bounds.y);
  }
  
  return result;
}