import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import FAQSection from '../../components/FAQSection';
import CTASection from '../../components/CTASection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { getBreadcrumbSchema, getFAQSchema, getLocalBusinessSchema } from '../../data/schemas';

const faqs = [
  { question: 'How much does a Varanasi airport taxi cost?', answer: 'Varanasi airport taxi prices with Varanasi SN Tour & Travels: AC Sedan (Swift Dzire/Etios) — ₹500–700, AC Innova Crysta — ₹800–1,000, Tempo Traveller (12-seater) — ₹1,200–1,500. Prices depend on your drop location. Cantonment area/hotels near ghats are ₹500–700 by sedan. No hidden charges, no surge pricing.' },
  { question: 'How do I book a Varanasi airport pickup?', answer: 'Book your Varanasi airport taxi by WhatsApp (+91 9120073105), phone call (+91 9335487124), or through our website enquiry form. Share your flight number and arrival time — we track your flight and adjust pickup time automatically. Instant confirmation via WhatsApp.' },
  { question: 'How far is Varanasi airport from the city?', answer: 'Lal Bahadur Shastri International Airport (VNS) is approximately 26 km from Varanasi city center (Dashashwamedh Ghat area). The drive takes 45–60 minutes depending on traffic. During festival seasons, it may take longer due to heavy traffic near ghats.' },
  { question: 'Do you provide railway station pickup in Varanasi?', answer: 'Yes! We provide pickup and drop services at all Varanasi railway stations: Varanasi Junction (BSB), Manduadih (MUV), and Varanasi City (BCY). Our drivers wait with a name board and help with luggage. We also cover Mughal Sarai (DDU Junction) which is 17 km from Varanasi.' },
  { question: 'Can I book a taxi for airport drop-off in Varanasi?', answer: 'Yes, we provide both airport pickup and drop-off services. For drop-offs, we recommend booking 3 hours before your flight departure. Our drivers ensure you reach the airport well in time. We also offer waiting time if needed at nominal charges.' },
  { question: 'Is the airport taxi available at night in Varanasi?', answer: 'Yes, our Varanasi airport taxi service operates 24/7, including early morning and late-night flights. No extra night charges for airport pickups/drops. We track flight delays automatically and adjust pickup time — no waiting charge for flight delays.' },
];

export default function VaranasiAirportTaxi() {
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/car-rentals' }, { label: 'Varanasi Airport Taxi' }];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.to }))),
    getFAQSchema(faqs),
    getLocalBusinessSchema(),
  ];

  return (
    <main className="bg-white text-gray-900">
      <SEO title="Varanasi Airport Taxi — Reliable Pickup & Drop Service from ₹500" description="Book Varanasi airport taxi with Varanasi SN Tour & Travels. Reliable airport pickup and drop service, AC sedan/Innova, flight tracking, 24/7 availability. From ₹500. No hidden charges." keywords="Varanasi airport taxi, Varanasi airport pickup, Varanasi airport cab, taxi from Varanasi airport, Varanasi airport transfer, airport to hotel Varanasi, Babatpur airport taxi, VNS airport taxi, Varanasi airport drop" url="/varanasi-airport-taxi" schemaData={schemas} />

      {/* Hero */}
      <section className="relative bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1600" alt="Airport taxi service in Varanasi — reliable pickup and drop" className="w-full h-full object-cover opacity-30" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 block">24/7 Airport Service</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Varanasi Airport Taxi — Reliable Pickup & Drop from ₹500</h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">Start your Varanasi journey stress-free with our reliable airport taxi service. Clean AC vehicles, professional drivers, real-time flight tracking, and no surge pricing. Varanasi SN Tour & Travels — trusted by thousands of travelers.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919120073105?text=Hi%2C%20I%20need%20Varanasi%20airport%20taxi%20pickup" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">WhatsApp — Book Airport Taxi</a>
            <a href="tel:+919335487124" className="bg-[#ff9933] hover:brightness-110 text-[#1c2011] font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">📞 Call Now — Instant Booking</a>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* Vehicle Rates */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Fixed Pricing — No Surge</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Varanasi Airport Taxi Rates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'AC Sedan', vehicle: 'Swift Dzire / Toyota Etios', price: '₹500–700', capacity: '4 Passengers', features: ['Airport pickup/drop', 'AC vehicle', 'Professional driver', 'Flight tracking', 'Luggage assistance', 'No hidden charges'] },
              { name: 'AC Innova', vehicle: 'Toyota Innova Crysta', price: '₹800–1,000', capacity: '6–7 Passengers', features: ['Airport pickup/drop', 'Spacious AC vehicle', 'Professional driver', 'Flight tracking', 'Extra luggage space', 'Family-friendly'], popular: true },
              { name: 'Tempo Traveller', vehicle: '12–20 Seater', price: '₹1,200–2,000', capacity: '12–20 Passengers', features: ['Group airport transfer', 'AC push-back seats', 'Professional driver', 'Flight tracking', 'Large luggage capacity', 'Ideal for groups'] },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 md:p-8 border ${plan.popular ? 'border-[#ff9933] shadow-lg shadow-[#ff9933]/10 relative' : 'border-gray-200 shadow-sm'} bg-white flex flex-col`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff9933] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Booked</span>}
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{plan.vehicle}</p>
                <p className="text-xs text-gray-400 mb-4">{plan.capacity}</p>
                <p className="font-serif text-4xl font-bold text-gray-900 mb-1">{plan.price}</p>
                <p className="text-xs text-gray-400 mb-6">one way</p>
                <ul className="space-y-2.5 mb-8 flex-grow">{plan.features.map((f, j) => (<li key={j} className="text-sm text-gray-600 flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{f}</li>))}</ul>
                <a href="https://wa.me/919120073105?text=Hi%2C%20I%20need%20airport%20taxi%20in%20Varanasi" target="_blank" rel="noopener noreferrer" className={`w-full text-center py-3 rounded-full font-bold text-sm transition-all ${plan.popular ? 'bg-[#ff9933] text-[#1c2011] hover:brightness-110' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>Book Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light">Why Choose Our Airport Taxi Service?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '✈️', title: 'Real-Time Flight Tracking', desc: 'We track your flight status in real time. If your flight is delayed, our driver adjusts pickup time automatically — no extra charges for delays.' },
              { icon: '🕐', title: '24/7 Availability', desc: 'Our airport taxi service runs round the clock. Whether your flight lands at 3 AM or 11 PM, our driver will be waiting at the arrival gate with your name board.' },
              { icon: '💰', title: 'Fixed Price — No Surge', desc: 'Unlike app-based cabs, we offer fixed prices with no surge pricing. What we quote is what you pay. No hidden charges, no meter tampering, no last-minute price hikes.' },
              { icon: '🚗', title: 'Clean, AC Vehicles', desc: 'All our vehicles are well-maintained, air-conditioned, and sanitized before each trip. Choose from sedan, Innova, or Tempo Traveller based on your group size.' },
              { icon: '👨‍✈️', title: 'Professional Drivers', desc: 'Our drivers are experienced, courteous, and know Varanasi inside out. They speak Hindi and basic English, and help with luggage and local guidance.' },
              { icon: '📱', title: 'Easy WhatsApp Booking', desc: 'Book your airport taxi instantly via WhatsApp. Share your flight details, get instant confirmation, and receive driver details 1 hour before pickup.' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto prose prose-gray prose-lg">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-6">Varanasi Airport Taxi — Complete Guide</h2>
          <p><strong>Lal Bahadur Shastri International Airport (VNS)</strong>, also known as Babatpur Airport, is the main airport serving Varanasi. Located about 26 km from the city center, it's well-connected with flights from Delhi, Mumbai, Bangalore, Kolkata, Hyderabad, Chennai, and other major cities. Getting a reliable taxi from the airport to your hotel in Varanasi is essential for a smooth start to your trip.</p>
          <p><strong>Varanasi SN Tour & Travels</strong> provides the most reliable <strong>Varanasi airport taxi service</strong> — with fixed pricing, real-time flight tracking, and professional drivers who ensure you reach your hotel comfortably and safely.</p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Airport to Hotel Distance in Varanasi</h3>
          <ul className="space-y-2 text-gray-600">
            <li><strong>Airport to Dashashwamedh Ghat:</strong> ~26 km (45–60 min)</li>
            <li><strong>Airport to Cantonment Area:</strong> ~22 km (35–50 min)</li>
            <li><strong>Airport to Sigra/Mahmoorganj:</strong> ~20 km (30–45 min)</li>
            <li><strong>Airport to BHU/Lanka:</strong> ~18 km (25–40 min)</li>
            <li><strong>Airport to Sarnath:</strong> ~30 km (50–65 min)</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Also Need a Local Tour?</h3>
          <p>Combine your airport transfer with a complete sightseeing package:</p>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/varanasi-tour-package" className="text-[#ff9933] hover:underline font-medium">Varanasi Tour Package</Link> — Full Kashi darshan from ₹2,999.</li>
            <li><Link to="/varanasi-taxi-service" className="text-[#ff9933] hover:underline font-medium">Varanasi Local Taxi Service</Link> — Full day local sightseeing by AC car.</li>
            <li><Link to="/kashi-vishwanath-tour" className="text-[#ff9933] hover:underline font-medium">Kashi Vishwanath Darshan</Link> — VIP darshan package.</li>
            <li><Link to="/ayodhya-tour-package" className="text-[#ff9933] hover:underline font-medium">Ayodhya Day Trip</Link> — Airport pickup + Ayodhya tour combo.</li>
          </ul>
        </div>
      </section>

      <TestimonialsSection title="Airport Taxi Reviews" />
      <FAQSection faqs={faqs} title="Varanasi Airport Taxi — FAQ" />
      <CTASection heading="Book Your Airport Taxi Now" subheading="Stress-free airport pickup & drop in Varanasi. WhatsApp us with your flight details for instant confirmation!" />

      {/* Internal Links */}
      <section className="py-12 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-light text-center mb-8">More Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ to: '/varanasi-taxi-service', label: 'Local Taxi Service' }, { to: '/varanasi-tour-package', label: 'Varanasi Tour Package' }, { to: '/car-rentals', label: 'Car Rentals' }, { to: '/ayodhya-tour-package', label: 'Ayodhya Tour Package' }, { to: '/kashi-vishwanath-tour', label: 'Kashi Vishwanath Tour' }, { to: '/prayagraj-tour-package', label: 'Prayagraj Tour Package' }, { to: '/varanasi-travel-agency', label: 'About Us' }, { to: '/blog', label: 'Travel Blog' }].map((l, i) => (<Link key={i} to={l.to} className="text-sm text-gray-600 hover:text-[#ff9933] transition-colors py-2 border-b border-gray-100 hover:border-[#ff9933]">{l.label} →</Link>))}
          </div>
        </div>
      </section>
    </main>
  );
}
