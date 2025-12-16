import type { ReactNode } from "react";

export interface INavItemProps {
  to: string;
  content: ReactNode;
  className?: string;
  onClick?: () => void;
}
