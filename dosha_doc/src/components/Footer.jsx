import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log('Newsletter subscription:', email);
    setSubscribed(true);
    setEmail('');
    
    // Reset subscription message after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 w-full to-gray-800 text-white">
      {/* Top Wave Separator */}
      <div className="w-full overflow-hidden">
        <svg className="w-full h-12 fill-current text-white transform rotate-180" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C150,20 350,0 500,10 C650,20 800,50 1000,60 C1200,70 1300,60 1440,40 L1440,100 L0,100 Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
              <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                The Dosha Doctor
              </h4>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted source for holistic wellness solutions based on Ayurvedic principles and traditional medicine systems.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700/50 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:rotate-3"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700/50 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:rotate-3"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700/50 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:rotate-3"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-green-400 to-green-600"></span>
            </h4>
            <ul className="space-y-3">
              {['Home', 'Dosha Test', 'Products', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    <svg 
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold relative">
              Categories
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-green-400 to-green-600"></span>
            </h4>
            <ul className="space-y-3">
              {['Ayurvedic', 'Homeopathic', 'Allopathic', 'Unani', 'Herbal'].map((category) => (
                <li key={category}>
                  <a 
                    href="#products" 
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    <svg 
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold relative">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-green-400 to-green-600"></span>
            </h4>
            <p className="text-gray-400">
              Subscribe to get wellness tips and special offers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {subscribed && (
                <div className="p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
                  <p className="text-green-400 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Thank you for subscribing!
                  </p>
                </div>
              )}
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-gray-700/70 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all hover:shadow-lg hover:shadow-green-500/25"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700/50 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} The Dosha Doctor. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 