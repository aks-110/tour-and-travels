import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBreadcrumbSchema } from '../data/schemas';

export default function Enquire() {
  const navigate = useNavigate();
  const location = useLocation();
  const fareData = location.state?.fareData || null;
  const isFareEnquiry = !!fareData;

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: fareData?.sourceCity || '',
    travelDate: '',
    adults: fareData?.travellers || 2,
    children: 0,
    budget: '',
    package: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const payload = {
        ...formData,
        enquiryType: isFareEnquiry ? 'fare_calculator' : 'generic',
        ...(isFareEnquiry && { fareData })
      };
      await axios.post(`${API_BASE_URL}/api/enquiries`, payload);
      setStatus('Success! We will contact you within 2 hours. Redirecting...');
      setFormData({ fullName: '', mobile: '', email: '', city: '', travelDate: '', adults: 2, children: 0, budget: '', package: '' });
      
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (err) {
      console.error(err);
      setStatus('Failed to submit. Please try again.');
    }
  };

  const breadcrumbs = [{ label: 'Home', to: '/' }, ...(isFareEnquiry ? [{ label: 'Fare Calculator', to: '/fare-calculator' }] : []), { label: 'Enquire Now' }];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.to })))
  ];

  return (
    <div className="bg-ivory text-earth pt-32 pb-20 min-h-screen">
      <SEO 
        title="Enquire Now | Varanasi SN Tour & Travels" 
        description="Fill out our enquiry form to get a free, customized itinerary for your Varanasi, Ayodhya, or Prayagraj tour package within 2 hours."
        keywords="enquire Varanasi tour, contact travel agency Varanasi, custom tour package India, book Varanasi taxi"
        url="/enquire-now"
        schemaData={schemas}
      />
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Breadcrumbs items={breadcrumbs} className="justify-center mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">
            {isFareEnquiry ? 'Confirm Your Booking' : 'Enquire Now for Custom Tour Packages'}
          </h1>
          <p className="text-earth-400">
            {isFareEnquiry
              ? 'Review your fare estimate and fill in your contact details to complete the enquiry.'
              : 'Fill out the details below to receive a free, customized itinerary within 2 hours.'}
          </p>
        </div>

        {/* Fare Summary Card (only for fare calculator enquiries) */}
        {isFareEnquiry && fareData && (
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mb-8 shadow-md">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-[0.15em] mb-4">Your Fare Estimate</p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mb-4">
              <div className="flex justify-between col-span-2 sm:col-span-1">
                <span className="text-earth/60">Route</span>
                <span className="font-medium text-earth">{fareData.sourceCity} → {fareData.destinationCity}</span>
              </div>
              <div className="flex justify-between col-span-2 sm:col-span-1">
                <span className="text-earth/60">Distance</span>
                <span className="font-medium text-earth">{fareData.distanceKm} KM</span>
              </div>
              <div className="flex justify-between col-span-2 sm:col-span-1">
                <span className="text-earth/60">Vehicle</span>
                <span className="font-medium text-earth">{fareData.vehicleName}</span>
              </div>
              <div className="flex justify-between col-span-2 sm:col-span-1">
                <span className="text-earth/60">Type</span>
                <span className="font-medium text-earth">{fareData.acType}</span>
              </div>
              <div className="flex justify-between col-span-2 sm:col-span-1">
                <span className="text-earth/60">Travellers</span>
                <span className="font-medium text-earth">{fareData.travellers} · {fareData.seats} seats</span>
              </div>
            </div>
            <hr className="border-amber-200 mb-4" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-earth text-lg">Estimated Fare</span>
              <span className="font-serif text-3xl font-bold text-amber-700">₹{fareData.estimatedFare?.toLocaleString('en-IN')}</span>
            </div>
            {fareData.savings > 0 && (
              <p className="text-green-700 text-sm mt-2 font-medium text-right">You save ₹{fareData.savings?.toLocaleString('en-IN')} ({fareData.discount}% off)</p>
            )}
          </div>
        )}

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold to-gold-dark rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white p-8 md:p-12 shadow-2xl rounded-2xl">
          {status && (
            <div className={`p-4 mb-6 text-sm rounded ${status.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-saffron/20 text-earth'}`}>
              {status}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1 uppercase tracking-[0.05em]">Full Name *</label>
              <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 bg-transparent border border-charcoal/20 rounded-xl font-sans text-sm text-charcoal outline-none transition-colors focus:border-charcoal" placeholder="Your full name" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1 uppercase tracking-[0.05em]">Mobile *</label>
                <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full p-3 bg-transparent border border-charcoal/20 rounded-xl font-sans text-sm text-charcoal outline-none transition-colors focus:border-charcoal" placeholder="10-digit number" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1 uppercase tracking-[0.05em]">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 bg-transparent border border-charcoal/20 rounded-xl font-sans text-sm text-charcoal outline-none transition-colors focus:border-charcoal" placeholder="you@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1 uppercase tracking-[0.05em]">Travelling From</label>
                <input name="city" value={formData.city} onChange={handleChange} className="w-full p-3 bg-transparent border border-charcoal/20 rounded-xl font-sans text-sm text-charcoal outline-none transition-colors focus:border-charcoal" placeholder="Your city" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1 uppercase tracking-[0.05em]">Travel Date</label>
                <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} className="w-full p-3 bg-transparent border border-charcoal/20 rounded-xl font-sans text-sm text-charcoal outline-none transition-colors focus:border-charcoal" />
              </div>
            </div>

            {/* Only show adults/children/budget for generic enquiries */}
            {!isFareEnquiry && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1 uppercase tracking-[0.05em]">Adults</label>
                  <input type="number" min="1" name="adults" value={formData.adults} onChange={handleChange} className="w-full p-3 bg-transparent border border-charcoal/20 rounded-xl font-sans text-sm text-charcoal outline-none transition-colors focus:border-charcoal" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1 uppercase tracking-[0.05em]">Children</label>
                  <input type="number" min="0" name="children" value={formData.children} onChange={handleChange} className="w-full p-3 bg-transparent border border-charcoal/20 rounded-xl font-sans text-sm text-charcoal outline-none transition-colors focus:border-charcoal" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1 uppercase tracking-[0.05em]">Budget</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className="w-full p-3 bg-transparent border border-charcoal/20 rounded-xl font-sans text-sm text-charcoal outline-none transition-colors focus:border-charcoal">
                    <option value="">Select</option>
                    <option value="Standard">Standard (3-Star)</option>
                    <option value="Premium">Premium (4-Star)</option>
                  </select>
                </div>
              </div>
            )}

            <button type="submit" className="btn-saffron w-full text-lg py-4 mt-4 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30 transition-all">
              {isFareEnquiry ? 'Submit Booking Enquiry' : 'Get Free Quote'}
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}
