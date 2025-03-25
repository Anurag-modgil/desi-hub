
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { CartProvider } from "@/contexts/CartContext";
import ChatBot from "@/components/chatbot/ChatBot";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BuyerRegistration from "./pages/BuyerRegistration";
import SellerRegistration from "./pages/SellerRegistration";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductCategory from "./pages/ProductCategory";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Helmet defaultTitle="Bharat Connect | Authentic Indian Products" titleTemplate="%s | Bharat Connect">
              <meta name="description" content="Connecting the global Indian diaspora with authentic products from India through India Post's trusted network." />
            </Helmet>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/buyer-registration" element={<BuyerRegistration />} />
              <Route path="/seller-registration" element={<SellerRegistration />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/category/:category" element={<ProductCategory />} />
              <Route path="/profile" element={<Profile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatBot />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
