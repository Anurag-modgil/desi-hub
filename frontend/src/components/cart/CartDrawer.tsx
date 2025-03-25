
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }
    
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Cart Drawer */}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-96 max-w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-4 py-4 flex items-center justify-between border-b">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-indian-red mr-2" />
              <h2 className="font-semibold text-lg">Your Cart ({totalItems})</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">Looks like you haven't added any items yet</p>
                <Button onClick={onClose} className="bg-indian-red hover:bg-indian-red/90 text-white">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemCard 
                    key={item.id} 
                    item={item} 
                    onRemove={() => removeItem(item.id)} 
                    onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)} 
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="w-full border-indian-red text-indian-red hover:bg-indian-red/5"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <Button 
                  className="w-full bg-indian-red hover:bg-indian-red/90 text-white"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const CartItemCard = ({ 
  item, 
  onRemove, 
  onUpdateQuantity 
}: { 
  item: CartItem; 
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}) => {
  return (
    <div className="flex border rounded-lg p-3 animate-fade-in">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded-md"
      />
      
      <div className="flex-1 ml-4">
        <div className="flex justify-between">
          <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
          <button 
            onClick={onRemove}
            className="text-gray-400 hover:text-indian-red transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mb-2">Seller: {item.seller}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center border rounded-md">
            <button 
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:text-indian-red transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="px-2 py-1 text-sm">{item.quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:text-indian-red transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
