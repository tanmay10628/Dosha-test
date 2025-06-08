import { useState } from 'react';
import { products } from '../data/products';

const ProductCard = ({ product, addToCart, toggleWishlist, isInWishlist }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-2">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      </div>
      <div className="p-4">
        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-2">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </span>
        <h3 className="text-lg font-medium text-gray-800 mb-2">{product.name}</h3>
        <div className="text-green-600 font-bold mb-2">₹{product.price}</div>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-grow mr-2"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button 
            className={`w-10 h-10 flex items-center justify-center rounded-full border ${
              isInWishlist ? 'text-red-500 border-red-500' : 'text-gray-400 border-gray-300 hover:text-red-500 hover:border-red-500'
            }`}
            onClick={() => toggleWishlist(product.id)}
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const Products = ({ addToCart, toggleWishlist, wishlist }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Filter categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'ayurvedic', name: 'Ayurvedic' },
    { id: 'homeopathic', name: 'Homeopathic' },
    { id: 'allopathic', name: 'Allopathic' },
    { id: 'unani', name: 'Unani' },
    { id: 'herbal', name: 'Herbal' },
    { id: 'vata', name: 'Vata' },
    { id: 'pitta', name: 'Pitta' },
    { id: 'kapha', name: 'Kapha' }
  ];
  
  // Handle filter change
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    
    if (filterId === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.category === filterId || product.dosha === filterId
      );
      setFilteredProducts(filtered);
    }
  };
  
  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Our Holistic Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            High-quality medicines and wellness products from various traditions to support your health journey.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full border transition-colors ${
                activeFilter === category.id
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-600'
              }`}
              onClick={() => handleFilterChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              isInWishlist={wishlist.includes(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products; 