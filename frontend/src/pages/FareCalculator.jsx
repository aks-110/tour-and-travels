import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import SEO from '../components/SEO';

const STEPS = [
  { id: 1, label: 'Travel Route', icon: '🗺️' },
  { id: 2, label: 'Travellers', icon: '👥' },
  { id: 3, label: 'Vehicle', icon: '🚗' },
  { id: 4, label: 'Preference', icon: '❄️' },
  { id: 5, label: 'Fare Summary', icon: '💰' },
];

export default function FareCalculator() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Data from API
  const [routes, setRoutes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // User selections
  const [routeSearch, setRouteSearch] = useState('');
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [travellers, setTravellers] = useState({ adults: 2, children: 0 });
  const [seats, setSeats] = useState(2);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [acType, setAcType] = useState('AC');

  // Fare result
  const [fareResult, setFareResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const totalTravellers = travellers.adults + travellers.children;

  // Load routes on mount
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/pricing/routes`).then(r => setRoutes(r.data)).catch(() => {});
    axios.get(`${API_BASE_URL}/api/pricing/categories`).then(r => setCategories(r.data)).catch(() => {});
    axios.get(`${API_BASE_URL}/api/pricing/vehicles`).then(r => setVehicles(r.data)).catch(() => {});
  }, []);

  // Group vehicles by category
  const vehiclesByCategory = useMemo(() => {
    const grouped = {};
    categories.forEach(cat => { grouped[cat._id] = { name: cat.name, vehicles: [] }; });
    vehicles.forEach(v => {
      const catId = v.categoryId?._id || v.categoryId;
      if (grouped[catId]) {
        grouped[catId].vehicles.push(v);
      }
    });
    return Object.values(grouped).filter(g => g.vehicles.length > 0);
  }, [categories, vehicles]);

  // Filter vehicles suitable for traveller count
  const suitableVehicles = useMemo(() => {
    return vehicles.filter(v => totalTravellers >= v.minTravellers && totalTravellers <= v.maxTravellers);
  }, [vehicles, totalTravellers]);

  // Calculate fare when reaching step 5
  useEffect(() => {
    if (step === 5 && selectedRoute && selectedVehicle) {
      setIsCalculating(true);
      setError('');
      axios.post(`${API_BASE_URL}/api/pricing/calculate`, {
        routeId: selectedRoute._id,
        vehicleId: selectedVehicle._id,
        acType
      })
        .then(r => setFareResult(r.data))
        .catch(err => setError(err.response?.data?.message || 'Failed to calculate fare'))
        .finally(() => setIsCalculating(false));
    }
  }, [step, selectedRoute, selectedVehicle, acType]);

  const canProceed = () => {
    switch (step) {
      case 1: return !!selectedRoute;
      case 2: return totalTravellers >= 1;
      case 3: return !!selectedVehicle;
      case 4: return true;
      default: return false;
    }
  };

  const goNext = () => {
    if (canProceed() && step < 5) setStep(s => s + 1);
  };
  const goBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const handleContinueToEnquiry = () => {
    navigate('/enquire-now', {
      state: {
        fareData: {
          sourceCity: fareResult.route.sourceCity,
          destinationCity: fareResult.route.destinationCity,
          distanceKm: fareResult.route.distanceKm,
          vehicleName: fareResult.vehicle.name,
          vehicleCategory: fareResult.vehicle.category,
          travellers: totalTravellers,
          seats,
          acType: fareResult.acType,
          estimatedFare: fareResult.finalFare,
          marketFare: fareResult.marketFare,
          discount: fareResult.discountPercentage,
          savings: fareResult.savings,
        }
      }
    });
  };

  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 }
  };

  return (
    <main className="bg-ivory text-earth min-h-screen pt-[72px] md:pt-[88px] font-sans">
      <SEO
        title="Fare Calculator | Get Instant Travel Estimate"
        description="Calculate your travel fare instantly. Choose your route, vehicle, and preferences to get a custom quote."
        url="/fare-calculator"
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-white to-ivory border-b border-earth/5 py-12 px-6 text-center">
        <p className="text-saffron font-sans text-xs font-bold tracking-[0.2em] uppercase mb-3 drop-shadow-sm">Dynamic Pricing</p>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-earth font-medium mb-3">Fare Calculator</h1>
        <p className="text-earth-400 max-w-lg mx-auto text-sm">Get an instant fare estimate based on your travel preferences. No hidden charges.</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className={`flex flex-col items-center relative z-10 ${step >= s.id ? 'opacity-100' : 'opacity-50'} transition-opacity`}>
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 shadow-sm
                  ${step === s.id ? 'bg-gold text-charcoal scale-110 shadow-lg shadow-gold/30 font-bold border-2 border-white' : 
                    step > s.id ? 'bg-gold/20 text-saffron border-2 border-gold/40 font-bold' : 
                    'bg-white text-earth-400 border border-earth/20'}`}>
                  {step > s.id ? '✓' : s.icon}
                </div>
                <span className="text-[10px] md:text-xs mt-2 font-bold tracking-wider uppercase hidden sm:block text-earth-400">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 md:mx-4">
                  <div className={`h-full transition-all duration-500 rounded-full ${step > s.id ? 'bg-gold' : 'bg-earth/10'}`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto px-6 pb-16">
        <AnimatePresence mode="wait">
          {/* STEP 1: Travel Route */}
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <div className="bg-white shadow-xl shadow-earth/5 border border-earth/5 rounded-3xl p-6 md:p-10">
                <h2 className="font-serif text-2xl mb-2 text-earth">Select Your Route</h2>
                <p className="text-earth-400 text-sm mb-8">Choose your pickup and drop-off cities.</p>

                {routes.length === 0 ? (
                  <div className="text-center py-16 text-earth/40">
                    <p className="text-lg mb-2">No routes available</p>
                    <p className="text-sm">Please check back later or contact us directly.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-xl">🔍</span>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Search pickup or drop-off city..." 
                        value={routeSearch}
                        onChange={(e) => setRouteSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-earth/10 bg-ivory focus:bg-white focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/10 transition-all font-medium text-earth placeholder:text-earth/40 shadow-sm"
                      />
                    </div>

                    {/* Scrollable Compact List */}
                    <div className="max-h-[350px] overflow-y-auto pr-2 space-y-2">
                      {routes
                        .filter(r => r.sourceCity.toLowerCase().includes(routeSearch.toLowerCase()) || r.destinationCity.toLowerCase().includes(routeSearch.toLowerCase()))
                        .map(route => (
                        <button
                          key={route._id}
                          onClick={() => setSelectedRoute(selectedRoute?._id === route._id ? null : route)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left
                            ${selectedRoute?._id === route._id
                              ? 'border-gold bg-gold/5 shadow-md shadow-gold/10 scale-[1.01]'
                              : 'border-earth/5 bg-white hover:border-earth/20 hover:bg-ivory hover:shadow-sm'}`}
                        >
                          <div className="flex items-center gap-3 sm:gap-6">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-saffron/10 text-saffron shrink-0">
                              <span className="text-sm">📍</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                              <p className="font-bold text-earth text-sm sm:text-base">{route.sourceCity}</p>
                              <span className="hidden sm:inline text-earth-400">→</span>
                              <span className="sm:hidden text-earth-400 text-xs">↓</span>
                              <p className="font-bold text-earth text-sm sm:text-base">{route.destinationCity}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 shrink-0">
                            <div className="text-right">
                              <span className="text-saffron text-xs font-bold bg-saffron/10 px-2 py-1 rounded-md block">{route.distanceKm} KM</span>
                            </div>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${selectedRoute?._id === route._id ? 'bg-gold border-gold text-charcoal' : 'border-earth/20 text-transparent'}`}>
                              <span className="text-xs font-bold">✓</span>
                            </div>
                          </div>
                        </button>
                      ))}
                      {routes.filter(r => r.sourceCity.toLowerCase().includes(routeSearch.toLowerCase()) || r.destinationCity.toLowerCase().includes(routeSearch.toLowerCase())).length === 0 && (
                        <div className="text-center py-8 text-earth-400">
                          <p>No routes match "{routeSearch}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Travellers */}
          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <div className="bg-white shadow-xl shadow-earth/5 border border-earth/5 rounded-3xl p-6 md:p-10">
                <h2 className="font-serif text-2xl mb-2 text-earth">How Many Travellers?</h2>
                <p className="text-earth-400 text-sm mb-8">This helps us find the best vehicle for your group.</p>

                <div className="space-y-4 sm:space-y-6 max-w-md mx-auto">
                  {/* Adults */}
                  <div className="flex items-center justify-between bg-ivory border border-earth/10 rounded-2xl p-4 sm:p-6 shadow-sm">
                    <div>
                      <p className="font-bold text-earth text-base sm:text-lg">Adults</p>
                      <p className="text-[10px] sm:text-xs text-earth-400 font-medium tracking-wide">Ages 13+</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <button onClick={() => setTravellers(t => ({ ...t, adults: Math.max(1, t.adults - 1) }))}
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white border border-earth/20 flex items-center justify-center text-lg sm:text-xl hover:bg-earth/5 hover:border-earth/40 transition-colors cursor-pointer text-earth shadow-sm shrink-0">−</button>
                      <span className="text-xl sm:text-3xl font-bold w-6 sm:w-10 text-center text-earth">{travellers.adults}</span>
                      <button onClick={() => setTravellers(t => ({ ...t, adults: Math.min(20, t.adults + 1) }))}
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gold/10 border border-gold/30 text-saffron font-bold flex items-center justify-center text-lg sm:text-xl hover:bg-gold/20 hover:border-gold/50 transition-colors cursor-pointer shadow-sm shrink-0">+</button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between bg-ivory border border-earth/10 rounded-2xl p-4 sm:p-6 shadow-sm">
                    <div>
                      <p className="font-bold text-earth text-base sm:text-lg">Children</p>
                      <p className="text-[10px] sm:text-xs text-earth-400 font-medium tracking-wide">Ages 2–12</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <button onClick={() => setTravellers(t => ({ ...t, children: Math.max(0, t.children - 1) }))}
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white border border-earth/20 flex items-center justify-center text-lg sm:text-xl hover:bg-earth/5 hover:border-earth/40 transition-colors cursor-pointer text-earth shadow-sm shrink-0">−</button>
                      <span className="text-xl sm:text-3xl font-bold w-6 sm:w-10 text-center text-earth">{travellers.children}</span>
                      <button onClick={() => setTravellers(t => ({ ...t, children: Math.min(10, t.children + 1) }))}
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gold/10 border border-gold/30 text-saffron font-bold flex items-center justify-center text-lg sm:text-xl hover:bg-gold/20 hover:border-gold/50 transition-colors cursor-pointer shadow-sm shrink-0">+</button>
                    </div>
                  </div>

                  {/* Seats */}
                  <div className="flex items-center justify-between bg-ivory border border-earth/10 rounded-2xl p-4 sm:p-6 shadow-sm">
                    <div>
                      <p className="font-bold text-earth text-base sm:text-lg">Seats Required</p>
                      <p className="text-[10px] sm:text-xs text-earth-400 font-medium tracking-wide">Minimum {totalTravellers}</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <button onClick={() => setSeats(s => Math.max(totalTravellers, s - 1))}
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white border border-earth/20 flex items-center justify-center text-lg sm:text-xl hover:bg-earth/5 hover:border-earth/40 transition-colors cursor-pointer text-earth shadow-sm shrink-0">−</button>
                      <span className="text-xl sm:text-3xl font-bold w-6 sm:w-10 text-center text-earth">{seats}</span>
                      <button onClick={() => setSeats(s => Math.min(50, s + 1))}
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gold/10 border border-gold/30 text-saffron font-bold flex items-center justify-center text-lg sm:text-xl hover:bg-gold/20 hover:border-gold/50 transition-colors cursor-pointer shadow-sm shrink-0">+</button>
                    </div>
                  </div>

                  <div className="text-center mt-6 sm:mt-8">
                    <span className="bg-ivory border border-earth/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium shadow-sm inline-block">
                      Total: <span className="text-saffron font-bold text-sm sm:text-base">{totalTravellers}</span> travellers, <span className="text-saffron font-bold text-sm sm:text-base">{seats}</span> seats
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Vehicle Selection */}
          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <div className="bg-white shadow-xl shadow-earth/5 border border-earth/5 rounded-3xl p-6 md:p-10">
                <h2 className="font-serif text-2xl mb-2 text-earth">Choose Your Vehicle</h2>
                <p className="text-earth-400 text-sm mb-8">
                  Showing vehicles that fit <span className="text-saffron font-bold">{totalTravellers}</span> travellers.
                  {suitableVehicles.length === 0 && vehicles.length > 0 && ' No vehicles match — showing all options.'}
                </p>

                {vehicles.length === 0 ? (
                  <div className="text-center py-16 text-earth/40">
                    <p className="text-lg mb-2">No vehicles available</p>
                    <p className="text-sm">Please contact us directly for a custom quote.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4">
                      {/* Search Bar */}
                      <div className="relative max-w-md mx-auto w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-xl">🔍</span>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Search for a vehicle..." 
                          value={vehicleSearch}
                          onChange={(e) => setVehicleSearch(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-earth/10 bg-ivory focus:bg-white focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/10 transition-all font-medium text-earth placeholder:text-earth/40 shadow-sm"
                        />
                      </div>

                      {/* Category Pills */}
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {['All', ...vehiclesByCategory.map(g => g.name)].map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategoryFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border-2
                              ${selectedCategoryFilter === cat 
                                ? 'bg-gold text-charcoal border-gold shadow-md shadow-gold/20 scale-105' 
                                : 'bg-white text-earth-400 border-earth/10 hover:border-earth/30 hover:bg-ivory'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Compact Scrollable Vehicle List */}
                    <div className="max-h-[350px] overflow-y-auto pr-2 space-y-2">
                      {(() => {
                        const baseVehicles = suitableVehicles.length > 0 ? suitableVehicles : vehicles;
                        let filtered = baseVehicles.filter(v => v.name.toLowerCase().includes(vehicleSearch.toLowerCase()));
                        
                        if (selectedCategoryFilter !== 'All') {
                          const targetGroup = vehiclesByCategory.find(g => g.name === selectedCategoryFilter);
                          if (targetGroup) {
                            const groupIds = targetGroup.vehicles.map(gv => gv._id);
                            filtered = filtered.filter(v => groupIds.includes(v._id));
                          } else {
                            filtered = [];
                          }
                        }

                        if (filtered.length === 0) {
                          return (
                            <div className="text-center py-8 text-earth-400">
                              <p>No vehicles match your search or filter.</p>
                            </div>
                          );
                        }

                        return filtered.map(vehicle => {
                          const categoryName = vehiclesByCategory.find(g => g.vehicles.some(gv => gv._id === vehicle._id))?.name || 'Standard';
                          
                          return (
                            <button
                              key={vehicle._id}
                              onClick={() => setSelectedVehicle(selectedVehicle?._id === vehicle._id ? null : vehicle)}
                              className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left
                                ${selectedVehicle?._id === vehicle._id
                                  ? 'border-gold bg-gold/5 shadow-md shadow-gold/10 scale-[1.01]'
                                  : 'border-earth/5 bg-white hover:border-earth/20 hover:bg-ivory hover:shadow-sm'}`}
                            >
                              <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-earth/5 text-xl shrink-0">
                                  🚗
                                </div>
                                <div>
                                  <p className="font-bold text-earth text-base sm:text-lg">{vehicle.name}</p>
                                  <p className="text-[10px] text-earth-400 uppercase tracking-widest font-bold">{categoryName}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 w-full sm:w-auto">
                                <div className="flex flex-wrap gap-2 text-xs font-medium">
                                  <span className="flex items-center gap-1 bg-ivory px-2 py-1 rounded border border-earth/5">👥 {vehicle.minTravellers}-{vehicle.maxTravellers}</span>
                                  <span className="flex items-center gap-1 bg-ivory px-2 py-1 rounded border border-earth/5">💺 {vehicle.maxSeats}</span>
                                  {vehicle.supportsAC && <span className="text-blue-600/80 font-bold bg-blue-50 px-2 py-1 rounded border border-blue-100">❄️ AC</span>}
                                  {vehicle.supportsNonAC && <span className="text-earth-400 font-bold bg-earth/5 px-2 py-1 rounded border border-earth/10">🌬️ Non-AC</span>}
                                </div>
                                <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center border-2 transition-colors ${selectedVehicle?._id === vehicle._id ? 'bg-gold border-gold text-charcoal' : 'border-earth/20 text-transparent'}`}>
                                  <span className="text-xs font-bold">✓</span>
                                </div>
                              </div>
                            </button>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 4: AC / Non-AC Preference */}
          {step === 4 && (
            <motion.div key="step4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <div className="bg-white shadow-xl shadow-earth/5 border border-earth/5 rounded-3xl p-6 md:p-10">
                <h2 className="font-serif text-2xl mb-2 text-earth">AC Preference</h2>
                <p className="text-earth-400 text-sm mb-8">Choose air conditioning preference for your journey.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
                  {[
                    { value: 'AC', icon: '❄️', label: 'Air Conditioned', desc: 'Cool & comfortable' },
                    { value: 'Non-AC', icon: '🌬️', label: 'Non-AC', desc: 'Natural ventilation' }
                  ].filter(opt => {
                    if (opt.value === 'AC') return selectedVehicle?.supportsAC !== false;
                    return selectedVehicle?.supportsNonAC !== false;
                  }).map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setAcType(opt.value)}
                      className={`relative text-center p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                        ${acType === opt.value
                          ? 'border-gold bg-gold/5 shadow-md shadow-gold/10'
                          : 'border-earth/10 bg-white hover:border-earth/30 hover:bg-ivory hover:shadow-sm'}`}
                    >
                      <span className="text-5xl block mb-4 drop-shadow-sm">{opt.icon}</span>
                      <p className="font-bold text-earth text-xl">{opt.label}</p>
                      <p className="text-earth-400 text-sm mt-2">{opt.desc}</p>
                      {acType === opt.value && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-charcoal text-xs font-bold shadow-sm">✓</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Fare Summary */}
          {step === 5 && (
            <motion.div key="step5" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <div className="bg-white shadow-xl shadow-earth/5 border border-earth/5 rounded-3xl p-6 md:p-10">
                <h2 className="font-serif text-2xl mb-2 text-earth text-center">Your Fare Estimate</h2>
                <p className="text-earth-400 text-sm mb-8 text-center">Here's your custom travel quotation.</p>

                {isCalculating ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-earth-400 font-medium">Calculating your best fare...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-16">
                    <p className="text-red-500 mb-4 font-bold text-lg">⚠️ {error}</p>
                    <button onClick={() => setStep(1)} className="bg-white border-2 border-earth/20 px-8 py-3 rounded-xl text-sm font-bold hover:bg-earth/5 hover:border-earth/40 transition-colors cursor-pointer text-earth shadow-sm">
                      Start Over
                    </button>
                  </div>
                ) : fareResult ? (
                  <div className="max-w-lg mx-auto">
                    {/* Route summary */}
                    <div className="bg-ivory border border-earth/10 rounded-2xl p-6 mb-6 space-y-4 shadow-sm">
                      <div className="flex justify-between items-center text-sm border-b border-earth/5 pb-3">
                        <span className="text-earth-400 font-medium uppercase tracking-wider text-xs">Route</span>
                        <span className="text-earth font-bold text-base">{fareResult.route.sourceCity} → {fareResult.route.destinationCity}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-earth-400 font-medium">Distance</span>
                        <span className="text-earth font-bold">{fareResult.route.distanceKm} KM</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-earth-400 font-medium">Vehicle</span>
                        <span className="text-earth font-bold">{fareResult.vehicle.name} <span className="text-earth/40 font-normal">({fareResult.vehicle.category})</span></span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-earth-400 font-medium">Travellers</span>
                        <span className="text-earth font-bold">{totalTravellers} persons · {seats} seats</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-earth-400 font-medium">AC Type</span>
                        <span className="text-earth font-bold bg-white px-2 py-0.5 rounded border border-earth/10">{fareResult.acType}</span>
                      </div>
                    </div>

                    {/* Pricing card */}
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 sm:p-8 shadow-md">
                      <div className="flex justify-between items-center mb-4 text-earth/60 font-medium">
                        <span>Market Fare</span>
                        <span className="text-lg line-through decoration-earth/30">₹{fareResult.marketFare?.toLocaleString('en-IN')}</span>
                      </div>
                      {fareResult.discountPercentage > 0 && (
                        <div className="flex justify-between items-center gap-2 mb-4">
                          <span className="text-green-700 text-xs sm:text-sm font-bold bg-green-100 px-2.5 py-1.5 rounded-md border border-green-200 inline-block leading-tight max-w-full">
                            {fareResult.offerName || 'Special Discount'} ({fareResult.discountPercentage}% OFF)
                          </span>
                          <span className="text-green-700 text-lg font-bold whitespace-nowrap">−₹{fareResult.savings?.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <hr className="border-amber-200/60 my-5" />
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-1 sm:gap-0">
                        <span className="text-earth font-bold text-base sm:text-xl uppercase tracking-wider">Your Fare</span>
                        <span className="text-amber-700 font-serif text-4xl sm:text-5xl font-bold drop-shadow-sm self-end sm:self-auto leading-none">₹{fareResult.finalFare?.toLocaleString('en-IN')}</span>
                      </div>
                      {fareResult.savings > 0 && (
                        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center shadow-sm">
                          <span className="text-green-700 font-bold text-xs sm:text-sm block leading-relaxed">You save ₹{fareResult.savings?.toLocaleString('en-IN')} with this booking!</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleContinueToEnquiry}
                      className="w-full mt-8 bg-gold hover:bg-[#eab308] text-charcoal font-bold py-4 rounded-xl text-lg transition-all cursor-pointer shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-0.5"
                    >
                      Continue To Enquiry →
                    </button>
                    <p className="text-center text-earth-400 text-xs mt-4 font-medium">No payment required. Our team will contact you to confirm.</p>
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 5 && (
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={goBack}
              disabled={step === 1}
              className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-sm ${step === 1 ? 'opacity-30 cursor-not-allowed bg-ivory border border-earth/10 text-earth' : 'bg-white border-2 border-earth/20 hover:bg-ivory hover:border-earth/40 text-earth'}`}
            >
              ← Back
            </button>
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className={`px-10 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-sm ${canProceed()
                ? 'bg-gold text-charcoal hover:bg-[#eab308] shadow-md shadow-gold/20 hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 border-2 border-transparent'
                : 'bg-ivory text-earth/30 cursor-not-allowed border-2 border-earth/5'}`}
            >
              Next →
            </button>
          </div>
        )}

        {step === 5 && fareResult && (
          <div className="flex justify-center mt-8">
            <button onClick={goBack} className="px-8 py-3.5 rounded-xl font-bold text-sm bg-white border-2 border-earth/20 hover:bg-ivory hover:border-earth/40 transition-all text-earth cursor-pointer shadow-sm">
              ← Modify Selections
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
