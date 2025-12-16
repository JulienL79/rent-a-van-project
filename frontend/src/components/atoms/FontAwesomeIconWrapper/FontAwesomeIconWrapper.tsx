import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { IFontAwesomeIconProps } from "./FontAwesomeIconWrapper.props";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as brandIcons from "@fortawesome/free-brands-svg-icons";

export const FontAwesomeIconWrapper = ({
  name,
  className,
  size = "1x",
  color,
}: IFontAwesomeIconProps) => {
  const allIcons = { ...solidIcons, ...brandIcons };

  const icon = allIcons[name as keyof typeof allIcons];

  const isValidIcon = icon && typeof icon === "object" && "iconName" in icon;

  return isValidIcon ? (
    <FontAwesomeIcon
      icon={icon as IconProp}
      className={className}
      size={size}
      color={color}
    />
  ) : null;
};
