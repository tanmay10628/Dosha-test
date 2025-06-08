import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    
    // Reset submission message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or need personalized recommendations? Reach out to our wellness experts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-green-600 mb-6">Get in Touch</h3>
            
            <div className="space-y-4">
              <p className="flex items-center text-gray-700">
                <i className="fas fa-map-marker-alt text-green-600 w-6"></i>
                Sr.No 82/2, Wakad, Tathawade, Pune-411033
              </p>
              <p className="flex items-center text-gray-700">
                <i className="fas fa-phone text-green-600 w-6"></i>
                9172308322
              </p>
              <p className="flex items-center text-gray-700">
                <i className="fas fa-envelope text-green-600 w-6"></i>
                info@thedoshadoctor.com
              </p>
              <p className="flex items-center text-gray-700">
                <i className="fas fa-clock text-green-600 w-6"></i>
                Monday-Saturday: 9:00 AM - 7:00 PM
              </p>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-200 hover:bg-green-600 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-200 hover:bg-green-600 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-200 hover:bg-green-600 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-200 hover:bg-green-600 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              {formSubmitted && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                  Thank you for your message! We will get back to you soon.
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 