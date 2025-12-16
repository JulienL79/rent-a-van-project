import React from "react";
import type { IImageProps } from "./Image.props";
import "./Image.scss";

export const Image: React.FC<IImageProps> = ({
  className = "",
  src,
  alt = "",
}) => {
  return <img className={className} src={src} alt={alt} />;
};
