export interface ITestimonial {
  content: string;
  author: string;
}

export interface ITestimonialSliderProps {
  title?: string;
  testimonials: ITestimonial[];
}
