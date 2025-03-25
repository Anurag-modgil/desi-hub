import { useState, useEffect } from "react";
import { Globe, ShoppingBag, Users, TrendingUp } from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about-section');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Globe className="h-8 w-8 text-indian-red" />,
      title: "Global Reach",
      description: "Connecting to Indian diaspora across 219 countries through the reliable network of India Post."
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-indian-red" />,
      title: "Authentic Products",
      description: "Providing access to genuine Indian regional products, handicrafts, and cultural items."
    },
    {
      icon: <Users className="h-8 w-8 text-indian-red" />,
      title: "Community Building",
      description: "Creating a bridge between PIOs abroad and local artisans, fostering cultural connections."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-indian-red" />,
      title: "Empowering Artisans",
      description: "Supporting local MSMEs and artisans by providing them with a global platform to showcase their crafts."
    }
  ];

  return (
    <section id="about-section" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className={`font-serif text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            About Bharat Connect
          </h2>
          <p className={`text-gray-600 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Building a community of Indian Diaspora for meeting their needs of Indian Products through India Post by connecting PIOs with local sellers, MSMEs, and artisans.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-16 h-16 bg-indian-gold rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1585222515068-7ddb12ba0550?w=800&auto=format&fit=crop&q=60" 
                alt="Indian Artisan" 
                className="w-full h-[500px] object-cover rounded-lg shadow-xl relative z-10"
              />
              <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-indian-red rounded-full"></div>
            </div>
          </div>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`flex gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`mt-20 p-8 md:p-12 bg-gradient-to-r from-indian-red to-indian-red/80 rounded-xl text-white shadow-lg transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold font-serif">219+</h3>
              <p className="mt-2 text-white/80">Countries Reached</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold font-serif">10,000+</h3>
              <p className="mt-2 text-white/80">Local Artisans</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold font-serif">30M+</h3>
              <p className="mt-2 text-white/80">Indian Diaspora</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
