
import { Star, MapPin, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  region: string;
  rating: number;
  category: string;
  seller?: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onViewDetails?: () => void;
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 fill-indian-gold text-indian-gold" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-indian-gold" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="w-4 h-4 fill-indian-gold text-indian-gold" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-indian-gold" />
      );
    }
    
    return stars;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      seller: product.seller || "Bharat Connect Seller"
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
      duration: 3000,
    });
  };

  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden h-60">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-indian-red">
          {product.category}
        </div>
      </div>
      
      <div className="p-5 space-y-3">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{product.region}</span>
        </div>
        
        <h3 className="font-serif text-lg font-medium text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {renderRatingStars(product.rating)}
            <span className="ml-1 text-sm text-gray-500">({product.rating})</span>
          </div>
          
          <div className="text-lg font-semibold text-indian-red">
            {formatPrice(product.price)}
          </div>
        </div>
        
        <div className="pt-4 pb-2 grid grid-cols-2 gap-3">
          <motion.button 
            className="py-2.5 rounded-md font-medium transition-all duration-300 bg-indian-red text-white hover:bg-indian-red/90 flex items-center justify-center"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="w-4 h-4 mr-1" />
            Add to Cart
          </motion.button>
          <motion.button 
            className={`py-2.5 rounded-md font-medium transition-all duration-300 ${
              isHovered 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (onViewDetails) onViewDetails();
            }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
