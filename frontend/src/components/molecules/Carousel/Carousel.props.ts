import type { IImageProps } from "../../atoms/Image";

export interface ICarouselProps {
  images: IImageProps[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  showThumbnails?: boolean;
  onImageClick?: (index: number) => void;
}
