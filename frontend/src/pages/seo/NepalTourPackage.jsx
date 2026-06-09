import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import FAQSection from '../../components/FAQSection';
import CTASection from '../../components/CTASection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { getBreadcrumbSchema, getFAQSchema, getTouristTripSchema, getLocalBusinessSchema } from '../../data/schemas';

const faqs = [
  { question: 'What is included in the Nepal tour package from Varanasi?', answer: 'Our Nepal tour package from Varanasi includes AC transport to Nepal border (Sonauli/Sunauli), Nepal-side vehicle, hotel accommodations, Pashupatinath Temple darshan, Lumbini (Buddha birthplace) visit, Kathmandu sightseeing, Pokhara (optional), all sightseeing, professional guide, and border crossing assistance. Meals and visa support can be added.' },
  { question: 'How far is Nepal from Varanasi?', answer: 'The India-Nepal border at Sonauli/Sunauli is approximately 280 km from Varanasi (6-7 hours by road). Kathmandu is about 600 km from Varanasi. Lumbini is just 30 km from the border. Varanasi SN Tour & Travels manages the complete logistics including border crossing formalities.' },
  { question: 'Do I need a visa for Nepal from India?', answer: 'No, Indian citizens do NOT need a visa to visit Nepal. You only need a valid ID proof — Aadhaar Card, Voter ID, or Passport. We recommend carrying a passport for smoother border crossing. Our team assists with all border formalities and documentation.' },
  { question: 'What is the best time to visit Nepal?', answer: 'October to December (autumn) is the best time — clear skies, pleasant weather (15-25°C), perfect for mountain views. February to April (spring) is also excellent with rhododendron blooms. Avoid June-September monsoon season. Winter (December-February) is cold but offers crystal clear Himalayan views.' },
  { question: 'Can I visit Pashupatinath Temple in Nepal?', answer: 'Yes! Pashupatinath Temple in Kathmandu is one of the holiest Shiva temples and one of 12 Jyotirlingas (by some traditions). Our Nepal tour package includes Pashupatinath darshan. Non-Hindus can view the temple from outside. The temple complex along the Bagmati River is a UNESCO World Heritage Site.' },
  { question: 'How many days are needed for a Nepal tour from Varanasi?', answer: 'Minimum 4 days for Lumbini + Pokhara basic tour. 5-6 days for Lumbini + Kathmandu (Pashupatinath, Boudhanath, Swayambhunath). 7-8 days for a comprehensive Nepal circuit including Pokhara, Chitwan, and Kathmandu valley. We customize based on your interests and budget.' },
];

export default function NepalTourPackage() {
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Tour Packages', to: '/tour-packages' }, { label: 'Nepal Tour Package' }];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.to }))),
    getFAQSchema(faqs),
    getTouristTripSchema({ name: 'Nepal Tour Package from Varanasi', description: 'Book Nepal tour package from Varanasi. Visit Pashupatinath, Lumbini, Kathmandu, Pokhara with Varanasi SN Tour & Travels.', url: '/nepal-tour-package', price: '8999', duration: '5–7 Days', location: 'Nepal' }),
    getLocalBusinessSchema(),
  ];

  return (
    <main className="bg-white text-gray-900">
      <SEO title="Nepal Tour Package from Varanasi — Pashupatinath, Lumbini, Kathmandu 2025" description="Book the best Nepal tour package from Varanasi. Visit Pashupatinath Temple, Lumbini, Kathmandu, Pokhara. AC transport, hotel, guide, border assistance included from ₹8,999. Varanasi SN Tour & Travels." keywords="Nepal tour package, Nepal tour from Varanasi, Nepal tour package from India, Pashupatinath tour, Lumbini tour, Kathmandu tour package, Pokhara tour, Nepal pilgrimage tour, Varanasi to Nepal tour" url="/nepal-tour-package" schemaData={schemas} />

      {/* Hero */}
      <section className="relative bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1585938389612-a552a28d6914?auto=format&fit=crop&q=80&w=1600" alt="Himalayan mountains and Pashupatinath Temple in Nepal — Nepal tour package from Varanasi" className="w-full h-full object-cover opacity-35" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 block">International Pilgrimage</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Nepal Tour Package — Pashupatinath, Lumbini & Kathmandu from Varanasi</h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">Extend your spiritual journey from Kashi to Nepal. Visit the sacred Pashupatinath Temple, Buddha's birthplace Lumbini, the stunning Kathmandu Valley, and breathtaking Pokhara — all seamlessly organized by Varanasi SN Tour & Travels with complete border assistance.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919120073105?text=Hi%2C%20I%20want%20to%20book%20Nepal%20tour%20package%20from%20Varanasi" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">WhatsApp — Book Now</a>
            <Link to="/enquire-now" className="bg-[#ff9933] hover:brightness-110 text-[#1c2011] font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">Get Free Quote →</Link>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* Highlights */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Nepal Highlights</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Nepal Tour — What You'll Experience</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🛕', title: 'Pashupatinath Temple', desc: 'Visit the most sacred Shiva temple in Nepal, a UNESCO World Heritage Site on the banks of the Bagmati River. Witness the ancient cremation ghats and evening aarti ceremony.' },
              { icon: '☸️', title: 'Lumbini — Buddha\'s Birthplace', desc: 'Explore the birthplace of Gautama Buddha, a UNESCO World Heritage Site. Visit the Maya Devi Temple, Ashoka Pillar, Sacred Garden, and monasteries from around the world.' },
              { icon: '🏔️', title: 'Kathmandu Valley', desc: 'Explore the vibrant capital city — Durbar Square, Swayambhunath (Monkey Temple), Boudhanath Stupa, Thamel market. A perfect blend of Hindu and Buddhist heritage.' },
              { icon: '🌄', title: 'Pokhara & Phewa Lake', desc: 'Visit the stunning lakeside city of Pokhara with breathtaking Annapurna mountain views. Enjoy boating on Phewa Lake, visit Devi\'s Fall, and explore the International Mountain Museum.' },
              { icon: '🏞️', title: 'Chitwan National Park', desc: 'Optional jungle safari in Chitwan National Park — see one-horned rhinoceros, Bengal tigers, elephants, and exotic birds. A UNESCO World Heritage Site for nature lovers.' },
              { icon: '📋', title: 'Hassle-Free Border Crossing', desc: 'We handle all border crossing formalities at Sonauli/Sunauli. Document assistance, vehicle changes, and local guide coordination — making your Nepal entry completely smooth.' },
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

      {/* Pricing */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Transparent Pricing</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Nepal Tour Package Prices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Lumbini Express', price: '₹8,999', duration: '3 Days / 2 Nights', features: ['AC transport to Nepal border', 'Lumbini full day tour', 'Hotel stay (2 nights)', 'Border crossing assistance', 'Maya Devi Temple visit', 'Driver + guide'] },
              { name: 'Nepal Spiritual Circuit', price: '₹16,999', duration: '5 Days / 4 Nights', features: ['Complete transport arrangement', 'Lumbini + Kathmandu', 'Pashupatinath darshan', 'Boudhanath + Swayambhunath', 'Hotel stays (4 nights)', 'All meals included', 'Dedicated Nepal guide'], popular: true },
              { name: 'Grand Nepal Tour', price: '₹24,999', duration: '7 Days / 6 Nights', features: ['Lumbini + Kathmandu + Pokhara', 'Pashupatinath VIP darshan', 'Phewa Lake boating', 'Chitwan jungle safari', 'Luxury hotel stays', 'All meals + snacks', 'Personal guide throughout', 'Internal flights (optional)'] },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 md:p-8 border ${plan.popular ? 'border-[#ff9933] shadow-lg shadow-[#ff9933]/10 relative' : 'border-gray-200 shadow-sm'} bg-white flex flex-col`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff9933] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</span>}
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">{plan.duration}</p>
                <p className="font-serif text-4xl font-bold text-gray-900 mb-1">{plan.price}</p>
                <p className="text-xs text-gray-400 mb-6">per person</p>
                <ul className="space-y-2.5 mb-8 flex-grow">{plan.features.map((f, j) => (<li key={j} className="text-sm text-gray-600 flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{f}</li>))}</ul>
                <Link to="/enquire-now" className={`w-full text-center py-3 rounded-full font-bold text-sm transition-all ${plan.popular ? 'bg-[#ff9933] text-[#1c2011] hover:brightness-110' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>Book This Package</Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-6">* Prices are per person on twin sharing. International travel charges, entry fees, and tips not included. Contact for exact pricing.</p>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto prose prose-gray prose-lg">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-6">Complete Guide to Nepal Tour from Varanasi</h2>
          <p>Nepal, the land of the Himalayas and the birthplace of Lord Buddha, is one of the most spiritually significant destinations in South Asia. For pilgrims visiting <strong>Varanasi (Kashi)</strong>, extending their journey to Nepal is a natural and deeply rewarding choice. The India-Nepal border at Sonauli is just 280 km from Varanasi, making it highly accessible.</p>
          <p><strong>Varanasi SN Tour & Travels</strong> offers comprehensive <strong>Nepal tour packages from Varanasi</strong> that cover all major pilgrimage and tourist destinations. We handle every detail — from border crossing formalities to hotel bookings and local transport in Nepal — ensuring a completely hassle-free experience.</p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Why Visit Nepal from Varanasi?</h3>
          <ul className="space-y-2 text-gray-600">
            <li><strong>Spiritual Connection:</strong> Pashupatinath Temple in Kathmandu is among the most sacred Shiva temples, complementing your Kashi Vishwanath darshan perfectly.</li>
            <li><strong>Buddha Circuit:</strong> Lumbini (Buddha's birthplace) is just 30 km from the Indian border, forming the perfect extension of the Buddhist circuit with Sarnath (near Varanasi) and Bodh Gaya.</li>
            <li><strong>No Visa Required:</strong> Indian citizens don't need a visa for Nepal — just a valid ID proof.</li>
            <li><strong>Natural Beauty:</strong> The Himalayan scenery, Pokhara's lakeside beauty, and Chitwan's wildlife offer a refreshing contrast to the spiritual intensity of Varanasi.</li>
            <li><strong>Affordable:</strong> Nepal is budget-friendly for Indian travelers. Indian Rupees are accepted in many places.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Key Destinations in Your Nepal Tour</h3>
          <ol className="space-y-2 text-gray-600">
            <li><strong>Lumbini:</strong> UNESCO World Heritage Site, birthplace of Siddhartha Gautama (Buddha). Visit Maya Devi Temple, Sacred Garden, Ashoka Pillar, and monasteries built by countries worldwide.</li>
            <li><strong>Pashupatinath Temple:</strong> The most sacred Shiva temple in Nepal, on the banks of Bagmati River. The temple complex includes cremation ghats, smaller temples, and ashrams.</li>
            <li><strong>Kathmandu:</strong> Durbar Square (UNESCO), Swayambhunath (Monkey Temple), Boudhanath Stupa, Thamel market, Garden of Dreams.</li>
            <li><strong>Pokhara:</strong> Stunning lakeside city with Annapurna range views, Phewa Lake, World Peace Pagoda, Devi's Fall, and Gupteshwor Cave.</li>
            <li><strong>Chitwan:</strong> National Park for jungle safaris — spot one-horned rhinoceros, Bengal tigers, and exotic birds.</li>
          </ol>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Combine Nepal with Your India Spiritual Tour</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/varanasi-tour-package" className="text-[#ff9933] hover:underline font-medium">Varanasi Tour Package</Link> — Complete Kashi darshan before heading to Nepal.</li>
            <li><Link to="/kashi-vishwanath-tour" className="text-[#ff9933] hover:underline font-medium">Kashi Vishwanath Darshan</Link> — VIP darshan at Kashi Vishwanath before Nepal.</li>
            <li><Link to="/ayodhya-tour-package" className="text-[#ff9933] hover:underline font-medium">Ayodhya Tour Package</Link> — Add Ram Mandir visit to your itinerary.</li>
            <li><Link to="/spiritual-tour-india" className="text-[#ff9933] hover:underline font-medium">Complete Spiritual Circuit</Link> — Varanasi + Ayodhya + Prayagraj + Nepal.</li>
          </ul>
        </div>
      </section>

      <TestimonialsSection title="Nepal Tour Reviews" />
      <FAQSection faqs={faqs} title="Nepal Tour Package — FAQ" />
      <CTASection heading="Book Your Nepal Tour Package Today" subheading="Experience the magic of Nepal with Varanasi SN Tour & Travels. Complete border assistance, hotel, and transport included!" />

      {/* Internal Links */}
      <section className="py-12 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-light text-center mb-8">Explore More Packages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ to: '/varanasi-tour-package', label: 'Varanasi Tour Package' }, { to: '/ayodhya-tour-package', label: 'Ayodhya Tour Package' }, { to: '/prayagraj-tour-package', label: 'Prayagraj Tour Package' }, { to: '/kashi-vishwanath-tour', label: 'Kashi Vishwanath Tour' }, { to: '/varanasi-taxi-service', label: 'Taxi Service' }, { to: '/spiritual-tour-india', label: 'Spiritual Tour India' }, { to: '/varanasi-travel-agency', label: 'About Us' }, { to: '/blog', label: 'Travel Blog' }].map((l, i) => (<Link key={i} to={l.to} className="text-sm text-gray-600 hover:text-[#ff9933] transition-colors py-2 border-b border-gray-100 hover:border-[#ff9933]">{l.label} →</Link>))}
          </div>
        </div>
      </section>
    </main>
  );
}
