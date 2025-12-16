import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as brandIcons from "@fortawesome/free-brands-svg-icons";

type SolidIconName = keyof typeof solidIcons;
type BrandIconName = keyof typeof brandIcons;
type IconName = SolidIconName | BrandIconName;

export interface IFontAwesomeIconProps {
  name: IconName;
  className?: string;
  size?:
    | "xs"
    | "sm"
    | "lg"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
  color?: string;
}
