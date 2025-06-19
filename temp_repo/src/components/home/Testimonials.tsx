import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarouselTestimonials } from '../../hooks/useTestimonials';
import { getTestimonialImagePath } from '../../utils/imageHelpers';
import { CloudinaryImage } from '../ui/CloudinaryImage';

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { testimonials, loading, error } = useCarouselTestimonials();
  
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
  
  // Handle loading state
  if (loading) {
    return (
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              When the Exit Matters, They <span className="text-gradient">Call Us</span>.
            </h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-cloud rounded-lg shadow-card overflow-hidden h-64 md:h-96 flex items-center justify-center">
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (error) {
    console.error('Testimonials error:', error);
    return (
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              When the Exit Matters, They <span className="text-gradient">Call Us</span>.
            </h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-cloud rounded-lg shadow-card overflow-hidden h-64 md:h-96 flex items-center justify-center">
              <p className="text-gray-600">Unable to load testimonials at this time.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Handle empty testimonials
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              When the Exit Matters, They <span className="text-gradient">Call Us</span>.
            </h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-cloud rounded-lg shadow-card overflow-hidden h-64 md:h-96 flex items-center justify-center">
              <p className="text-gray-600">No testimonials available.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
              {testimonials.map((testimonial, index) => {
                const imageToDisplay = getTestimonialImagePath(testimonial.image_url, testimonial.property_type);
                
                return (
                  <div key={testimonial.id || index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-cloud rounded-lg shadow-card overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3 relative h-64 md:h-auto">
                          <CloudinaryImage
                            localPath={imageToDisplay}
                            alt={testimonial.author} 
                            className="w-full h-full object-cover"
                            width={400}
                            height={300}
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
                            {testimonial.property && (
                              <p className="text-gray-600">
                                {testimonial.property}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Navigation Buttons - Only show if more than 1 testimonial */}
          {testimonials.length > 1 && (
            <>
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
            </>
          )}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/success-stories" className="text-plum hover:text-amethyst font-medium inline-flex items-center transition-colors">
            See All Success Stories
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
