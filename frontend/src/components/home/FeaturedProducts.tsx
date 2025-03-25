
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "../shared/ProductCard";
import { useNavigate } from "react-router-dom";

// Mock data for product categories and products
const categories = [
  "All Products",
  "Traditional Attires",
  "Handicrafts",
  "Puja Samagri",
  "Sweets & Snacks",
  "Home Decor"
];

const products = [
  {
    id: 1,
    name: "Handwoven Banarasi Saree",
    price: 12500,
    image: "/placeholder.svg",
    region: "Varanasi, Uttar Pradesh",
    rating: 4.8,
    category: "Traditional Attires"
  },
  {
    id: 2,
    name: "Kumartuli Clay Idol",
    price: 1850,
    image: "/placeholder.svg",
    region: "Kolkata, West Bengal",
    rating: 4.7,
    category: "Puja Samagri"
  },
  {
    id: 3,
    name: "Santiniketan Leather Bag",
    price: 2200,
    image: "/placeholder.svg",
    region: "Santiniketan, West Bengal",
    rating: 4.6,
    category: "Handicrafts"
  },
  {
    id: 4,
    name: "Joynagar Moya",
    price: 550,
    image: "/placeholder.svg",
    region: "Joynagar, West Bengal",
    rating: 4.9,
    category: "Sweets & Snacks"
  },
  {
    id: 5,
    name: "Terracotta Wall Art",
    price: 3200,
    image: "/placeholder.svg",
    region: "Bishnupur, West Bengal",
    rating: 4.5,
    category: "Home Decor"
  },
  {
    id: 6,
    name: "Traditional Copper Pooja Thali",
    price: 1800,
    image: "/placeholder.svg",
    region: "Jaipur, Rajasthan",
    rating: 4.8,
    category: "Puja Samagri"
  }
];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('featured-products');
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
  
  useEffect(() => {
    if (activeCategory === "All Products") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === activeCategory));
    }
  }, [activeCategory]);

  const handleViewProductDetails = (productId: number) => {
    // Navigate to products page with the product ID
    navigate(`/products`);
  };

  return (
    <section id="featured-products" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className={`font-serif text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Authentic Indian Products
          </h2>
          <p className={`text-gray-600 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Discover handcrafted treasures from artisans across India, carefully selected for the global Indian community.
          </p>
        </div>
        
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-indian-red text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <ProductCard 
                product={product} 
                onViewDetails={() => handleViewProductDetails(product.id)}
              />
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-12 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            variant="outline" 
            className="border-indian-red text-indian-red hover:bg-indian-red hover:text-white rounded-full px-8"
            onClick={() => navigate("/products")}
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
