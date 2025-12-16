import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Autoplay, Thumbs } from "swiper/modules";
import type { ICarouselProps } from "./Carousel.props";
import type { IImageProps } from "../../atoms/Image";
import { Image } from "../../atoms/Image";

export const Carousel: React.FC<ICarouselProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
  showArrows = true,
  showIndicators = true,
  showThumbnails = true,
  onImageClick,
}) => {
  const [selectedImage, setSelectedImage] = useState<IImageProps | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null); // Swiper pour miniatures

  const handleImageClick = (index: number) => {
    setSelectedImage(images[index]);
    if (onImageClick) onImageClick(index);
  };

  return (
    <div>
      {/* Carrousel principal */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={autoPlay ? { delay: autoPlayInterval } : undefined}
        navigation={showArrows}
        pagination={showIndicators ? { clickable: true } : undefined}
        modules={[Navigation, Autoplay, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }} // Synchronisation avec miniatures
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} onClick={() => handleImageClick(index)}>
            <Image
              src={img.src}
              alt={img.alt || `Slide ${index}`}
              className="slider-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Miniatures */}
      {showThumbnails && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="thumbnails-slider"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img.src}
                alt={img.alt || `Thumb ${index}`}
                className="thumbnail-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Affichage plein écran */}
      {selectedImage && (
        <div
          className="selected-image-container"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt || `Slide selected`}
            className="slider-image selected-slider-image"
          />
        </div>
      )}
    </div>
  );
};
