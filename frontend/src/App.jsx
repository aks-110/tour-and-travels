import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Eager load critical routes for fast LCP
import Home from './pages/Home';
import TourPackages from './pages/TourPackages';

// Lazy load remaining routes
const PackageDetail = lazy(() => import('./pages/PackageDetail'));
const Enquire = lazy(() => import('./pages/Enquire'));
const PickupRouteGuide = lazy(() => import('./pages/PickupRouteGuide'));
const CarRentals = lazy(() => import('./pages/CarRentals'));
const Hotels = lazy(() => import('./pages/Hotels'));
const WriteReview = lazy(() => import('./pages/WriteReview'));
const AdminReviews = lazy(() => import('./pages/AdminReviews'));

// Lazy load SEO Landing Pages
const VaranasiTourPackage = lazy(() => import('./pages/seo/VaranasiTourPackage'));
const VaranasiTaxiService = lazy(() => import('./pages/seo/VaranasiTaxiService'));
const AyodhyaTourPackage = lazy(() => import('./pages/seo/AyodhyaTourPackage'));
const PrayagrajTourPackage = lazy(() => import('./pages/seo/PrayagrajTourPackage'));
const KashiVishwanathTour = lazy(() => import('./pages/seo/KashiVishwanathTour'));
const NepalTourPackage = lazy(() => import('./pages/seo/NepalTourPackage'));
const VaranasiAirportTaxi = lazy(() => import('./pages/seo/VaranasiAirportTaxi'));
const SpiritualTourIndia = lazy(() => import('./pages/seo/SpiritualTourIndia'));
const VaranasiTravelAgency = lazy(() => import('./pages/seo/VaranasiTravelAgency'));

// Lazy load Blog Pages
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex'));
const BestPlacesVaranasi = lazy(() => import('./pages/blog/BestPlacesVaranasi'));
const TopGhatsVaranasi = lazy(() => import('./pages/blog/TopGhatsVaranasi'));
const BestTimeVaranasi = lazy(() => import('./pages/blog/BestTimeVaranasi'));
const KashiVishwanathDarshan = lazy(() => import('./pages/blog/KashiVishwanathDarshan'));
const AyodhyaRamMandir = lazy(() => import('./pages/blog/AyodhyaRamMandir'));
const VaranasiItinerary = lazy(() => import('./pages/blog/VaranasiItinerary'));
const SpiritualTourismIndia = lazy(() => import('./pages/blog/SpiritualTourismIndia'));
const GangaAartiGuide = lazy(() => import('./pages/blog/GangaAartiGuide'));

const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tour-packages" element={<TourPackages />} />
          
          <Route element={<Suspense fallback={<div className="min-h-screen bg-ivory flex items-center justify-center pt-20 font-serif text-xl">Loading...</div>}><Outlet /></Suspense>}>
            <Route path="/pickup-route-guide" element={<PickupRouteGuide />} />
            <Route path="/car-rentals" element={<CarRentals />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/enquire-now" element={<Enquire />} />
            <Route path="/write-review" element={<WriteReview />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            
            {/* SEO Landing Pages */}
            <Route path="/varanasi-tour-package" element={<VaranasiTourPackage />} />
            <Route path="/varanasi-taxi-service" element={<VaranasiTaxiService />} />
            <Route path="/ayodhya-tour-package" element={<AyodhyaTourPackage />} />
            <Route path="/prayagraj-tour-package" element={<PrayagrajTourPackage />} />
            <Route path="/kashi-vishwanath-tour" element={<KashiVishwanathTour />} />
            <Route path="/nepal-tour-package" element={<NepalTourPackage />} />
            <Route path="/varanasi-airport-taxi" element={<VaranasiAirportTaxi />} />
            <Route path="/spiritual-tour-india" element={<SpiritualTourIndia />} />
            <Route path="/varanasi-travel-agency" element={<VaranasiTravelAgency />} />

            {/* Blog Pages */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/best-places-to-visit-in-varanasi" element={<BestPlacesVaranasi />} />
            <Route path="/blog/top-ghats-in-varanasi" element={<TopGhatsVaranasi />} />
            <Route path="/blog/best-time-to-visit-varanasi" element={<BestTimeVaranasi />} />
            <Route path="/blog/kashi-vishwanath-darshan-guide" element={<KashiVishwanathDarshan />} />
            <Route path="/blog/ayodhya-ram-mandir-travel-guide" element={<AyodhyaRamMandir />} />
            <Route path="/blog/2-day-varanasi-itinerary" element={<VaranasiItinerary />} />
            <Route path="/blog/spiritual-tourism-in-india" element={<SpiritualTourismIndia />} />
            <Route path="/blog/ganga-aarti-complete-guide" element={<GangaAartiGuide />} />
          </Route>
        </Route>
        <Route path="/package/:id" element={<Suspense fallback={<div className="min-h-screen bg-ivory flex items-center justify-center pt-20 font-serif text-xl">Loading...</div>}><PackageDetail /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
