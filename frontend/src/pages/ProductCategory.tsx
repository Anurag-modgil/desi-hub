
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/shared/ProductCard";
import ProductDetails from "@/components/products/ProductDetails";

// Import the same product data from Products.tsx
const allProducts = [
  {
    id: 1,
    name: "Handwoven Banarasi Saree",
    price: 12500,
    image: "https://images.unsplash.com/photo-1609487435804-640004a48da5?w=500&auto=format&fit=crop&q=60",
    region: "Varanasi, Uttar Pradesh",
    rating: 4.8,
    category: "Traditional Attires",
    description: "This exquisite handwoven Banarasi saree is crafted by skilled artisans from Varanasi. Made with pure silk and adorned with intricate gold zari work, it represents the pinnacle of Indian craftsmanship. Perfect for weddings and special occasions, this saree embodies timeless elegance and cultural heritage.",
    seller: "Varanasi Handloom House"
  },
  {
    id: 2,
    name: "Kumartuli Clay Idol",
    price: 1850,
    image: "https://images.unsplash.com/photo-1635016288640-a1cf5a494509?w=500&auto=format&fit=crop&q=60",
    region: "Kolkata, West Bengal",
    rating: 4.7,
    category: "Puja Samagri",
    description: "Created by master artisans from Kolkata's famous Kumartuli district, this clay idol is handcrafted using traditional techniques passed down through generations. Each piece is carefully molded, dried, and hand-painted to depict divine forms with remarkable detail and expression. A true piece of Bengali cultural artistry.",
    seller: "Kumartuli Arts Collective"
  },
  {
    id: 3,
    name: "Santiniketan Leather Bag",
    price: 2200,
    image: "https://images.unsplash.com/photo-1590874315261-788881621f7a?w=500&auto=format&fit=crop&q=60",
    region: "Santiniketan, West Bengal",
    rating: 4.6,
    category: "Handicrafts",
    description: "This elegant leather bag comes from Santiniketan, a place renowned for its leather craftsmanship. Each bag is handcrafted using genuine leather with traditional batik and embossing techniques. Functional yet artistic, these bags feature motifs inspired by Tagore's vision of rural Bengal, making each piece truly unique.",
    seller: "Amar Kutir Crafts Society"
  },
  {
    id: 4,
    name: "Joynagar Moya",
    price: 550,
    image: "https://images.unsplash.com/photo-1610500796385-3ffc1ae2fccb?w=500&auto=format&fit=crop&q=60",
    region: "Joynagar, West Bengal",
    rating: 4.9,
    category: "Sweets & Snacks",
    description: "A traditional Bengali sweet delicacy from Joynagar with GI tag recognition. Made from nolen gur (date palm jaggery) and popped rice (khoi), this seasonal winter delicacy follows a 100-year-old recipe. Each batch is prepared in small quantities to maintain its authentic taste and texture. Perfectly sweet with a distinctive aroma of nolen gur.",
    seller: "Heritage Sweet House"
  },
  {
    id: 5,
    name: "Terracotta Wall Art",
    price: 3200,
    image: "https://images.unsplash.com/photo-1611464613695-3a60f0f8e0ef?w=500&auto=format&fit=crop&q=60",
    region: "Bishnupur, West Bengal",
    rating: 4.5,
    category: "Home Decor",
    description: "This stunning terracotta wall art showcases the famous Bishnupur terracotta craft tradition. Hand-sculpted by skilled artisans, it features intricate designs inspired by the ancient temples of Bengal. Each piece is kiln-fired using traditional methods, resulting in the distinctive reddish-orange hue that characterizes this art form. A statement piece for your home.",
    seller: "Bankura Crafts Collective"
  },
  {
    id: 6,
    name: "Traditional Copper Pooja Thali",
    price: 1800,
    image: "https://images.unsplash.com/photo-1635321593217-004db873582e?w=500&auto=format&fit=crop&q=60",
    region: "Jaipur, Rajasthan",
    rating: 4.8,
    category: "Puja Samagri",
    description: "Handcrafted by skilled metalsmiths in Jaipur, this copper pooja thali set includes all essential items for daily rituals. Each piece is made from high-quality copper known for its purifying properties in Ayurveda. The thali features traditional engravings and comes with matching diya, kalash, and bell. Perfect for maintaining the sanctity of your pooja rituals.",
    seller: "Rajasthan Metal Crafts"
  },
  {
    id: 7,
    name: "Kashmir Pashmina Shawl",
    price: 9500,
    image: "https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=500&auto=format&fit=crop&q=60",
    region: "Kashmir, Jammu & Kashmir",
    rating: 4.9,
    category: "Traditional Attires",
    description: "This authentic Kashmiri Pashmina shawl is hand-spun and hand-woven by master artisans in Kashmir. Made from the finest Pashmina wool obtained from the Changthangi goat, it undergoes a meticulous process of spinning, weaving, and embroidery. The delicate Sozni embroidery embellishing this shawl takes months to complete, creating a luxurious masterpiece of warmth and elegance.",
    seller: "Kashmir Handicrafts Emporium"
  },
  {
    id: 8,
    name: "Madhubani Painting",
    price: 4500,
    image: "https://images.unsplash.com/photo-1582201943055-e0571c213adb?w=500&auto=format&fit=crop&q=60",
    region: "Madhubani, Bihar",
    rating: 4.7,
    category: "Home Decor",
    description: "This vibrant Madhubani painting is created by women artists from Bihar using traditional techniques passed down through generations. Painted with natural dyes and pigments on handmade paper, it depicts mythological narratives and nature motifs with geometric patterns and bright colors. Each piece tells a story from Indian mythology, making it both culturally significant and visually stunning.",
    seller: "Mithila Art Institute"
  },
  {
    id: 9,
    name: "Darjeeling Tea Collection",
    price: 2200,
    image: "https://images.unsplash.com/photo-1525057981460-25d4a22630a7?w=500&auto=format&fit=crop&q=60",
    region: "Darjeeling, West Bengal",
    rating: 4.8,
    category: "Sweets & Snacks",
    description: "Experience the finest teas from the Himalayan foothills with this premium Darjeeling tea collection. This set includes First Flush, Second Flush, and Autumn Flush teas, each with their distinct flavors and aromas. Handpicked from high-altitude tea gardens and carefully processed to preserve their characteristic muscatel flavor, these teas represent the champagne of teas worldwide.",
    seller: "Darjeeling Tea Estates"
  },
  {
    id: 10,
    name: "Mysore Silk Saree",
    price: 15800,
    image: "https://images.unsplash.com/photo-1520013225692-fff4010c0ae6?w=500&auto=format&fit=crop&q=60",
    region: "Mysore, Karnataka",
    rating: 4.9,
    category: "Traditional Attires",
    description: "The legendary Mysore Silk Saree is known for its luxurious texture and brilliant luster. Produced by the Karnataka Silk Industries Corporation, these sarees are made with pure mulberry silk and feature real gold zari work. The distinctive pallus with intricate borders and traditional motifs make these sarees a treasured heirloom that can be passed down through generations.",
    seller: "Mysore Silk Emporium"
  },
  {
    id: 11,
    name: "Bidriware Flower Vase",
    price: 5800,
    image: "https://images.unsplash.com/photo-1602029432575-f232012b8b62?w=500&auto=format&fit=crop&q=60",
    region: "Bidar, Karnataka",
    rating: 4.6,
    category: "Home Decor",
    description: "This exquisite Bidriware flower vase showcases the ancient Persian-influenced metal handicraft from Bidar. Crafted from an alloy of zinc and copper, the vase undergoes a unique oxidation process that gives it its distinctive matte black finish. The intricate silver inlay work features traditional Persian and Mughal motifs, creating a striking contrast against the black background.",
    seller: "Karnataka Handicrafts Development Corporation"
  },
  {
    id: 12,
    name: "Traditional Kathputli Puppets",
    price: 1800,
    image: "https://images.unsplash.com/photo-1606152536277-5aa1fd33e150?w=500&auto=format&fit=crop&q=60",
    region: "Jaipur, Rajasthan",
    rating: 4.5,
    category: "Handicrafts",
    description: "These colorful string puppets represent the traditional Kathputli art form of Rajasthan. Handcrafted by puppeteers from the Bhatt community, each puppet is intricately carved from wood, dressed in vibrant attire, and painted with detailed facial expressions. The set includes traditional characters from Rajasthani folklore, ready to bring stories to life through the ancient art of puppetry.",
    seller: "Rajasthan Puppet Artisans Collective"
  }
];

const ProductCategory = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter products based on the category parameter
    if (category && category !== "all") {
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");
      setFilteredProducts(allProducts.filter(product => 
        product.category.toLowerCase().includes(formattedCategory.toLowerCase())
      ));
    } else {
      setFilteredProducts(allProducts);
    }
  }, [category]);

  const openProductDetails = (productId: number) => {
    setSelectedProduct(productId);
    setIsDetailsOpen(true);
  };

  const closeProductDetails = () => {
    setIsDetailsOpen(false);
    setSelectedProduct(null);
  };

  const getProductById = (id: number) => {
    return allProducts.find(product => product.id === id);
  };

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ") 
    : "All Products";

  return (
    <>
      <Helmet>
        <title>{categoryTitle} | Bharat Connect</title>
      </Helmet>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-r from-indian-red/10 to-white py-12">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                {categoryTitle}
              </h1>
              <p className="text-lg text-gray-600">
                Authentic {categoryTitle.toLowerCase()} from artisans across India.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 mb-4">No products found in this category.</p>
                <button 
                  className="px-6 py-2 bg-indian-red text-white rounded-md hover:bg-indian-red/90"
                  onClick={() => navigate("/products")}
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProductCard 
                      product={product} 
                      onViewDetails={() => openProductDetails(product.id)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails
          isOpen={isDetailsOpen}
          onClose={closeProductDetails}
          product={getProductById(selectedProduct)!}
        />
      )}
      
      <Footer />
    </>
  );
};

export default ProductCategory;
