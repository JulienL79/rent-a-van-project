import React, { useRef } from "react";
import "./TestimonialSlider.scss";
import type { ITestimonialSliderProps } from "./TestimonialSlider.props";

export const TestimonialSlider: React.FC<ITestimonialSliderProps> = ({
  title = "Ce que disent nos clients",
  testimonials,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -width : width,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="testimonials">
      <h2>{title}</h2>
      <div className="testimonial-wrapper">
        <button className="arrow left" onClick={() => scroll("left")}>
          <span className="arrow-icon">‹</span>
        </button>
        <div className="testimonial-slider" ref={sliderRef}>
          {testimonials.map((testimonial, index) => (
            <div className="testimonial" key={index}>
              <q>{testimonial.content}</q>
              <p>- {testimonial.author}</p>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={() => scroll("right")}>
          <span className="arrow-icon">›</span>
        </button>
      </div>
    </section>
  );
};
