import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import FAQSection from '../../components/FAQSection';
import CTASection from '../../components/CTASection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { getBreadcrumbSchema, getFAQSchema, getTouristTripSchema, getLocalBusinessSchema } from '../../data/schemas';

const faqs = [
  { question: 'How do I book a taxi in Varanasi?', answer: 'You can book a taxi in Varanasi through Varanasi SN Tour & Travels by WhatsApp (+91 9120073105), phone call, or through our website enquiry form. We offer instant confirmation and provide clean, AC vehicles with experienced local drivers.' },
  { question: 'What types of vehicles are available for taxi service in Varanasi?', answer: 'We offer Swift Dzire/Etios sedans for couples, Toyota Innova Crysta for families (6-7 seater), Tempo Traveller for groups (12-20 seater), and Toyota Fortuner for VIP/luxury travel. All vehicles are well-maintained, AC, and driven by professional chauffeurs.' },
  { question: 'How much does a taxi cost in Varanasi for local sightseeing?', answer: 'Local sightseeing in Varanasi by AC sedan costs approximately ₹1,500-2,500 for a full day (8 hours/80 km). Innova costs ₹2,500-3,500 per day. Airport transfers start from ₹500. Contact us for exact rates based on your itinerary.' },
  { question: 'Do you provide outstation taxi from Varanasi?', answer: 'Yes, we provide outstation taxi services from Varanasi to Ayodhya, Prayagraj, Gaya, Vindhyachal, Lucknow, and other destinations. One-way and round-trip options available with competitive per-km rates.' },
  { question: 'Is the taxi service available 24/7?', answer: 'Yes, Varanasi SN Tour & Travels provides 24/7 taxi service in Varanasi. Whether you need an early morning airport pickup or a late-night railway station drop, our drivers are available round the clock.' },
];

export default function VaranasiTaxiService() {
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/car-rentals' }, { label: 'Varanasi Taxi Service' }];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.to }))),
    getFAQSchema(faqs),
    getLocalBusinessSchema(),
  ];

  return (
    <main className="bg-white text-gray-900">
      <SEO title="Varanasi Taxi Service — Reliable Car Rental & Cab Booking" description="Book reliable Varanasi taxi service with Varanasi SN Tour & Travels. AC sedan, Innova, Tempo Traveller for airport pickup, local sightseeing, and outstation travel. 24/7 service from ₹500." keywords="Varanasi taxi service, Varanasi cab booking, taxi in Varanasi, Varanasi car rental, Varanasi taxi rate, Varanasi outstation taxi, Varanasi airport taxi, cab service Varanasi" url="/varanasi-taxi-service" schemaData={schemas} />

      <section className="relative bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1600" alt="Taxi service in Varanasi — reliable car rental and cab booking" className="w-full h-full object-cover opacity-30" loading="eager" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" /></div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 block">24/7 Transportation</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Varanasi Taxi Service — Reliable & Affordable Cab Booking</h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">Book trusted taxi and cab services in Varanasi with experienced local drivers. Airport pickup, local sightseeing, outstation travel, and pilgrimage tours — all at transparent, reasonable prices.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919120073105?text=Hi%2C%20I%20need%20a%20taxi%20in%20Varanasi" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">Book Taxi via WhatsApp</a>
            <Link to="/enquire-now" className="bg-[#ff9933] hover:brightness-110 text-[#1c2011] font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">Get Taxi Quote →</Link>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* Services Grid */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Our Fleet</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Varanasi Taxi Service — Vehicle Options</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '🚗', name: 'Swift Dzire / Etios Sedan', capacity: '4 passengers', best: 'Couples & small families', price: 'From ₹1,500/day', desc: 'Economy AC sedan perfect for city sightseeing and short outstation trips. Comfortable, fuel-efficient, and driven by experienced local chauffeurs.' },
              { icon: '🚙', name: 'Toyota Innova Crysta', capacity: '6-7 passengers', best: 'Families & small groups', price: 'From ₹2,500/day', desc: 'Premium MPV with spacious interiors, powerful AC, and excellent suspension for comfortable long-distance travel between Varanasi, Ayodhya, and Prayagraj.' },
              { icon: '🚌', name: 'Tempo Traveller', capacity: '12-20 passengers', best: 'Large groups & pilgrim parties', price: 'From ₹5,000/day', desc: 'Ideal group travel vehicle with push-back seating, roof carrier, and large windows. Perfect for multi-city pilgrimage tours with your entire family or group.' },
              { icon: '🏎️', name: 'Toyota Fortuner / Luxury SUV', capacity: '4-6 passengers', best: 'VIP & executive travel', price: 'From ₹5,000/day', desc: 'Premium SUV for VIP delegations, corporate travel, and luxury tours. Supreme comfort, safety, and professional chauffeur service.' },
            ].map((v, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{v.icon}</span>
                  <span className="text-xs font-bold text-[#ff9933] bg-[#ff9933]/10 px-3 py-1 rounded-full">{v.price}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-1">{v.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{v.capacity} • Best for: {v.best}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Transparent Rates</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Varanasi Taxi Service Pricing</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b border-gray-200"><th className="text-left px-6 py-4 font-semibold text-gray-900">Route / Service</th><th className="text-right px-6 py-4 font-semibold text-gray-900">Sedan</th><th className="text-right px-6 py-4 font-semibold text-gray-900">Innova</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Airport Pickup/Drop', '₹500', '₹800'],
                  ['Railway Station Pickup/Drop', '₹400', '₹600'],
                  ['Local Sightseeing (8hr/80km)', '₹1,500', '₹2,500'],
                  ['Varanasi → Ayodhya (One Way)', '₹3,500', '₹5,000'],
                  ['Varanasi → Prayagraj (One Way)', '₹3,000', '₹4,500'],
                  ['Varanasi → Gaya (One Way)', '₹4,500', '₹6,500'],
                ].map(([route, sedan, innova], i) => (
                  <tr key={i} className="hover:bg-gray-50"><td className="px-6 py-3 text-gray-700">{route}</td><td className="px-6 py-3 text-right text-gray-900 font-medium">{sedan}</td><td className="px-6 py-3 text-right text-gray-900 font-medium">{innova}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-400 text-xs mt-4">* Rates are indicative. Toll, parking, and driver allowance may apply for outstation trips.</p>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-6">Why Choose Varanasi SN Tour & Travels for Taxi Service in Varanasi?</h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <p>Finding a <strong>reliable taxi service in Varanasi</strong> can be challenging, especially for first-time visitors navigating the narrow lanes and busy streets of this ancient city. <strong>Varanasi SN Tour & Travels</strong> solves this problem with our fleet of well-maintained vehicles driven by experienced, verified local drivers who know every route in the city.</p>
            <p>Whether you need an <Link to="/varanasi-airport-taxi" className="text-[#ff9933] hover:underline font-medium">airport taxi in Varanasi</Link>, a full-day cab for local sightseeing, or an outstation taxi to <Link to="/ayodhya-tour-package" className="text-[#ff9933] hover:underline font-medium">Ayodhya</Link>, <Link to="/prayagraj-tour-package" className="text-[#ff9933] hover:underline font-medium">Prayagraj</Link>, or Gaya — we have you covered with transparent pricing and 24/7 availability.</p>
            <p>Our <strong>Varanasi taxi service</strong> is trusted by thousands of pilgrims and tourists every year. All our drivers are professionally trained, courteous, and fluent in Hindi and basic English. We provide GPS-tracked vehicles for your safety and real-time ETAs via WhatsApp.</p>

            <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Popular Taxi Routes from Varanasi</h3>
            <ul className="space-y-2">
              <li><strong>Varanasi to Ayodhya:</strong> ~280 km, 5-6 hours drive via Sultanpur. Visit the magnificent Ram Mandir.</li>
              <li><strong>Varanasi to Prayagraj:</strong> ~125 km, 2.5-3 hours drive via NH-19. Experience the sacred Triveni Sangam.</li>
              <li><strong>Varanasi to Gaya:</strong> ~250 km, 5-6 hours drive. Essential for Pind Daan rituals.</li>
              <li><strong>Varanasi to Vindhyachal:</strong> ~80 km, 1.5-2 hours drive. Visit the powerful Vindhyavasini Devi Temple.</li>
              <li><strong>Varanasi Airport to City:</strong> ~25 km, 30-45 minutes. Our <Link to="/varanasi-airport-taxi" className="text-[#ff9933] hover:underline font-medium">airport taxi service</Link> is available 24/7.</li>
            </ul>
          </div>
        </div>
      </section>

      <TestimonialsSection title="Taxi Service Reviews from Our Travelers" />
      <FAQSection faqs={faqs} title="Varanasi Taxi Service — Frequently Asked Questions" />
      <CTASection heading="Book Your Varanasi Taxi Now" subheading="WhatsApp us for instant taxi booking in Varanasi. Available 24/7 with transparent pricing!" />

      <section className="py-12 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-light text-center mb-8">Related Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { to: '/varanasi-tour-package', label: 'Varanasi Tour Package' },
              { to: '/varanasi-airport-taxi', label: 'Airport Taxi Service' },
              { to: '/car-rentals', label: 'Full Fleet Details' },
              { to: '/varanasi-travel-agency', label: 'About Our Agency' },
              { to: '/ayodhya-tour-package', label: 'Ayodhya Tour Package' },
              { to: '/prayagraj-tour-package', label: 'Prayagraj Tour Package' },
              { to: '/kashi-vishwanath-tour', label: 'Kashi Vishwanath Tour' },
              { to: '/tour-packages', label: 'All Tour Packages' },
            ].map((l, i) => (<Link key={i} to={l.to} className="text-sm text-gray-600 hover:text-[#ff9933] transition-colors py-2 border-b border-gray-100 hover:border-[#ff9933]">{l.label} →</Link>))}
          </div>
        </div>
      </section>
    </main>
  );
}
