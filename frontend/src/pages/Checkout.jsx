import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, ChevronLeft, MapPin, Calendar, Users, Car, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import SEO from '../components/SEO';

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const fareData = location.state?.fareData;

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    pickupLocation: '',
    travelDate: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [successBooking, setSuccessBooking] = useState(null);
  const [paymentMode, setPaymentMode] = useState('advance');

  // If no fare data, redirect back
  useEffect(() => {
    if (!fareData) navigate('/fare-calculator');
  }, [fareData, navigate]);

  // Auto-redirect to home after 5 seconds of success
  useEffect(() => {
    if (successBooking) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successBooking, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!fareData) return;
    setIsProcessing(true);
    setError(null);

    if (paymentMode === 'advance') {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        setError('Razorpay SDK failed to load. Are you offline?');
        setIsProcessing(false);
        return;
      }
    }

    try {
      // 1. Create Order
      const orderRes = await axios.post(`${API_BASE_URL}/api/bookings/create-order`, {
        customerDetails: {
          fullName: formData.fullName,
          mobile: formData.mobile,
          email: formData.email,
          pickupLocation: formData.pickupLocation
        },
        packageDetails: {
          sourceCity: fareData.sourceCity,
          destinationCity: fareData.destinationCity,
          distanceKm: fareData.distanceKm,
          vehicleName: fareData.vehicleName,
          vehicleCategory: fareData.vehicleCategory,
          acType: fareData.acType
        },
        travelDate: formData.travelDate,
        travelers: fareData.travellers,
        basePrice: fareData.estimatedFare,
        paymentMode: paymentMode
      });

      const { orderId, amount, currency, booking, keyId } = orderRes.data;

      if (paymentMode === 'withoutAdvance') {
        setSuccessBooking({
          bookingId: booking.bookingId,
          advancePaid: 0
        });
        setIsProcessing(false);
        return;
      }

      // 2. Initialize Razorpay
      const options = {
        key: keyId || 'rzp_test_placeholder', // Fetched from backend config
        amount: amount,
        currency: currency,
        name: "S N Tours & Travels",
        description: "Advance Booking Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            setIsProcessing(true);
            const verifyRes = await axios.post(`${API_BASE_URL}/api/bookings/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking.id
            });
            
            if (verifyRes.data.success) {
              setSuccessBooking({
                bookingId: verifyRes.data.bookingId,
                advancePaid: booking.advanceAmount
              });
            }
          } catch (err) {
            console.error("Verification failed:", err);
            setError("Payment verification failed. If money was deducted, please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile
        },
        theme: {
          color: "#f59e0b" // Gold/Saffron
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            setError("Payment canceled by user.");
          }
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        setError("Payment failed. Reason: " + response.error.description);
        setIsProcessing(false);
      });
      rzp1.open();

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to initiate payment. Please try again.");
      setIsProcessing(false);
    }
  };

  if (!fareData) return null;

  if (successBooking) {
    return (
      <main className="bg-ivory min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <SEO title="Booking Confirmed" url="/checkout" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white max-w-lg w-full rounded-3xl p-8 md:p-12 text-center shadow-xl border border-zinc-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl text-earth mb-2">Booking Request Received</h1>
          <p className="text-zinc-500 mb-8 leading-relaxed">
            Your advance payment of ₹{successBooking.advancePaid?.toLocaleString('en-IN')} has been received successfully.
          </p>
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mb-8">
            <span className="block text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1">Your Booking ID</span>
            <span className="font-mono text-2xl font-bold text-saffron tracking-wider">{successBooking.bookingId}</span>
          </div>
          <p className="text-sm text-zinc-500 mb-6">
            Our travel team will review your request and confirm your booking shortly via Email and WhatsApp.
          </p>
          <div className="text-xs text-zinc-400 font-medium mb-6 animate-pulse">
            Redirecting to home in 5 seconds...
          </div>
          <Link to="/" className="block w-full bg-earth text-white font-bold py-4 rounded-xl hover:bg-earth/90 transition-colors">
            Return to Home Now
          </Link>
        </motion.div>
      </main>
    );
  }

  // Calculate generic taxes & fees based on base fare (Simulated frontend view, backend does real math)
  const baseFare = fareData.estimatedFare;
  const taxes = Math.round(baseFare * 0.05); // 5% GST
  const convenienceFee = Math.round(baseFare * 0.02); // 2% 
  const totalCost = baseFare + taxes + convenienceFee;
  
  // Estimate advance visually (real calculation happens on backend upon submit based on date)
  // For visual sake on frontend, assume 15% average
  const visualAdvance = Math.ceil((totalCost * 15) / 100);

  return (
    <main className="bg-zinc-50 text-earth min-h-screen pt-24 pb-12 font-sans">
      <SEO title="Secure Checkout" url="/checkout" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow border border-zinc-200">
            <ChevronLeft className="w-5 h-5 text-zinc-600" />
          </button>
          <h1 className="font-serif text-2xl md:text-3xl text-earth">Secure Booking</h1>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Trip Summary */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-zinc-200">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-green-600">Verified Travel Partner</span>
            </div>
            
            <h2 className="font-serif text-xl mb-6 border-b border-zinc-100 pb-4">Trip Summary</h2>
            
            <div className="space-y-5 mb-8">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-saffron" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Route</p>
                  <p className="font-medium text-earth">{fareData.sourceCity} <span className="text-zinc-400 mx-1">→</span> {fareData.destinationCity}</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Vehicle</p>
                  <p className="font-medium text-earth">{fareData.vehicleName} <span className="text-xs font-normal text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded ml-2 border border-zinc-200">{fareData.acType}</span></p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Travellers</p>
                  <p className="font-medium text-earth">{fareData.travellers} Persons</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
              <h3 className="font-bold text-sm text-earth mb-4 uppercase tracking-wider">Fare Breakdown</h3>
              <div className="space-y-3 text-sm mb-4 border-b border-zinc-200 pb-4">
                <div className="flex justify-between text-zinc-600">
                  <span>Base Fare</span>
                  <span>₹{baseFare.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Taxes (GST 5%)</span>
                  <span>₹{taxes.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Convenience Fee (2%)</span>
                  <span>₹{convenienceFee.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-earth text-lg">Total Cost</span>
                <span className="font-bold text-earth text-2xl">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-saffron/10 border border-saffron/20 rounded-xl p-3 flex justify-between items-center mt-4">
                <span className="text-saffron font-bold text-sm">Estimated Advance</span>
                <span className="text-saffron font-bold text-lg">~₹{visualAdvance.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-2 text-center">Exact advance is dynamically calculated upon submission based on your travel date proximity.</p>
            </div>
          </div>

          {/* RIGHT: Booking Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-zinc-200">
            <h2 className="font-serif text-xl mb-2">Traveller Details</h2>
            <p className="text-zinc-500 text-sm mb-6 border-b border-zinc-100 pb-4">Please fill exactly as per your government ID.</p>
            
            <form onSubmit={handlePayment} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Full Name *</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3.5 focus:bg-white focus:border-gold focus:ring-0 transition-colors text-earth" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Phone Number *</label>
                  <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3.5 focus:bg-white focus:border-gold focus:ring-0 transition-colors text-earth" placeholder="+91 9876543210" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3.5 focus:bg-white focus:border-gold focus:ring-0 transition-colors text-earth" placeholder="john@example.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Travel Date *</label>
                  <div className="relative">
                    <input required type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3.5 pl-10 focus:bg-white focus:border-gold focus:ring-0 transition-colors text-earth" />
                    <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Exact Pickup Location *</label>
                  <input required name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full border-2 border-zinc-100 bg-zinc-50 rounded-xl px-4 py-3.5 focus:bg-white focus:border-gold focus:ring-0 transition-colors text-earth" placeholder="e.g. Varanasi Airport / Hotel Name" />
                </div>
              </div>

              <div className="mt-6 p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                <p className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-3">Payment Option</p>
                <div className="flex flex-col gap-3">
                  <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMode === 'advance' ? 'border-gold bg-gold/5' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}>
                    <input type="radio" name="paymentMode" value="advance" checked={paymentMode === 'advance'} onChange={(e) => setPaymentMode(e.target.value)} className="w-5 h-5 text-gold focus:ring-gold accent-gold" />
                    <div>
                      <p className="font-bold text-earth">Book with Advance</p>
                      <p className="text-xs text-zinc-500">Pay a small advance to confirm your booking instantly.</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMode === 'withoutAdvance' ? 'border-gold bg-gold/5' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}>
                    <input type="radio" name="paymentMode" value="withoutAdvance" checked={paymentMode === 'withoutAdvance'} onChange={(e) => setPaymentMode(e.target.value)} className="w-5 h-5 text-gold focus:ring-gold accent-gold" />
                    <div>
                      <p className="font-bold text-earth">Book without Advance</p>
                      <p className="text-xs text-zinc-500">Confirm booking now and pay later during the trip.</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100">
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className={`w-full bg-gold text-charcoal font-bold py-4 rounded-xl text-lg transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-gold/40 cursor-pointer'}`}
                >
                  {isProcessing ? (
                    <><div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin"></div> Processing Payment...</>
                  ) : (
                    <>{paymentMode === 'advance' ? 'Pay Advance & Book Now' : 'Book Now (No Advance)'}</>
                  )}
                </button>
                {paymentMode === 'advance' && (
                  <p className="text-center text-xs text-zinc-400 mt-4 font-medium flex items-center justify-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> Secure payments powered by Razorpay
                  </p>
                )}
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </main>
  );
}
