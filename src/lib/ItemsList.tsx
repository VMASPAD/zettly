import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import React from "react";

const iconClass = "w-4 h-4";

export const ItemList = () => [
  { value: "text-left", label: "text-left", icon: <AlignLeft className={iconClass} /> },
  { value: "text-center", label: "text-center", icon: <AlignCenter className={iconClass} /> },
  { value: "text-right", label: "text-right", icon: <AlignRight className={iconClass} /> },
  { value: "text-justify", label: "text-justify", icon: <AlignJustify className={iconClass} /> },
];
