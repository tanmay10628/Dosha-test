const Hero = () => {
  return (
    <section 
      id="home" 
      className="bg-cover bg-center py-24 text-white text-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">Holistic Wellness for Your Unique Dosha</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Discover personalized Ayurvedic, Homeopathic, Allopathic, Unani and Herbal solutions 
          tailored to your body type and health needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="#dosha-test" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            Take Dosha Test
          </a>
          <a 
            href="#products" 
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero; 