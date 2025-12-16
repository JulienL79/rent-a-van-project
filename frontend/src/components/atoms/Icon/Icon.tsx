import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { IIconProps } from "./Icon.props";
import "./Icon.scss";

export const Icon = ({ name, ...props }: IIconProps & LucideProps) => {
  const LucideIcon = LucideIcons[name] as React.ComponentType<LucideProps>;
  return LucideIcon ? <LucideIcon {...props} /> : null;
};
