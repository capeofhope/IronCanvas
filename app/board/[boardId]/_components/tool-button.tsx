"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
  isActive?: boolean;
}

export const ToolButton = ({
  icon: Icon,
  label,
  onClick,
  isDisabled,
  isActive,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side={"right"} sideOffset={14}>
      <Button
        disabled={isDisabled}
        variant={isActive ? "boardActive" : "board"}
        onClick={onClick}
      >
        <Icon />
      </Button>
    </Hint>
  );
};
