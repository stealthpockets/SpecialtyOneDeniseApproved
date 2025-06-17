import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarouselTestimonials } from '../../hooks/useTestimonials';
import { getTestimonialImagePath } from '../../utils/imageHelpers';
import { CloudinaryImage } from '../ui/CloudinaryImage';

export const Testimonials2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { testimonials, loading, error } = useCarouselTestimonials();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && testimonials && testimonials.length > 0) {
      nextSlide();
    }
    if (isRightSwipe && testimonials && testimonials.length > 0) {
      prevSlide();
    }
  };

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying || !testimonials || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getCardStyle = (index: number) => {
    if (!testimonials || testimonials.length === 0) return {};
    
    const diff = index - currentIndex;
    const totalCards = testimonials.length;
    
    // Normalize the difference to handle wrap-around
    const normalizedDiff = ((diff % totalCards) + totalCards) % totalCards;
    
    let transform = '';
    let opacity = 0.3;
    let scale = 0.8;
    let zIndex = 1;
    let blur = 'blur(4px)';
    
    if (normalizedDiff === 0) {
      // Center card (active)
      transform = 'translateX(0%)';
      opacity = 1;
      scale = 1;
      zIndex = 10;
      blur = 'blur(0px)';
    } else if (normalizedDiff === 1 || normalizedDiff === totalCards - 1) {
      // Adjacent cards
      const direction = normalizedDiff === 1 ? 1 : -1;
      transform = `translateX(${direction * 60}%)`;
      opacity = 0.6;
      scale = 0.85;
      zIndex = 5;
      blur = 'blur(2px)';
    } else {
      // Far cards
      const direction = normalizedDiff <= totalCards / 2 ? 1 : -1;
      transform = `translateX(${direction * 120}%)`;
      opacity = 0.2;
      scale = 0.7;
      zIndex = 1;
      blur = 'blur(6px)';
    }

    return {
      transform: `${transform} scale(${scale})`,
      opacity,
      zIndex,
      filter: blur,
      transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
    };
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
          <div className="relative h-96 flex items-center justify-center">
            <div className="bg-cloud rounded-lg shadow-card p-8 w-full max-w-md mx-4">
              <p className="text-gray-600 text-center">Loading testimonials...</p>
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
          <div className="relative h-96 flex items-center justify-center">
            <div className="bg-cloud rounded-lg shadow-card p-8 w-full max-w-md mx-4">
              <p className="text-gray-600 text-center">Unable to load testimonials at this time.</p>
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
          <div className="relative h-96 flex items-center justify-center">
            <div className="bg-cloud rounded-lg shadow-card p-8 w-full max-w-md mx-4">
              <p className="text-gray-600 text-center">No testimonials available.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-sand overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            When the Exit Matters, They <span className="text-gradient">Call Us</span>.
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div 
          className="relative h-[750px] md:h-[500px] flex items-center justify-center mb-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((testimonial, index) => {
            const imageToDisplay = getTestimonialImagePath(testimonial.image_url, testimonial.property_type);
            
            return (
              <div
                key={testimonial.id || index}
                className="absolute w-full max-w-4xl"
                style={getCardStyle(index)}
              >
                <div className="bg-cloud rounded-lg shadow-card overflow-hidden mx-4 border border-opacity-20 h-[700px] md:h-[440px]" style={{ borderColor: '#F0EAE0' }}>
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Image Section */}
                    <div className="w-full md:w-2/5 relative h-48 md:h-full flex-shrink-0">
                      <CloudinaryImage
                        localPath={imageToDisplay}
                        alt={testimonial.author} 
                        className="w-full h-full object-cover"
                        width={400}
                        height={300}
                      />
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1 md:w-3/5 p-4 md:p-6 flex flex-col justify-center min-h-0">
                      <div className="hidden md:block text-4xl opacity-20 mb-2" style={{ color: '#8a0067' }}>"</div>
                      <blockquote className="text-lg md:text-xl font-medium mb-6 text-gray-700 leading-relaxed">
                        {testimonial.quote}
                      </blockquote>
                      <div>
                        <p className="font-bold text-lg text-gray-900">
                          {testimonial.author}
                        </p>
                        {testimonial.property && (
                          <p className="font-medium" style={{ color: '#8a0067' }}>
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

          {/* Navigation Arrows - Only show on desktop if more than 1 testimonial */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-cloud rounded-full p-3 shadow-card hover:shadow-card-hover transition-all duration-300 border"
                style={{ 
                  borderColor: '#F0EAE0',
                  backgroundColor: 'rgba(248, 249, 250, 0.95)'
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" style={{ color: '#8a0067' }} />
              </button>
              
              <button
                onClick={nextSlide}
                className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-cloud rounded-full p-3 shadow-card hover:shadow-card-hover transition-all duration-300 border"
                style={{ 
                  borderColor: '#F0EAE0',
                  backgroundColor: 'rgba(248, 249, 250, 0.95)'
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" style={{ color: '#8a0067' }} />
              </button>
            </>
          )}
        </div>

        {/* Dot Indicators - Only show if more than 1 testimonial */}
        {testimonials.length > 1 && (
          <div className="flex justify-center space-x-3 mb-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentIndex ? '#8a0067' : '#F0EAE0',
                  transform: index === currentIndex ? 'scale(1.25)' : 'scale(1)',
                  border: index === currentIndex ? 'none' : '1px solid #8a0067'
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play indicator - Only show if auto-playing and more than 1 testimonial */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 text-sm" style={{ color: '#6dae94' }}>
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: isAutoPlaying ? '#1a473a' : '#F0EAE0' }}
              />
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
            </div>
          </div>
        )}

        {/* Success Stories Link */}
        <div className="text-center">
          <Link 
            to="/success-stories" 
            className="inline-flex items-center font-medium transition-colors hover:opacity-80"
            style={{ color: '#8a0067' }}
          >
            See All Success Stories
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};