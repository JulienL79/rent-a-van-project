import * as LucideIcons from "lucide-react";

export interface IIconProps extends LucideIcons.LucideProps {
  name: keyof typeof LucideIcons;
  className?: string;
  size?: number | string;
  color?: string;
}
