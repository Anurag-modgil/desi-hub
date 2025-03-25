
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <FeaturedProducts />
        
        {/* Testimonials Section */}
        <section className="py-20 bg-indian-cream">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Connecting Hearts Across Oceans
              </h2>
              <p className="text-gray-600">
                Hear from members of our global Indian community about how Bharat Connect helps them stay connected to their roots.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indian-red/20 rounded-full flex items-center justify-center text-indian-red font-medium">RP</div>
                  <div className="ml-4">
                    <h4 className="font-medium">Rajiv Patel</h4>
                    <p className="text-sm text-gray-500">New Jersey, USA</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Finally, I can get authentic puja samagri directly from Varanasi! The quality is impeccable, and it feels like bringing a piece of home to our celebrations abroad."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indian-gold/20 rounded-full flex items-center justify-center text-indian-gold font-medium">AM</div>
                  <div className="ml-4">
                    <h4 className="font-medium">Anita Mehta</h4>
                    <p className="text-sm text-gray-500">London, UK</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The handicrafts from Santiniketan bring back memories of my childhood. I'm grateful for this platform that connects me to the artisans who keep our traditions alive."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indian-green/20 rounded-full flex items-center justify-center text-indian-green font-medium">SN</div>
                  <div className="ml-4">
                    <h4 className="font-medium">Suresh Nair</h4>
                    <p className="text-sm text-gray-500">Sydney, Australia</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "For my daughter's wedding, we ordered traditional silks from Tamil Nadu. The quality and craftsmanship were exactly what we wanted, bringing authentic Indian elements to our celebration."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-indian-red text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Join Our Growing Community
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Whether you're looking for authentic Indian products or you're an artisan wanting to reach a global audience, Bharat Connect is here for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/buyer-registration" className="bg-white text-indian-red px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors inline-block">
                  Register as Buyer
                </Link>
                <Link to="/seller-registration" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors inline-block">
                  Join as Seller
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Star = () => (
  <svg className="w-5 h-5 text-indian-gold fill-indian-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default Index;
