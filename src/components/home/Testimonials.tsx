import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "We realized more than we ever expected. Andrew protected our legacy.",
    author: "The Weech Family",
    property: "The Palms",
    image: "/dist/assets/success-stories/the-palms.webp"
  },
  {
    quote: "They made a tough deal look easy.",
    author: "George Bunting",
    property: "Caravan Oasis",
    image: "/dist/assets/success-stories/caravan-oasis.webp"
  },
  {
    quote: "One of the few brokers I trust to get it right.",
    author: "George Han, Three Pillar",
    property: "Multiple Properties",
    image: "/dist/assets/property-types/manufactured-housing-community-investment.webp"
  },
  {
    quote: "We got full price during COVID. That says everything.",
    author: "Pericles Wyatt",
    property: "Desert Trails RV Park",
    image: "/dist/assets/success-stories/desert-trails.webp"
  }
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <section className="py-16 bg-sand">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            When the Exit Matters, They <span className="text-gradient">Call Us</span>.
          </h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-cloud rounded-lg shadow-card overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 relative h-64 md:h-auto">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-8 md:p-10 flex flex-col justify-center">
                        <div className="text-5xl text-plum opacity-20 mb-4">"</div>
                        <blockquote className="text-xl md:text-2xl font-medium mb-6">
                          {testimonial.quote}
                        </blockquote>
                        <div>
                          <p className="font-bold text-lg">
                            {testimonial.author}
                          </p>
                          <p className="text-gray-600">
                            {testimonial.property}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-cloud p-2 rounded-full shadow-md hover:bg-plum hover:text-white transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 md:translate-x-8 bg-cloud p-2 rounded-full shadow-md hover:bg-plum hover:text-white transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === activeIndex ? 'bg-plum' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/success" className="text-plum hover:text-amethyst font-medium inline-flex items-center transition-colors">
            See All Success Stories
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};