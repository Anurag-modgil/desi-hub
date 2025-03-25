
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-indian-red text-white">
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/249d91fe-95aa-4a19-8f7e-90615cdca296.png" 
                alt="India Post Logo" 
                className="h-12 w-auto"
              />
              <h3 className="font-serif text-2xl text-white font-medium">Bharat Connect</h3>
            </div>
            <p className="text-white/90 max-w-xs">
              Building a community of Indian Diaspora for meeting their needs of Indian Products through India Post.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-indian-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-indian-gold transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-indian-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-xl text-indian-gold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/90 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/90 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-white/90 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/buyer-registration" className="text-white/90 hover:text-white transition-colors">For Buyers</Link></li>
              <li><Link to="/seller-registration" className="text-white/90 hover:text-white transition-colors">For Sellers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl text-indian-gold mb-4">Product Categories</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-white/90 hover:text-white transition-colors">Traditional Handicrafts</Link></li>
              <li><Link to="/products" className="text-white/90 hover:text-white transition-colors">Traditional Attires</Link></li>
              <li><Link to="/products" className="text-white/90 hover:text-white transition-colors">Puja Samagri</Link></li>
              <li><Link to="/products" className="text-white/90 hover:text-white transition-colors">Ethnic Jewelry</Link></li>
              <li><Link to="/products" className="text-white/90 hover:text-white transition-colors">Regional Food Products</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl text-indian-gold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-white/90">Department of Posts, India Post, Dak Bhawan, Sansad Marg, New Delhi-110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-white/90">+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-white/90">contact@bharat.indiapost.gov.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-8 border-white/20" />
        
        <div className="text-center text-white/80">
          <p>&copy; {new Date().getFullYear()} Department of Posts, Government of India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
