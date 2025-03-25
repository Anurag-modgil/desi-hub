
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "/placeholder.svg",
      title: "Our Heritage",
      subtitle: "Connecting you to the heart and soul of India"
    },
    {
      image: "/placeholder.svg",
      title: "Traditional Craftsmanship",
      subtitle: "Authentic products from skilled artisans across India"
    },
    {
      image: "/placeholder.svg",
      title: "Cultural Textiles",
      subtitle: "Handwoven fabrics with centuries of tradition"
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    // Automatic slideshow
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-indian-cream to-white opacity-80 z-0"></div>
      
      {/* Decorative elements with animations */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-indian-gold/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-indian-red/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center py-16 gap-10">
        <div className={`w-full lg:w-1/2 space-y-6 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-indian-red/10 px-4 py-1 rounded-full text-indian-red font-medium mb-2 border border-indian-red/20 animate-fade-in">
            India Post Initiative
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            A Bridge for <span className="text-indian-red relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-1 after:-bottom-1 after:left-0 after:bg-indian-red after:origin-bottom-right after:transition-transform after:duration-500 hover:after:scale-x-100 hover:after:origin-bottom-left">Indian Diaspora</span> to Access Things Indian
          </h1>
          
          <p className="text-lg text-gray-700 max-w-xl">
            Connecting PIOs with local sellers, MSMEs, and artisans to bring authentic Indian products to the global Indian community.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Button 
              size="lg"
              className="bg-indian-red hover:bg-indian-red/90 text-white rounded-full transform transition-transform hover:scale-105 active:scale-95"
            >
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-indian-red text-indian-red hover:bg-indian-red hover:text-white rounded-full transform transition-transform hover:scale-105 active:scale-95"
            >
              Join as a Seller
            </Button>
          </div>
          
          <div className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-indian-red flex items-center justify-center text-white transform hover:scale-110 transition-transform">IN</div>
              <div className="w-10 h-10 rounded-full bg-indian-gold flex items-center justify-center text-gray-900 transform hover:scale-110 transition-transform">US</div>
              <div className="w-10 h-10 rounded-full bg-indian-blue flex items-center justify-center text-white transform hover:scale-110 transition-transform">UK</div>
            </div>
            <p className="text-gray-600">
              Serving <span className="font-semibold">219+ countries</span> with Indian diaspora
            </p>
          </div>
        </div>
        
        <div className={`w-full lg:w-1/2 rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-x-10'} relative`}>
          {/* Slideshow controls */}
          <button 
            onClick={prevSlide} 
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-gray-800 hover:bg-white transition-colors opacity-0 lg:opacity-70 hover:opacity-100 focus:outline-none"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <button 
            onClick={nextSlide} 
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-gray-800 hover:bg-white transition-colors opacity-0 lg:opacity-70 hover:opacity-100 focus:outline-none"
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          
          {/* Slideshow */}
          <div className="relative h-[500px] overflow-hidden">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : index < currentSlide 
                      ? 'opacity-0 -translate-x-full z-0' 
                      : 'opacity-0 translate-x-full z-0'
                }`}
              >
                <div className="absolute inset-0 bg-indian-red/10 mix-blend-multiply z-10"></div>
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 z-20">
                  <h2 className="text-white font-serif text-2xl font-semibold mb-2">{slide.title}</h2>
                  <p className="text-white/80">{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Slideshow indicators */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Wave decoration at the bottom with animation */}
      <div className="absolute bottom-0 w-full h-16 bg-white clip-path-wave"></div>
    </section>
  );
};

export default Hero;
