
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Bharat Connect | India Post</title>
      </Helmet>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-indian-red/10 to-white py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-indian-red">
                About Bharat Connect
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Connecting Indian diaspora worldwide with authentic products from home through the trusted network of India Post.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1605217613843-08478af5f637?w=500&auto=format&fit=crop&q=60" 
                  alt="India Post Heritage" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="font-serif text-3xl font-bold text-gray-800">Our Mission</h2>
                <p className="text-gray-600">
                  Bharat Connect is an initiative by the Department of Posts, Government of India, with a mission to bridge the gap between India and its global diaspora through India Post's vast network and trusted services.
                </p>
                <p className="text-gray-600">
                  We aim to connect Indians around the world with authentic products from their homeland, while supporting local artisans, sellers and small businesses across India.
                </p>
                <div className="pt-4">
                  <h3 className="font-serif text-xl font-semibold text-indian-red mb-3">Our Core Values</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-indian-red/10 text-indian-red p-1 rounded-full mr-3 mt-1">✓</span>
                      <span>Authenticity in every product we deliver</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-indian-red/10 text-indian-red p-1 rounded-full mr-3 mt-1">✓</span>
                      <span>Supporting local artisans and businesses across India</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-indian-red/10 text-indian-red p-1 rounded-full mr-3 mt-1">✓</span>
                      <span>Reliable delivery through India Post's global network</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-indian-red/10 text-indian-red p-1 rounded-full mr-3 mt-1">✓</span>
                      <span>Preserving India's cultural heritage</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4">
                Heritage of India Post
              </h2>
              <p className="text-gray-600">
                With over 150 years of service, India Post has been the backbone of communication and connectivity in India, now extending its legacy to serve global Indians.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="text-indian-red text-2xl font-bold mb-3">1854</div>
                <h3 className="font-serif text-xl font-semibold mb-3">First Postal Stamp</h3>
                <p className="text-gray-600">
                  The first postage stamp in India was issued, marking the beginning of the organized postal system in the country.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="text-indian-red text-2xl font-bold mb-3">1947</div>
                <h3 className="font-serif text-xl font-semibold mb-3">Independent India Post</h3>
                <p className="text-gray-600">
                  After independence, India Post evolved as a national institution, expanding its services to reach every corner of India.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="text-indian-red text-2xl font-bold mb-3">2023</div>
                <h3 className="font-serif text-xl font-semibold mb-3">Bharat Connect Launch</h3>
                <p className="text-gray-600">
                  India Post launches Bharat Connect, a digital marketplace connecting India's artisans and products with its global diaspora.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4">
                Leadership Team
              </h2>
              <p className="text-gray-600">
                Meet the dedicated team working to bring authentic Indian products to the global Indian community.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative w-44 h-44 mx-auto mb-5 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold">Rajesh Kumar</h3>
                <p className="text-indian-red mb-2">Director General</p>
                <p className="text-gray-600 text-sm">
                  25+ years of experience in postal services and e-commerce operations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative w-44 h-44 mx-auto mb-5 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold">Priya Sharma</h3>
                <p className="text-indian-red mb-2">Chief Marketing Officer</p>
                <p className="text-gray-600 text-sm">
                  Digital marketing expert with experience in global Indian diaspora relations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative w-44 h-44 mx-auto mb-5 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold">Anand Patel</h3>
                <p className="text-indian-red mb-2">Head of Operations</p>
                <p className="text-gray-600 text-sm">
                  Specialist in logistics and supply chain management across South Asia.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have questions about Bharat Connect? Our team is here to help you connect with authentic Indian products.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-indian-red rounded-full p-2 mr-4 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-gray-600">+91 123 456 7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indian-red rounded-full p-2 mr-4 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-600">contact@bharat.indiapost.gov.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indian-red rounded-full p-2 mr-4 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Address</h3>
                      <p className="text-gray-600">Department of Posts, India Post, Dak Bhawan, Sansad Marg, New Delhi-110001</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="font-serif text-2xl font-semibold mb-6 text-center">Send us a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indian-red focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indian-red focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indian-red focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indian-red focus:border-transparent"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-indian-red hover:bg-indian-red/90 text-white font-medium py-2 px-6 rounded-md transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
