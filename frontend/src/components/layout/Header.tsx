
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <img 
            src="/lovable-uploads/249d91fe-95aa-4a19-8f7e-90615cdca296.png" 
            alt="India Post Logo" 
            className="h-12 w-auto"
          />
          <span className="font-serif text-xl font-medium text-indian-red hidden md:inline-block">
            Bharat Connect
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-indian-red transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-foreground hover:text-indian-red transition-colors">
            About
          </Link>
          <Link to="/products" className="text-foreground hover:text-indian-red transition-colors">
            Products
          </Link>
          <Link to="/buyer-registration" className="text-foreground hover:text-indian-red transition-colors">
            For Buyers
          </Link>
          <Link to="/seller-registration" className="text-foreground hover:text-indian-red transition-colors">
            For Sellers
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Cart Button */}
          <button 
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-indian-red text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-fade-in">
                {totalItems}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="flex items-center gap-1 text-sm"
                onClick={() => navigate("/profile")}
              >
                <User size={18} />
                <span>Profile</span>
              </Button>
              <Button
                variant="outline"
                className="border-indian-red text-indian-red hover:bg-indian-red hover:text-white transition-all"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-indian-red text-indian-red hover:bg-indian-red hover:text-white transition-all"
                onClick={() => navigate("/sign-in")}
              >
                <User size={18} />
                <span>Sign In</span>
              </Button>
              <Button 
                className="bg-indian-red text-white hover:bg-indian-red/90 transition-all"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center md:hidden">
          {/* Cart Button */}
          <button 
            onClick={() => setCartOpen(true)}
            className="relative p-2 mr-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-indian-red text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-fade-in">
                {totalItems}
              </span>
            )}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            className="text-foreground hover:text-indian-red focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col pt-20 px-6 md:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col space-y-5 items-center text-lg">
          <Link 
            to="/" 
            className="w-full py-3 text-center border-b border-gray-100 hover:text-indian-red"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="w-full py-3 text-center border-b border-gray-100 hover:text-indian-red"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/products" 
            className="w-full py-3 text-center border-b border-gray-100 hover:text-indian-red"
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            to="/buyer-registration" 
            className="w-full py-3 text-center border-b border-gray-100 hover:text-indian-red"
            onClick={() => setMobileMenuOpen(false)}
          >
            For Buyers
          </Link>
          <Link 
            to="/seller-registration" 
            className="w-full py-3 text-center border-b border-gray-100 hover:text-indian-red"
            onClick={() => setMobileMenuOpen(false)}
          >
            For Sellers
          </Link>
        </nav>
        <div className="flex flex-col gap-3 mt-8">
          {isAuthenticated ? (
            <>
              <Button 
                variant="outline" 
                className="flex justify-center items-center gap-2 border-indian-red text-indian-red hover:bg-indian-red hover:text-white"
                onClick={() => {
                  navigate("/profile");
                  setMobileMenuOpen(false);
                }}
              >
                <User size={18} />
                <span>Profile</span>
              </Button>
              <Button 
                className="bg-indian-red text-white hover:bg-indian-red/90"
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="flex justify-center items-center gap-2 border-indian-red text-indian-red hover:bg-indian-red hover:text-white"
                onClick={() => {
                  navigate("/sign-in");
                  setMobileMenuOpen(false);
                }}
              >
                <User size={18} />
                <span>Sign In</span>
              </Button>
              <Button 
                className="bg-indian-red text-white hover:bg-indian-red/90"
                onClick={() => {
                  navigate("/register");
                  setMobileMenuOpen(false);
                }}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />
    </header>
  );
};

export default Header;
