import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import FAQSection from '../../components/FAQSection';
import CTASection from '../../components/CTASection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { getBreadcrumbSchema, getFAQSchema, getTouristTripSchema, getLocalBusinessSchema } from '../../data/schemas';

const faqs = [
  { question: 'How many days are needed for an Ayodhya tour?', answer: 'A 1-day Ayodhya tour covers the major highlights including Ram Mandir darshan and Hanuman Garhi. For a relaxed experience including Saryu river, Kanak Bhavan, and Nageshwarnath Temple, we recommend 2 days. Our most popular Varanasi + Ayodhya combo tour is a 3-4 day package.' },
  { question: 'What is included in the Ayodhya tour package from Varanasi?', answer: 'Our Ayodhya tour package from Varanasi includes AC vehicle transport (Varanasi to Ayodhya and back), professional driver, Ram Mandir darshan assistance, Hanuman Garhi visit, Saryu Ghat visit, and optional hotel stay in Ayodhya. Meals and VIP darshan can be added.' },
  { question: 'How far is Ayodhya from Varanasi?', answer: 'Ayodhya is approximately 280 km from Varanasi. The journey takes about 5-6 hours by road via Sultanpur on NH-330. Varanasi SN Tour & Travels provides comfortable AC vehicles for this journey with experienced drivers.' },
  { question: 'Can I visit Ayodhya Ram Mandir as a day trip from Varanasi?', answer: 'Yes, though it will be a long day. We recommend starting by 4-5 AM from Varanasi to reach Ayodhya by 10 AM. After darshan and sightseeing, you return to Varanasi by 8-9 PM. For comfort, a 2-day trip with overnight stay in Ayodhya is preferable.' },
  { question: 'What is the best time to visit Ayodhya?', answer: 'October to March is ideal when weather is pleasant (15-25°C). Ram Navami (March/April) is the grandest festival but expect huge crowds. Our VIP packages help manage crowds during peak season.' },
];

export default function AyodhyaTourPackage() {
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Tour Packages', to: '/tour-packages' }, { label: 'Ayodhya Tour Package' }];
  const schemas = [getBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.to }))), getFAQSchema(faqs), getTouristTripSchema({ name: 'Ayodhya Tour Package', description: 'Book Ayodhya tour package from Varanasi. Visit Ram Mandir, Hanuman Garhi, Saryu Ghat with Varanasi SN Tour & Travels.', url: '/ayodhya-tour-package', price: '3499', duration: '2 Days / 1 Night', location: 'Ayodhya, Uttar Pradesh' }), getLocalBusinessSchema()];

  return (
    <main className="bg-white text-gray-900">
      <SEO title="Ayodhya Tour Package from Varanasi — Ram Mandir Darshan 2025" description="Book the best Ayodhya tour package from Varanasi with Varanasi SN Tour & Travels. Visit Ram Mandir, Hanuman Garhi, Saryu Ghat. AC transport, guide, hotel included from ₹3,499." keywords="Ayodhya tour package, Ayodhya tour package from Varanasi, Ram Mandir tour package, Ayodhya trip, Ayodhya darshan package, Varanasi to Ayodhya tour, Ayodhya travel package, Ram Mandir visit package" url="/ayodhya-tour-package" schemaData={schemas} />

      <section className="relative bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1609947017136-9dab4b0bfc4b?auto=format&fit=crop&q=80&w=1600" alt="Ayodhya Ram Mandir — Ayodhya tour package from Varanasi" className="w-full h-full object-cover opacity-35" loading="eager" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" /></div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 block">Sacred Pilgrimage</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Ayodhya Tour Package — Ram Mandir Darshan from Varanasi</h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">Visit the magnificent Ram Mandir in Ayodhya with our expertly organized tour packages from Varanasi. Comfortable AC transport, experienced guides, and hassle-free darshan arrangements by Varanasi SN Tour & Travels.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919120073105?text=Hi%2C%20I%20want%20to%20book%20Ayodhya%20tour%20package" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">WhatsApp — Book Now</a>
            <Link to="/enquire-now" className="bg-[#ff9933] hover:brightness-110 text-[#1c2011] font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">Get Free Quote →</Link>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Highlights</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Ayodhya Tour Package — What You'll Experience</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🛕', title: 'Ram Mandir Darshan', desc: 'Visit the newly built Sri Ram Janmabhoomi Temple, one of the most magnificent Hindu temples ever constructed. Our guides ensure smooth darshan with minimal waiting.' },
              { icon: '🙏', title: 'Hanuman Garhi', desc: 'The most important temple in Ayodhya after Ram Mandir. This ancient hilltop temple dedicated to Lord Hanuman offers panoramic views of the entire city.' },
              { icon: '🏞️', title: 'Saryu River Ghat', desc: 'Take a serene walk along the sacred Saryu river ghats. Experience the evening aarti and the peaceful atmosphere of this holy riverbank.' },
              { icon: '🏛️', title: 'Kanak Bhavan', desc: 'Beautiful palace-temple gifted by Kaikeyi to Sita. The temple houses exquisite idols of Lord Ram and Goddess Sita adorned with gold ornaments.' },
              { icon: '🕉️', title: 'Nageshwarnath Temple', desc: 'Ancient Shiva temple believed to have been established by Kush, son of Lord Ram. One of the oldest existing structures in Ayodhya.' },
              { icon: '🚗', title: 'Comfortable Transport', desc: 'AC sedan or Innova from Varanasi to Ayodhya with professional driver. Door-to-door service with hotel pickup and drop.' },
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
            <h2 className="font-serif text-3xl md:text-4xl font-light">Ayodhya Tour Package Prices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Day Trip', price: '₹3,499', duration: '1 Day', features: ['AC sedan Varanasi-Ayodhya-Varanasi', 'Ram Mandir darshan', 'Hanuman Garhi visit', 'Saryu Ghat visit', 'Driver + fuel included'], },
              { name: 'Overnight Package', price: '₹5,999', duration: '2 Days / 1 Night', features: ['AC Innova transport', 'Hotel stay in Ayodhya', 'All major temple visits', 'Saryu river aarti', 'Breakfast included', 'Dedicated guide'], popular: true },
              { name: 'Varanasi + Ayodhya Combo', price: '₹9,999', duration: '4 Days / 3 Nights', features: ['Complete Varanasi tour', 'Ayodhya overnight stay', 'All darshans included', 'Hotel + all meals', 'VIP darshan Kashi Vishwanath', 'Personal guide throughout'], },
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
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-6">Complete Guide to Ayodhya Tour from Varanasi</h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <p>Ayodhya, the birthplace of Lord Ram, has become one of India's most visited pilgrimage destinations after the inauguration of the magnificent <strong>Sri Ram Janmabhoomi Temple (Ram Mandir)</strong> in January 2024. Located approximately 280 km from Varanasi in Uttar Pradesh, Ayodhya is now an essential stop on any spiritual tour of North India.</p>
            <p><strong>Varanasi SN Tour & Travels</strong> offers the most convenient and affordable <strong>Ayodhya tour packages from Varanasi</strong>. As a trusted local travel agency, we handle every detail — from comfortable AC transport to darshan arrangements — so you can focus entirely on your spiritual experience.</p>
            <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">How to Plan Your Ayodhya Visit from Varanasi</h3>
            <p>The most popular way to visit Ayodhya is as a day trip or overnight tour from Varanasi. Here's what we recommend:</p>
            <ul className="space-y-2">
              <li><strong>Day Trip:</strong> Depart Varanasi at 5 AM, reach Ayodhya by 10 AM. Visit Ram Mandir, Hanuman Garhi, and Saryu Ghat. Return to Varanasi by 9 PM.</li>
              <li><strong>Overnight Stay:</strong> The more comfortable option. Visit all major sites, attend the evening Saryu aarti, stay overnight in Ayodhya, and return next morning.</li>
              <li><strong>Combo Tour:</strong> Combine Ayodhya with your <Link to="/varanasi-tour-package" className="text-[#ff9933] hover:underline font-medium">Varanasi tour package</Link> for the ultimate spiritual experience.</li>
            </ul>
            <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">About Ram Mandir — Sri Ram Janmabhoomi Temple</h3>
            <p>The Ram Mandir is built in the Nagara style of Hindu temple architecture and spans an area of 2.7 acres. The temple is 161 feet wide, 360 feet long, and 161 feet tall with three stories. It houses a divine idol of Lord Ram as an infant (Ram Lalla) in the sanctum sanctorum. The temple complex includes beautiful gardens, a museum, and pilgrim facilities.</p>
            <p>Combine your Ayodhya visit with other nearby destinations: <Link to="/prayagraj-tour-package" className="text-[#ff9933] hover:underline font-medium">Prayagraj (Sangam)</Link>, <Link to="/kashi-vishwanath-tour" className="text-[#ff9933] hover:underline font-medium">Kashi Vishwanath Temple</Link>, and <Link to="/spiritual-tour-india" className="text-[#ff9933] hover:underline font-medium">complete spiritual circuit of India</Link>.</p>
          </div>
        </div>
      </section>

      <TestimonialsSection title="Ayodhya Tour Reviews" />
      <FAQSection faqs={faqs} title="Ayodhya Tour Package — FAQ" />
      <CTASection heading="Book Your Ayodhya Tour Package Today" subheading="Experience the divine Ram Mandir with Varanasi SN Tour & Travels. Free customized itinerary within 2 hours!" />

      <section className="py-12 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-light text-center mb-8">Explore More Packages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ to: '/varanasi-tour-package', label: 'Varanasi Tour Package' }, { to: '/prayagraj-tour-package', label: 'Prayagraj Tour' }, { to: '/kashi-vishwanath-tour', label: 'Kashi Vishwanath Tour' }, { to: '/nepal-tour-package', label: 'Nepal Tour Package' }, { to: '/varanasi-taxi-service', label: 'Taxi Service' }, { to: '/spiritual-tour-india', label: 'Spiritual Tour India' }, { to: '/varanasi-travel-agency', label: 'About Us' }, { to: '/blog', label: 'Travel Blog' }].map((l, i) => (<Link key={i} to={l.to} className="text-sm text-gray-600 hover:text-[#ff9933] transition-colors py-2 border-b border-gray-100 hover:border-[#ff9933]">{l.label} →</Link>))}
          </div>
        </div>
      </section>
    </main>
  );
}
