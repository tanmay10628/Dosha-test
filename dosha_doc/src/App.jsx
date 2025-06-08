import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import DoshaTest from './components/DoshaTest';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartModal from './components/CartModal';

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Update cart count in the header
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Add to cart function
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  // Remove from cart function
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  // Toggle wishlist function
  const toggleWishlist = (productId) => {
    setWishlist(prevWishlist => {
      const index = prevWishlist.indexOf(productId);
      
      if (index === -1) {
        return [...prevWishlist, productId];
      } else {
        return prevWishlist.filter(id => id !== productId);
      }
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cartCount} 
        openCart={() => setIsCartOpen(true)} 
      />
      
      <main className="flex-grow">
        <div className="max-w-[1440px] mx-auto w-full">
          <Hero />
          <DoshaTest 
            addToCart={addToCart} 
            toggleWishlist={toggleWishlist} 
            wishlist={wishlist} 
          />
          <Products 
            addToCart={addToCart} 
            toggleWishlist={toggleWishlist} 
            wishlist={wishlist} 
          />
          <About />
          <Contact />
        </div>
      </main>
      
      <Footer />
      
      {isCartOpen && (
        <CartModal 
          cart={cart}
          cartTotal={cartTotal}
          removeFromCart={removeFromCart}
          closeCart={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
