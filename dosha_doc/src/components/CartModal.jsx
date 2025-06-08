import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useForm } from '@formspree/react';
import defaultProductImage from '../../public/product.jpeg';

const CartModal = ({ cart, cartTotal, removeFromCart, closeCart }) => {
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, checkout
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    description: '',
    transactionId: ''
  });

  const [state, handleFormspreeSubmit] = useForm("xkgboazb");

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Create form data object
    const formDataObj = new FormData();
    
    // Add customer details
    Object.keys(formData).forEach(key => {
      formDataObj.append(`customerDetails[${key}]`, formData[key]);
    });
    
    // Add order items
    cart.forEach((item, index) => {
      formDataObj.append(`orderItems[${index}][name]`, item.name);
      formDataObj.append(`orderItems[${index}][quantity]`, item.quantity);
      formDataObj.append(`orderItems[${index}][price]`, item.price);
      formDataObj.append(`orderItems[${index}][total]`, item.price * item.quantity);
    });
    
    // Add payment method and total
    formDataObj.append('paymentMethod', selectedPayment);
    formDataObj.append('totalAmount', cartTotal);
    formDataObj.append('upiId', selectedPayment === 'upi' ? 'daisiyak16@oksbi' : 'N/A');

    try {
      await handleFormspreeSubmit(formDataObj);
      // Close the modal immediately after submission
      closeCart();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const generateUPILink = () => {
    const upiId = "daisiyak16@oksbi";
    const amount = cartTotal;
    return `upi://pay?pa=${upiId}&pn=DoshaDoc&am=${amount}&cu=INR&tn=Payment for Order`;
  };

  const renderStep = () => {
    switch(checkoutStep) {
      case 'checkout':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 space-y-8 overflow-y-auto max-h-[calc(90vh-180px)]"
          >
            {/* Shipping Details Form */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Details</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleFormChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Enter your full address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleFormChange}
                    className="w-full md:w-1/2 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter pincode"
                  />
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-medium text-gray-700">Select Payment Method</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPayment === 'upi'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-200'
                      }`}
                      onClick={() => setSelectedPayment('upi')}
                    >
                      <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        <span className="font-medium">UPI</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPayment === 'cod'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-200'
                      }`}
                      onClick={() => setSelectedPayment('cod')}
                    >
                      <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* UPI Transaction ID Field - Only show for UPI payment */}
                {selectedPayment === 'upi' && (
                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="font-medium text-gray-700">Transaction ID</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">Please enter the UPI transaction ID after completing your payment</p>
                        <div>
                          <input
                            type="text"
                            name="transactionId"
                            required={selectedPayment === 'upi'}
                            value={formData.transactionId}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter UPI transaction ID"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <span>Place Order</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Payment QR Code Section - Only show for UPI payment */}
            {selectedPayment === 'upi' && (
              <div className="border-t pt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Scan & Pay</h3>
                <div className="bg-white p-6 rounded-lg border-2 border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center space-y-6">
                      <div>
                        <div className="text-3xl font-bold text-green-600">₹{cartTotal}</div>
                        <div className="text-gray-600 mt-1">Total Amount</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Scan with any UPI app to pay</p>
                        <p className="font-medium mt-2">UPI ID: daisiyak16@oksbi</p>
                      </div>
                      <div className="flex justify-center space-x-6">
                        <img src="/gpay.svg" alt="Google Pay" className="h-8" />
                        <img src="/phonepe.svg" alt="PhonePe" className="h-8" />
                        <img src="/paytm.svg" alt="Paytm" className="h-8" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-white p-4 rounded-lg shadow-lg">
                        <QRCodeSVG 
                          value={generateUPILink()}
                          size={200}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* COD Info - Only show for COD payment */}
            {selectedPayment === 'cod' && (
              <div className="border-t pt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Cash on Delivery</h3>
                <div className="bg-white p-6 rounded-lg border-2 border-gray-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Pay when your order arrives</h4>
                      <p className="text-gray-600 text-sm mt-1">Amount: ₹{cartTotal}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Keep exact change ready for a contactless delivery</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>We'll send you delivery updates via SMS and email</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        );

      default: // cart step
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="overflow-hidden"
          >
            <div className="p-6">
          {cart.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <button
                    onClick={closeCart}
                    className="mt-4 text-green-600 hover:text-green-700 font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
          ) : (
            <>
                  <div className="space-y-6 mb-6 overflow-y-auto max-h-[calc(90vh-400px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    />
                          <span className="absolute -top-2 -right-2 bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <div className="text-green-600 font-medium">₹{item.price}</div>
                          <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                    </div>
                    <button 
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => removeFromCart(item.id)}
                    >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                    </button>
                  </div>
                ))}
              </div>
              
                  {/* Cart Summary and Payment Options */}
                  <div className="border-t border-gray-200 pt-4 space-y-4 bg-white">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-medium text-gray-600">Total Amount</span>
                      <span className="font-bold text-green-600">₹{cartTotal}</span>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-700">Select Payment Method</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          className={`p-4 rounded-lg border-2 transition-all ${
                            selectedPayment === 'upi'
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-200'
                          }`}
                          onClick={() => setSelectedPayment('upi')}
                        >
                          <div className="flex items-center space-x-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                            <span className="font-medium">UPI</span>
                          </div>
                        </button>
                        <button
                          className={`p-4 rounded-lg border-2 transition-all ${
                            selectedPayment === 'cod'
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-200'
                          }`}
                          onClick={() => setSelectedPayment('cod')}
                        >
                          <div className="flex items-center space-x-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-medium">Cash on Delivery</span>
                          </div>
                        </button>
                      </div>
              </div>
              
                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <button
                        onClick={closeCart}
                        className="px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                      >
                        Continue Shopping
                      </button>
                      <button
                        className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors font-medium flex items-center justify-center space-x-2"
                        onClick={() => setCheckoutStep('checkout')}
                      >
                        <span>Proceed to Checkout</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        );
    }
  };

  // Handle clicking outside modal to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl relative pointer-events-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {checkoutStep === 'cart' ? 'Your Cart' : 'Checkout'}
              </h2>
              <button
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                onClick={closeCart}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Progress Steps - Simplified to just 2 steps */}
            {cart.length > 0 && (
              <div className="flex items-center justify-center space-x-4 mt-6">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    checkoutStep === 'cart' ? 'bg-white text-green-600' : 'bg-green-400 text-white'
                  }`}>
                    1
                  </div>
                  <div className={`w-12 h-0.5 transition-colors ${
                    checkoutStep === 'checkout' ? 'bg-green-400' : 'bg-green-800'
                  }`} />
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    checkoutStep === 'checkout' ? 'bg-white text-green-600' : 'bg-green-800 text-white/60'
                  }`}>
                    2
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Content */}
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CartModal; 