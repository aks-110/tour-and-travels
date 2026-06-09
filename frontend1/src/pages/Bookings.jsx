import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { useSocket } from '../hooks/useSocket';
import {
  Calendar, User, MapPin, CreditCard, AlertCircle,
  CheckCircle2, XCircle, Search, RefreshCw, Clock,
  BadgeCheck, AlertTriangle, IndianRupee, ArrowRight, X, ChevronRight, Phone, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { key: 'confirmed', label: 'Confirmed Bookings', icon: BadgeCheck },
  { key: 'pending_payment', label: 'Pending Payment', icon: Clock },
];

/* ─── Custom Cancel Confirmation Modal ─────────────────────────── */
function CancelModal({ booking, onConfirm, onClose, isLoading }) {
  if (!booking) return null;
  const hasRefund = booking.financials?.advanceAmount > 0;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 24 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Red warning header */}
          <div className="bg-gradient-to-br from-red-50 to-rose-100 px-6 pt-7 pb-5 border-b border-red-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 border-4 border-red-200 flex items-center justify-center mb-3">
              <AlertTriangle className="w-7 h-7 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">Cancel Booking?</h2>
            <p className="text-sm text-zinc-500 mt-1">This action cannot be undone.</p>
          </div>

          {/* Booking summary */}
          <div className="px-6 py-5 space-y-3">
            <div className="bg-zinc-50 rounded-xl p-4 space-y-2.5 border border-zinc-100">
              <div className="flex items-center gap-2 text-sm font-mono font-bold text-zinc-900">
                <span className="bg-zinc-200 px-2 py-0.5 rounded text-xs">{booking.bookingId}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <User className="w-4 h-4 text-zinc-400 shrink-0" />
                <span className="font-medium">{booking.customerDetails?.fullName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>
                  {booking.packageDetails?.sourceCity}
                  <ArrowRight className="w-3.5 h-3.5 inline mx-1 text-zinc-400" />
                  {booking.packageDetails?.destinationCity}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{new Date(booking.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Refund block */}
            {hasRefund ? (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-green-700 font-semibold uppercase tracking-wider">Refund to Customer</p>
                  <p className="text-2xl font-bold text-green-700">
                    ₹{booking.financials.advanceAmount?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-green-600 mt-0.5">
                    Will be credited within 5–7 business days via Razorpay.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-zinc-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">No Advance Paid</p>
                  <p className="text-sm text-zinc-600 mt-0.5">No payment refund is required for this booking.</p>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="px-6 pb-6 flex flex-col gap-3">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-sm shadow-red-600/20"
            >
              {isLoading ? (
                <><RefreshCw className="w-5 h-5 animate-spin shrink-0" /> Processing...</>
              ) : (
                <><AlertTriangle className="w-5 h-5 shrink-0" /> {hasRefund ? 'Yes, Cancel & Refund' : 'Yes, Cancel Booking'}</>
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl border-2 border-zinc-200 text-zinc-700 font-bold text-sm hover:bg-zinc-50 transition-colors disabled:opacity-50"
            >
              No, Keep Booking
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Booking Details Slide-Over (Drawer) ───────────────────────── */
function BookingDetailsDrawer({ booking, onClose, onConfirmClick, onCancelClick, actionLoading, getStatusBadge }) {
  if (!booking) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="drawer-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        key="drawer-panel"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-zinc-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-lg font-bold text-zinc-900 font-mono tracking-tight">{booking.bookingId}</h2>
              {getStatusBadge(booking.status, booking.paymentMode)}
            </div>
            <p className="text-xs text-zinc-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Booked on {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-200 text-zinc-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Customer Details */}
          <section>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4" /> Customer Information
            </h3>
            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 space-y-4">
              <div>
                <p className="text-sm font-bold text-zinc-900">{booking.customerDetails.fullName}</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-600">{booking.customerDetails.mobile}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-600 break-all">{booking.customerDetails.email}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Package Details */}
          <section>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Trip Details
            </h3>
            <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm space-y-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-zinc-500 font-medium">Route</p>
                  <div className="w-5 h-5 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-3 h-3 text-saffron" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-earth">{booking.packageDetails.sourceCity} <span className="text-zinc-300 mx-1">→</span> {booking.packageDetails.destinationCity}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1">Travel Date</p>
                  <p className="text-sm font-bold text-earth">{new Date(booking.travelDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1">Travellers</p>
                  <p className="text-sm font-bold text-earth">{booking.travelers} Persons</p>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-100">
                <p className="text-xs text-zinc-500 font-medium mb-1">Vehicle Details</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-earth">{booking.packageDetails.vehicleName}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded">{booking.packageDetails.acType}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-100">
                <p className="text-xs text-zinc-500 font-medium mb-1">Pickup Location</p>
                <p className="text-sm text-earth">{booking.customerDetails.pickupLocation || 'Not specified'}</p>
              </div>
            </div>
          </section>

          {/* Financials */}
          <section>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Payment Summary
            </h3>
            <div className="bg-zinc-900 rounded-2xl p-5 text-zinc-300 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>Base Fare</span>
                <span className="text-white">₹{booking.financials.basePrice?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Taxes & Fees</span>
                <span className="text-white">₹{(booking.financials.taxes + booking.financials.convenienceFee)?.toLocaleString('en-IN')}</span>
              </div>
              <div className="h-px bg-zinc-700 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">Total Amount</span>
                <span className="text-lg font-bold text-white">₹{booking.financials.totalAmount?.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-zinc-800 grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Advance Paid</p>
                  {booking.paymentMode === 'withoutAdvance' ? (
                    <p className="text-sm font-bold text-zinc-400">None</p>
                  ) : (
                    <p className="text-sm font-bold text-emerald-400">₹{booking.financials.advanceAmount?.toLocaleString('en-IN')}</p>
                  )}
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Pending Dues</p>
                  <p className="text-sm font-bold text-amber-400">₹{booking.financials.remainingAmount?.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-200 bg-white space-y-3">
          {booking.status === 'PENDING_CONFIRMATION' && (
            <button
              onClick={() => onConfirmClick(booking._id)}
              disabled={!!actionLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-600/20 disabled:opacity-50"
            >
              {actionLoading === booking._id ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              Confirm Booking
            </button>
          )}

          {['PENDING_CONFIRMATION', 'CONFIRMED', 'PAYMENT_PENDING'].includes(booking.status) && (
            <button
              onClick={() => onCancelClick(booking)}
              disabled={!!actionLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-red-100 hover:border-red-200 hover:bg-red-50 text-red-600 font-bold rounded-xl transition-all disabled:opacity-50"
            >
              <XCircle className="w-5 h-5" />
              Cancel {booking.financials?.advanceAmount > 0 ? '& Refund' : 'Booking'}
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main Bookings Page ────────────────────────────────────────── */
export default function Bookings() {
  const { fetchWithAuth } = useApi();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('confirmed');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [actionLoading, setActionLoading] = useState(null);
  const [cancelModal, setCancelModal] = useState(null); // booking object to cancel
  const [confirmModal, setConfirmModal] = useState(null); // booking id to confirm
  const [selectedBooking, setSelectedBooking] = useState(null); // For drawer

  const socket = useSocket();

  const fetchBookings = async (tab = activeTab, quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const data = await fetchWithAuth(`/bookings/admin/all?tab=${tab}`);
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      showToast('Failed to load bookings', 'error');
    } finally {
      if (!quiet) setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (socket) {
      const handleUpdate = () => {
        fetchBookings(activeTab, true);
      };
      
      socket.on('newBooking', handleUpdate);
      socket.on('bookingUpdated', handleUpdate);
      
      return () => {
        socket.off('newBooking', handleUpdate);
        socket.off('bookingUpdated', handleUpdate);
      };
    }
  }, [socket, activeTab]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
  };

  const handleConfirmBooking = async () => {
    if (!confirmModal) return;
    const id = confirmModal;
    setActionLoading(id);
    try {
      await fetchWithAuth(`/bookings/admin/${id}/confirm`, { method: 'POST' });
      setConfirmModal(null);
      if (selectedBooking && selectedBooking._id === id) {
        setSelectedBooking(null);
      }
      // Remove row from current tab with animation, then switch to Confirmed tab
      setBookings(prev => prev.filter(b => b._id !== id));
      showToast('✅ Booking confirmed & moved to Confirmed Bookings!');
      // After exit animation (350ms), switch to Confirmed Bookings tab
      setTimeout(() => {
        setActiveTab('confirmed');
      }, 400);
    } catch (err) {
      showToast('Failed to confirm: ' + err.message, 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelConfirmed = async () => {
    if (!cancelModal) return;
    const id = cancelModal._id;
    setActionLoading(id);
    try {
      const res = await fetchWithAuth(`/bookings/admin/${id}/cancel`, { method: 'POST' });
      setCancelModal(null);
      showToast(res.message || 'Booking cancelled & refund processed!', 'success');
      // Optimistically remove from UI with animation — deleted permanently from this view
      setBookings(prev => prev.filter(b => b._id !== id));
      if (selectedBooking && selectedBooking._id === id) {
        setSelectedBooking(null);
      }
    } catch (err) {
      showToast('Failed to cancel: ' + err.message, 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredBookings = bookings.filter(b =>
    b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.customerDetails.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status, paymentMode) => {
    switch (status) {
      case 'PENDING_CONFIRMATION':
        return paymentMode === 'withoutAdvance'
          ? <span className="inline-block whitespace-nowrap px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold border border-blue-200">Awaiting Trip</span>
          : <span className="inline-block whitespace-nowrap px-2.5 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-bold border border-amber-200">Pending Review</span>;
      case 'CONFIRMED': return <span className="inline-block whitespace-nowrap px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold border border-green-200">Confirmed</span>;
      case 'PAYMENT_PENDING': return <span className="inline-block whitespace-nowrap px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold border border-blue-200">Awaiting Payment</span>;
      case 'CANCELLED': return <span className="inline-block whitespace-nowrap px-2.5 py-1 bg-red-100 text-red-700 rounded-md text-xs font-bold border border-red-200">Cancelled</span>;
      case 'REFUND_INITIATED': return <span className="inline-block whitespace-nowrap px-2.5 py-1 bg-orange-100 text-orange-700 rounded-md text-xs font-bold border border-orange-200">Refunding...</span>;
      case 'REFUNDED': return <span className="inline-block whitespace-nowrap px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold border border-slate-200">Refunded</span>;
      default: return <span className="inline-block whitespace-nowrap px-2.5 py-1 bg-zinc-100 text-zinc-700 rounded-md text-xs font-bold border border-zinc-200">{status}</span>;
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">

      {/* Custom Confirm Modal */}
      <AnimatePresence>
        {confirmModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
            onClick={() => { if (!actionLoading) setConfirmModal(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 px-6 pt-7 pb-5 border-b border-green-100 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-zinc-900">Confirm Booking?</h2>
                <p className="text-sm text-zinc-500 mt-1">This will notify the customer and mark the booking as confirmed.</p>
              </div>
              <div className="px-6 py-5 text-sm text-zinc-600 text-center">
                The booking will be moved to the <span className="font-bold text-zinc-900">Confirmed Bookings</span> tab automatically.
              </div>
              <div className="px-6 pb-6 flex flex-col gap-3">
                <button
                  onClick={handleConfirmBooking}
                  disabled={!!actionLoading}
                  className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-sm shadow-green-600/20"
                >
                  {actionLoading ? (
                    <><RefreshCw className="w-5 h-5 animate-spin shrink-0" /> Confirming...</>
                  ) : (
                    <><CheckCircle2 className="w-5 h-5 shrink-0" /> Yes, Confirm Booking</>
                  )}
                </button>
                <button
                  onClick={() => setConfirmModal(null)}
                  disabled={!!actionLoading}
                  className="w-full py-3.5 rounded-xl border-2 border-zinc-200 text-zinc-700 font-bold text-sm hover:bg-zinc-50 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cancel Modal */}
      {cancelModal && (
        <CancelModal
          booking={cancelModal}
          onClose={() => { if (!actionLoading) setCancelModal(null); }}
          onConfirm={handleCancelConfirmed}
          isLoading={actionLoading === cancelModal._id}
        />
      )}

      {/* Slide-Over Drawer */}
      {selectedBooking && (
        <BookingDetailsDrawer
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onConfirmClick={(id) => setConfirmModal(id)}
          onCancelClick={(b) => setCancelModal(b)}
          actionLoading={actionLoading}
          getStatusBadge={getStatusBadge}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 leading-tight">Booking Management</h1>
          <p className="text-zinc-500 text-sm mt-1">Review bookings, verify payments, and manage refunds.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <button onClick={() => fetchBookings(activeTab)} className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 text-zinc-600">
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-100 p-1 rounded-xl mb-6 w-fit">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => { setActiveTab(key); setSearchTerm(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === key ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-zinc-500 flex flex-col items-center">
            <RefreshCw className="w-8 h-8 animate-spin text-zinc-400 mb-4" />
            <p>Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            <AlertCircle className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-zinc-700">No bookings found</p>
            <p className="text-sm mt-1">
              {activeTab === 'confirmed'
                ? 'No confirmed or pending-review bookings.'
                : 'No bookings awaiting payment.'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 uppercase text-xs tracking-wider font-semibold">
                  <tr>
                    <th className="p-4 whitespace-nowrap">Customer Info</th>
                    <th className="p-4 whitespace-nowrap">Travel Date</th>
                    <th className="p-4 whitespace-nowrap">Status</th>
                    <th className="p-4 whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <AnimatePresence>
                    {filteredBookings.map((booking) => (
                      <motion.tr
                        key={booking._id}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="hover:bg-zinc-50/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2 font-bold text-zinc-900 mb-0.5 text-base">
                            {booking.customerDetails.fullName}
                          </div>
                          <p className="text-sm text-zinc-500 font-medium mb-1">{booking.customerDetails.mobile}</p>
                          <span className="text-xs text-zinc-400">Created: {new Date(booking.createdAt).toLocaleDateString()}</span>
                        </td>

                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-1.5 text-sm text-zinc-700 font-medium">
                            <Calendar className="w-4 h-4 text-zinc-400" />
                            {new Date(booking.travelDate).toLocaleDateString()}
                          </div>
                        </td>

                        <td className="p-4 align-middle whitespace-nowrap">
                          {getStatusBadge(booking.status, booking.paymentMode)}
                        </td>

                        <td className="p-4 align-middle whitespace-nowrap text-right">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedBooking(booking); }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-lg transition-colors"
                          >
                            View Details <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile View (Cards) */}
            <div className="block sm:hidden divide-y divide-zinc-100">
              <AnimatePresence>
                {filteredBookings.map((booking) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setSelectedBooking(booking)}
                    className="p-4 bg-white hover:bg-zinc-50 active:bg-zinc-100 transition-colors cursor-pointer flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-bold text-zinc-900 text-[15px] leading-tight mb-0.5">{booking.customerDetails.fullName}</h3>
                        <p className="text-[13px] text-zinc-500 font-medium">{booking.customerDetails.mobile}</p>
                      </div>
                      <div className="shrink-0 mt-0.5">
                        {getStatusBadge(booking.status, booking.paymentMode)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1 pt-3 border-t border-zinc-100">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(booking.travelDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-zinc-800 text-[11px] font-bold uppercase tracking-wider bg-zinc-100 px-3 py-1.5 rounded-md">
                        Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[70]"
          >
            <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border ${
              toast.type === 'success' ? 'bg-white border-green-100 text-zinc-800' : 'bg-white border-red-100 text-red-800'
            }`}>
              {toast.type === 'success'
                ? <CheckCircle2 className="w-5 h-5 text-green-600" />
                : <AlertCircle className="w-5 h-5 text-red-600" />}
              <p className="font-medium text-sm pr-2">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
