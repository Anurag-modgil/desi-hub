
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, X, MapPin, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  region: string;
  rating: number;
  category: string;
  description: string;
  seller: string;
}

interface ProductDetailsProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetails = ({ product, isOpen, onClose }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addItem } = useCart();
  const { toast } = useToast();

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      seller: product.seller
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
      duration: 3000,
    });
    
    onClose();
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 z-10">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative h-[300px] md:h-full bg-gray-100">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-indian-red">
              {product.category}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{product.region}</span>
              </div>
              
              <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h2>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {renderRatingStars(product.rating)}
                </div>
                <span className="text-sm text-gray-500">({product.rating})</span>
              </div>
              
              <div className="text-2xl font-bold text-indian-red mb-6">
                {formatPrice(product.price)}
              </div>
            </div>
            
            {/* Tabs */}
            <div>
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "description"
                      ? "text-indian-red border-b-2 border-indian-red"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "details"
                      ? "text-indian-red border-b-2 border-indian-red"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "description" ? (
                    <div className="text-gray-600 text-sm space-y-4">
                      <p>{product.description}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Category</span>
                        <span className="font-medium">{product.category}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Region</span>
                        <span className="font-medium">{product.region}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Seller</span>
                        <span className="font-medium">{product.seller}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Rating</span>
                        <span className="font-medium">{product.rating} out of 5</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Add to Cart Section */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="text-lg font-semibold">
                  Total: {formatPrice(product.price * quantity)}
                </div>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="w-full bg-indian-red hover:bg-indian-red/90 text-white py-6"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
