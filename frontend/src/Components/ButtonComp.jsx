import React from "react";
import { Button } from "@nextui-org/react";

export default function ButtonComp({
  bgColor = "default",
  children,
  className,
  size,
  svg,
  ...props
}) {
  // button bgColors:
  // default
  // Primary
  // Secondary
  // Success
  // Warning
  // Danger
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button color={bgColor} className={className} size={size} {...props}>
        {children}
        {svg ? svg : null}
      </Button>
    </div>
  );
}
