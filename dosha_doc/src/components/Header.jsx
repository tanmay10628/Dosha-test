import { useState } from 'react';

const Header = ({ cartCount, openCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto w-full py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.jpg" alt="The Dosha Doctor Logo" className="h-22 mr-3" />
            <h1 className="text-2xl font-bold">
              The <span className="text-amber-500">Dosha</span> Doctor
            </h1>
          </div>
          
          <button 
            className="md:hidden text-2xl"
            onClick={toggleMobileMenu}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          
          <nav className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent border-b md:border-none transform ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:translate-y-0 transition-transform duration-300 ease-in-out`}>
            <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
              <li>
                <a href="#home" className="text-gray-600 hover:text-green-600 transition-colors">Home</a>
              </li>
              <li>
                <a href="#dosha-test" className="text-gray-600 hover:text-green-600 transition-colors">Dosha Test</a>
              </li>
              <li>
                <a href="#products" className="text-gray-600 hover:text-green-600 transition-colors">Products</a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">About</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">Contact</a>
              </li>
              <li>
                <button 
                  onClick={openCart}
                  className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 