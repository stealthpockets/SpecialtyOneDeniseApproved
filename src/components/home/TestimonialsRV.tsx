import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { CarouselTestimonialData } from '../../types/testimonial';

export const TestimonialsRV = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState<CarouselTestimonialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Fetch testimonials by property_type
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('testimonials')
          .select('id, testimonial_text, person, property_name, image_url, property_type, placement_type, status, is_strongest')
          .eq('property_type', 'RV Park')
          .eq('status', 'published')
          .eq('is_strongest', true)
          .is('deleted_at', null)
          .order('is_strongest', { ascending: false })
          .order('created_at', { ascending: true });

        if (supabaseError) {
          console.error("Error fetching testimonials:", supabaseError);
          throw supabaseError;
        }

        // Transform Supabase data to component format
        const formattedData: CarouselTestimonialData[] = data?.map((item: any) => ({
          id: item.id,
          quote: item.testimonial_text,
          author: item.person,
          property: item.property_name || undefined,
          image_url: item.image_url,
          property_type: item.property_type,
        })) || [];

        setTestimonials(formattedData);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to fetch testimonials. Please try again later.');
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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
              What RV Park Sellers Say After the <span className="text-gradient">Deal Closes</span>
            </h2>
          </div>          <div className="relative h-[600px] md:h-96 flex items-center justify-center">
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
              What RV Park Sellers Say After the <span className="text-gradient">Deal Closes</span>
            </h2>
          </div>          <div className="relative h-[600px] md:h-96 flex items-center justify-center">
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
              What RV Park Sellers Say After the <span className="text-gradient">Deal Closes</span>
            </h2>
          </div>          <div className="relative h-[600px] md:h-96 flex items-center justify-center">
            <div className="bg-cloud rounded-lg shadow-card p-8 w-full max-w-md mx-4">
              <p className="text-gray-600 text-center">No testimonials available.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-cloud overflow-hidden">
      <div className="container-custom">        {/* Section Header */}
        <div className="text-center mb-4 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 md:mb-4">
            What RV Park Sellers Say After the <span className="text-gradient">Deal Closes</span>
          </h2>
        </div>        {/* Testimonial Carousel */}
        <div 
          className="relative h-[280px] md:h-[300px] flex items-center justify-center mb-12 md:mb-20 mt-40 md:mt-24"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >{testimonials.map((testimonial, index) => {
            return (<div
                key={testimonial.id || index}
                className="absolute w-full max-w-3xl"
                style={getCardStyle(index)}
              >                <div className="bg-white rounded-lg shadow-card overflow-hidden mx-4 border border-opacity-20" style={{ borderColor: '#F0EAE0' }}>
                  <div className="p-6 md:p-12 text-center">
                    <blockquote className="text-lg md:text-2xl font-medium mb-4 md:mb-8 text-gray-700 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-bold text-base md:text-lg text-gray-900 mb-1">
                        {testimonial.author}
                      </p>
                      {testimonial.property && (
                        <p className="font-medium text-sm md:text-base" style={{ color: '#8a0067' }}>
                          {testimonial.property}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}          {/* Navigation Arrows - Only show on desktop if more than 1 testimonial */}
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
          </div>        )}
      </div>
    </section>
  );
};
