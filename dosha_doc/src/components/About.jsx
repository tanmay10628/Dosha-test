const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-600 mb-4">About The Dosha Doctor</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our mission is to provide personalized holistic wellness solutions based on ancient wisdom and modern science.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/logo.jpg" 
              alt="About The Dosha Doctor" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Your Wellness Journey Starts Here</h3>
            <p className="text-gray-600 leading-relaxed">
              At The Dosha Doctor, we believe in a holistic approach to health and wellness. Our expert team combines ancient wisdom from Ayurveda, Homeopathy, Allopathy, Unani, and Herbal medicine to provide personalized solutions for your unique body constitution.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We understand that each person is unique, and their wellness journey should reflect that. Through our comprehensive Dosha analysis and expert consultation, we help you discover the perfect balance for your mind, body, and spirit.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">5000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 