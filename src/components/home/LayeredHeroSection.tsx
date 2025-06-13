import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';

interface HeroSlide {
  id: number;
  headline: string;
  subline: string;
  copy: string;
  cta: string;
  ctaLink: string;
  image: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    headline: "SPECIALTY ONE INVESTMENT BROKERAGE",
    subline: "Your Edge in Manufactured Housing, Self-Storage & RV Resorts",
    copy: "We qualify capital, structure the terms, and solve problems before you hit escrow. Whether you need confidentiality or full exposure—we drive results.",
    cta: "Free Property Valuation",
    ctaLink: "https://form.typeform.com/to/I3hYeHFX", // General Valuation
    image: "/assets/property-types/parkmodel_rv_park_apache_junction_arizona.webp"
  },
  {
    id: 2,
    headline: "SPECIALTY ONE INVESTMENT BROKERAGE",
    subline: "Self-Storage | RV Storage",
    copy: "$721M+ in closings. Hundreds of properties sold. Led by one of the most trusted brokers in the storage space. We don't dabble in self-storage. We've built careers in it. If you want real execution—not retail broker guessing—this is where it happens.",
    cta: "Free Property Valuation",
    ctaLink: "https://form.typeform.com/to/bWvmdW4G", // Self-Storage Valuation
    image: "/assets/property-types/self-storage-investment-arizona.webp"
  },
  {
    id: 3,
    headline: "SPECIALTY ONE INVESTMENT BROKERAGE",
    subline: "Manufactured Housing | Mobile Home Parks",
    copy: "Whether you're repositioning, refinancing, or fully exiting, our process ensures you close clean, confidential, and on your timeline—with buyer expectations set up front.",
    cta: "Free Property Valuation",
    ctaLink: "https://form.typeform.com/to/xOfJMRta", // Manufactured Housing Valuation
    image: "/assets/property-types/rv_park_mhp_resort_apache_junction.webp"
  },
  {
    id: 4,
    headline: "SPECIALTY ONE INVESTMENT BROKERAGE",
    subline: "RV Resorts | Outdoor Hospitality",
    copy: "It's not \"Just a Park.\" It's an Operating Business. We know the difference. That's why serious owners trust us to structure clean, efficient exits. $300M+ in MH & RV Transactions. No marketing theater. No retrade culture.",
    cta: "Free Property Valuation",
    ctaLink: "https://form.typeform.com/to/CpdFYMm6", // RV Resort Valuation
    image: "/assets/property-types/rv_park_resort_arizona.webp"
  }
];

export const LayeredHeroSection = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Responsive detection
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Auto-advance carousel on desktop
  useEffect(() => {
    if (!isPlaying || !isDesktop) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // 5-second interval
    
    return () => clearInterval(interval);
  }, [isPlaying, isDesktop]);

  // Only render on desktop - mobile will see this component hidden
  if (!isDesktop) {
    return null;
  }

  // Desktop: Enhanced hero carousel
  return (
    <div className="relative">
      {/* Enhanced Hero Carousel */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Carousel Slides */}
        <div className="relative h-screen pt-[160px]">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/75 to-obsidian/20"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container-custom z-10">
                  <div className="max-w-4xl text-sand">
                    <div className="mb-4">
                      <h1 className="font-serif text-2xl lg:text-3xl text-cloud font-bold mb-2">
                        {slide.headline}
                      </h1>
                      <div className="w-32 h-0.5 bg-gradient-to-r from-sage to-evergreen opacity-80"></div>
                    </div>
                    
                    <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-sand">
                      {slide.subline}
                    </h2>
                    
                    <p className="text-lg lg:text-xl mb-8 opacity-90 leading-relaxed max-w-3xl text-sand">
                      {slide.copy}
                    </p>
                    
                    <Button 
                      href={slide.ctaLink}
                      variant="primary" 
                      size="lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {slide.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsPlaying(false);
                  setTimeout(() => setIsPlaying(true), 3000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-sage scale-125 shadow-lg'
                    : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute bottom-8 right-8 bg-obsidian/60 backdrop-blur-sm rounded-full px-4 py-2 z-10">
            <span className="text-sand text-sm font-medium">
              {currentSlide + 1} / {heroSlides.length}
            </span>
          </div>
        </div>

      </section>
    </div>
  );
};
