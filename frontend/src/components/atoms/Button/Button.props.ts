import type { ReactNode } from "react";

export interface IButtonProps {
  className?: string;
  content: ReactNode;
  isDisabled?: boolean;
  isScrollToTop?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}
