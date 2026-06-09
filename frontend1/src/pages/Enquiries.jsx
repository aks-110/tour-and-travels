import { useState, useEffect } from 'react';
import { Loader2, Trash2, Mail, Phone, Calendar, Users, MapPin, Car, Snowflake, Map, Calculator, MessageSquare, IndianRupee as RupeeIcon, Check, X } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import ConfirmModal from '../components/shared/ConfirmModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Detail Slide-over State
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const { fetchWithAuth } = useApi();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const data = await fetchWithAuth('/dashboard/enquiries');
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetchWithAuth(`/dashboard/enquiries/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: { 'Content-Type': 'application/json' }
      });
      fetchEnquiries();
      if(selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry(prev => ({...prev, status}));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const confirmDelete = async () => {
    if (!enquiryToDelete) return;
    setIsDeleting(true);
    try {
      await fetchWithAuth(`/dashboard/enquiries/${enquiryToDelete._id}`, { method: 'DELETE' });
      fetchEnquiries();
      setDeleteModalOpen(false);
      setEnquiryToDelete(null);
      if(selectedEnquiry?._id === enquiryToDelete._id) {
        setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete enquiry');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Contacted': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-[50vh]"><Loader2 className="animate-spin text-amber-500 w-10 h-10" /></div>;

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Customer Enquiries</h1>
          <p className="text-zinc-500 mt-2 text-sm">Manage leads, booking requests, and fare estimates.</p>
        </div>
      </div>

      {/* Modern List View */}
      <div className="space-y-4">
        {enquiries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-zinc-300" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">No enquiries yet</h3>
            <p className="text-zinc-500 text-sm">When customers contact you or calculate fares, they will appear here.</p>
          </div>
        ) : (
          enquiries.map((enquiry, index) => {
            const isCalc = enquiry.enquiryType === 'fare_calculator';
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                key={enquiry._id} 
                className="bg-white hover:bg-zinc-50 border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() => setSelectedEnquiry(enquiry)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left: Customer Info & Type */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center shadow-sm border ${isCalc ? 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300' : 'bg-gradient-to-br from-zinc-100 to-zinc-200 border-zinc-300'}`}>
                      {isCalc ? <Calculator className="w-5 h-5 text-amber-700" /> : <MessageSquare className="w-5 h-5 text-zinc-600" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-zinc-900 group-hover:text-amber-700 transition-colors">{enquiry.fullName}</h3>
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${isCalc ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-zinc-50 text-zinc-600 border-zinc-200'}`}>
                          {isCalc ? 'Fare Estimate' : (enquiry.package || 'General Inquiry')}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                        <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {enquiry.mobile}</span>
                        {isCalc && enquiry.fareData && (
                          <span className="flex items-center gap-1.5 font-medium text-zinc-700"><MapPin className="w-3.5 h-3.5 text-amber-500" /> {enquiry.fareData.sourceCity} → {enquiry.fareData.destinationCity}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Meta & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-zinc-100 md:border-0">
                    <div className="text-left md:text-right">
                      <p className="text-xs text-zinc-400 font-medium mb-1.5">{new Date(enquiry.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getStatusBadge(enquiry.status || 'New')}`}>
                        {enquiry.status || 'New'}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEnquiryToDelete(enquiry);
                        setDeleteModalOpen(true);
                      }}
                      className="p-2.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Slide-over Detail Panel */}
      <AnimatePresence>
        {selectedEnquiry && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedEnquiry(null)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40"
            />
            {/* Panel */}
            <motion.div 
              initial={{ x: '100%', opacity: 0.5 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0.5 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-zinc-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-white">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">Enquiry Details</h2>
                  <p className="text-sm text-zinc-500 mt-0.5">Received {new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => setSelectedEnquiry(null)} className="p-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-zinc-50/50">
                
                {/* Status Updater */}
                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Current Status</label>
                  <select
                    value={selectedEnquiry.status || 'New'}
                    onChange={(e) => updateStatus(selectedEnquiry._id, e.target.value)}
                    className={`w-full text-sm font-bold border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer ${getStatusBadge(selectedEnquiry.status || 'New')}`}
                  >
                    <option value="New" className="bg-white text-zinc-900">🔵 New / Unread</option>
                    <option value="Contacted" className="bg-white text-zinc-900">🟠 Contacted / Follow-up</option>
                    <option value="Resolved" className="bg-white text-zinc-900">🟢 Resolved / Booked</option>
                  </select>
                </div>

                {/* Customer Info Card */}
                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4 border-b border-zinc-100 pb-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-bold text-lg">
                      {selectedEnquiry.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 text-lg">{selectedEnquiry.fullName}</h3>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Customer</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <a href={`tel:${selectedEnquiry.mobile}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform"><Phone className="w-4 h-4" /></div>
                      <div><p className="text-xs text-zinc-500 font-medium mb-0.5">Phone Number</p><p className="font-semibold text-zinc-900">{selectedEnquiry.mobile}</p></div>
                    </a>
                    {selectedEnquiry.email && (
                      <a href={`mailto:${selectedEnquiry.email}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><Mail className="w-4 h-4" /></div>
                        <div><p className="text-xs text-zinc-500 font-medium mb-0.5">Email Address</p><p className="font-semibold text-zinc-900 break-all">{selectedEnquiry.email}</p></div>
                      </a>
                    )}
                  </div>
                </div>

                {/* Specific Data: Fare Calculator OR Generic */}
                {selectedEnquiry.enquiryType === 'fare_calculator' && selectedEnquiry.fareData ? (
                  <div className="bg-gradient-to-b from-amber-50 to-white p-6 rounded-3xl border border-amber-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    
                    <div className="flex items-center gap-2 mb-6">
                      <Calculator className="w-5 h-5 text-amber-600" />
                      <h3 className="font-bold text-zinc-900 text-lg">Fare Estimate Details</h3>
                    </div>

                    <div className="space-y-5 relative z-10">
                      {/* Route */}
                      <div className="flex items-stretch gap-4 bg-white p-4 rounded-2xl border border-amber-100 shadow-sm">
                        <div className="flex flex-col items-center justify-between py-1">
                          <div className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100"></div>
                          <div className="w-0.5 h-6 bg-zinc-200"></div>
                          <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>
                        </div>
                        <div className="flex flex-col justify-between py-0.5 text-sm">
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Pickup</p>
                            <p className="font-bold text-zinc-900">{selectedEnquiry.fareData.sourceCity}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5 mt-2">Drop-off</p>
                            <p className="font-bold text-zinc-900">{selectedEnquiry.fareData.destinationCity}</p>
                          </div>
                        </div>
                        <div className="ml-auto flex items-center">
                          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-lg border border-amber-200">{selectedEnquiry.fareData.distanceKm} KM</span>
                        </div>
                      </div>

                      {/* Travel Details Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-sm">
                          <Car className="w-4 h-4 text-zinc-400 mb-2" />
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Vehicle</p>
                          <p className="font-bold text-zinc-900 text-sm leading-tight">{selectedEnquiry.fareData.vehicleName}</p>
                          <p className="text-xs text-zinc-500 mt-0.5">{selectedEnquiry.fareData.vehicleCategory}</p>
                        </div>
                        <div className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-sm">
                          <Users className="w-4 h-4 text-zinc-400 mb-2" />
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Travellers</p>
                          <p className="font-bold text-zinc-900 text-sm leading-tight">{selectedEnquiry.fareData.travellers} Persons</p>
                          <p className="text-xs text-zinc-500 mt-0.5">{selectedEnquiry.fareData.seats} Seats req.</p>
                        </div>
                      </div>

                      {/* AC & Price */}
                      <div className="bg-zinc-900 p-5 rounded-2xl shadow-lg text-white">
                        <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-4">
                          <span className="text-sm font-medium text-zinc-400">AC Preference</span>
                          <span className="bg-zinc-800 text-zinc-200 text-xs font-bold px-3 py-1 rounded-full border border-zinc-700 flex items-center gap-1.5">
                            {selectedEnquiry.fareData.acType === 'AC' ? <Snowflake className="w-3 h-3" /> : null} {selectedEnquiry.fareData.acType}
                          </span>
                        </div>
                        
                        {selectedEnquiry.fareData.discount > 0 && (
                          <div className="flex justify-between items-center mb-2 text-sm">
                            <span className="text-zinc-400">Market Fare</span>
                            <span className="line-through text-zinc-500">₹{selectedEnquiry.fareData.marketFare?.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-end">
                          <span className="text-sm font-medium text-zinc-400">Estimated Fare</span>
                          <span className="text-3xl font-serif font-bold text-amber-500 drop-shadow-sm">₹{selectedEnquiry.fareData.estimatedFare?.toLocaleString('en-IN')}</span>
                        </div>
                        {selectedEnquiry.fareData.savings > 0 && (
                          <div className="mt-3 text-xs text-emerald-400 font-medium text-right flex items-center justify-end gap-1">
                            <Check className="w-3.5 h-3.5" /> Customer saves ₹{selectedEnquiry.fareData.savings?.toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 pb-4">
                      <Map className="w-5 h-5 text-zinc-500" />
                      <h3 className="font-bold text-zinc-900 text-lg">Travel Requirements</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-500 font-medium">Package</span>
                        <span className="font-bold text-zinc-900">{selectedEnquiry.package || 'General Inquiry'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-500 font-medium">Travel Date</span>
                        <span className="font-bold text-zinc-900 flex items-center gap-2"><Calendar className="w-4 h-4 text-zinc-400"/> {selectedEnquiry.travelDate || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-500 font-medium">Guests</span>
                        <span className="font-bold text-zinc-900 flex items-center gap-2"><Users className="w-4 h-4 text-zinc-400"/> {selectedEnquiry.adults} Adults, {selectedEnquiry.children} Children</span>
                      </div>
                      {selectedEnquiry.budget && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-500 font-medium">Budget</span>
                          <span className="font-bold text-zinc-900 flex items-center gap-2"><RupeeIcon className="w-4 h-4 text-zinc-400"/> {selectedEnquiry.budget}</span>
                        </div>
                      )}
                      {selectedEnquiry.city && (
                        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                          <span className="text-sm text-zinc-500 font-medium">Customer City</span>
                          <span className="font-bold text-zinc-900">{selectedEnquiry.city}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-zinc-200">
                  <a href={`tel:${selectedEnquiry.mobile}`} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shadow-amber-500/20">
                    <Phone className="w-4 h-4" /> Call Customer
                  </a>
                  {selectedEnquiry.email && (
                    <a href={`mailto:${selectedEnquiry.email}`} className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shadow-zinc-900/20">
                      <Mail className="w-4 h-4" /> Send Email
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Enquiry"
        message={`Are you sure you want to delete the enquiry from ${enquiryToDelete?.fullName}? This action cannot be undone.`}
        confirmText="Delete"
        danger={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
