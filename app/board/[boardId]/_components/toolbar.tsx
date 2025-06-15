import { ToolButton } from "./tool-button";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          label="Select"
          onClick={() => {}}
          isActive={false}
          icon={MousePointer2}
        />
        <ToolButton
          label="Text"
          onClick={() => {}}
          icon={Type}
          isActive={false}
        />
        <ToolButton
          label="Sticky Notes"
          onClick={() => {}}
          icon={StickyNote}
          isActive={false}
        />
        <ToolButton
          label="Rectangle"
          onClick={() => {}}
          icon={Square}
          isActive={false}
        />
        <ToolButton
          label="Ellipse"
          onClick={() => {}}
          icon={Circle}
          isActive={false}
        />
        <ToolButton
          label="Pen"
          onClick={() => {}}
          icon={Pencil}
          isActive={false}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 shadow-md flex flex-col items-center">
        <ToolButton
          label="Undo"
          onClick={() => {}}
          isDisabled={true}
          icon={Undo2} // Replace with actual undo icon
        />
        <ToolButton
          label="Redo"
          onClick={() => {}}
          isDisabled={true}
          icon={Redo2} // Replace with actual redo icon
        />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = function ToolbarSkeleton() {
  return (
    <div className="bg-white shadow-md absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 h-[360px] w-[52px] rounded-md" />
  );
};
