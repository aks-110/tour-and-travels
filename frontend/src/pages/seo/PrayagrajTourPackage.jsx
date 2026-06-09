import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import FAQSection from '../../components/FAQSection';
import CTASection from '../../components/CTASection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { getBreadcrumbSchema, getFAQSchema, getTouristTripSchema, getLocalBusinessSchema } from '../../data/schemas';

const faqs = [
  { question: 'How far is Prayagraj from Varanasi?', answer: 'Prayagraj (formerly Allahabad) is approximately 120 km from Varanasi. The journey takes about 2.5–3 hours by road via NH-19 (Grand Trunk Road). Varanasi SN Tour & Travels provides comfortable AC vehicles for this journey with experienced drivers who know the best routes.' },
  { question: 'What is included in the Prayagraj tour package from Varanasi?', answer: 'Our Prayagraj tour package includes AC sedan/Innova transport from Varanasi, Triveni Sangam holy dip arrangement, boat ride at Sangam, visit to Allahabad Fort, Anand Bhavan, Hanuman Mandir, professional driver, and optional guide. Hotel stay and meals can be added for overnight packages.' },
  { question: 'Can I do Prayagraj as a day trip from Varanasi?', answer: 'Yes, Prayagraj is ideal for a day trip from Varanasi. We recommend starting by 6 AM to reach by 9 AM. You can complete Sangam snan, temple visits, and sightseeing comfortably and return to Varanasi by 7 PM. Our day trip package starts from ₹2,499 per person.' },
  { question: 'What is Triveni Sangam and why is it important?', answer: 'Triveni Sangam is the sacred confluence of three holy rivers — Ganga, Yamuna, and the mythical Saraswati — in Prayagraj. Hindus believe that bathing at Sangam washes away all sins. It is one of the most important pilgrimage sites in India and the venue for the world-famous Kumbh Mela.' },
  { question: 'What is the best time to visit Prayagraj?', answer: 'October to March is the best time to visit Prayagraj when weather is pleasant (12–25°C). The Magh Mela (January–February) and Kumbh Mela are the most significant events. Avoid the extreme summer months of April–June when temperatures exceed 45°C.' },
  { question: 'Can I combine Prayagraj with Varanasi and Ayodhya?', answer: 'Absolutely! Our most popular combo is the "Triveni Circuit" — Varanasi + Prayagraj + Ayodhya in 5–6 days. This covers Kashi Vishwanath, Triveni Sangam, and Ram Mandir — the three most important spiritual sites in Uttar Pradesh. Contact us for customized itineraries.' },
];

export default function PrayagrajTourPackage() {
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Tour Packages', to: '/tour-packages' }, { label: 'Prayagraj Tour Package' }];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.to }))),
    getFAQSchema(faqs),
    getTouristTripSchema({ name: 'Prayagraj Tour Package', description: 'Book Prayagraj (Allahabad) tour package from Varanasi. Visit Triveni Sangam, Allahabad Fort, Anand Bhavan with Varanasi SN Tour & Travels.', url: '/prayagraj-tour-package', price: '2499', duration: '1–2 Days', location: 'Prayagraj, Uttar Pradesh' }),
    getLocalBusinessSchema(),
  ];

  return (
    <main className="bg-white text-gray-900">
      <SEO title="Prayagraj Tour Package from Varanasi — Triveni Sangam Visit 2025" description="Book the best Prayagraj tour package from Varanasi with Varanasi SN Tour & Travels. Visit Triveni Sangam, Allahabad Fort, Anand Bhavan. AC transport, boat ride, guide included from ₹2,499." keywords="Prayagraj tour package, Prayagraj tour from Varanasi, Allahabad tour package, Triveni Sangam tour, Prayagraj trip, Sangam snan package, Varanasi to Prayagraj tour, Prayagraj travel package, Kumbh Mela tour" url="/prayagraj-tour-package" schemaData={schemas} />

      {/* Hero */}
      <section className="relative bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1622446282105-3a2e77f4e570?auto=format&fit=crop&q=80&w=1600" alt="Triveni Sangam — confluence of Ganga and Yamuna rivers at Prayagraj" className="w-full h-full object-cover opacity-35" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 block">Sacred Confluence</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Prayagraj Tour Package — Triveni Sangam from Varanasi</h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">Experience the divine Triveni Sangam — the sacred confluence of Ganga, Yamuna, and Saraswati rivers — with our expertly organized Prayagraj tour packages from Varanasi. Comfortable AC transport, boat rides, and hassle-free travel by Varanasi SN Tour & Travels.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919120073105?text=Hi%2C%20I%20want%20to%20book%20Prayagraj%20tour%20package" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">WhatsApp — Book Now</a>
            <Link to="/enquire-now" className="bg-[#ff9933] hover:brightness-110 text-[#1c2011] font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">Get Free Quote →</Link>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* Highlights */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Highlights</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Prayagraj Tour — What You'll Experience</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🌊', title: 'Triveni Sangam Snan', desc: 'Take a holy dip at the sacred confluence of Ganga, Yamuna, and the mythical Saraswati rivers. Our experienced boatmen take you to the exact sangam point for the most auspicious snan.' },
              { icon: '🚣', title: 'Sangam Boat Ride', desc: 'Enjoy a serene boat ride at the Triveni Sangam. See the distinct colors of the Ganga and Yamuna rivers merging. Our private boats ensure a comfortable and safe experience.' },
              { icon: '🏰', title: 'Allahabad Fort', desc: 'Visit the historic Allahabad Fort built by Emperor Akbar in 1583. See the famous Akshayavat (immortal banyan tree), Patalpuri Temple, and Saraswati Koop inside the fort.' },
              { icon: '🏛️', title: 'Anand Bhavan', desc: 'Explore the ancestral home of the Nehru-Gandhi family, now a museum. See the rooms where Jawaharlal Nehru grew up and the historic Swaraj Bhavan next door.' },
              { icon: '🛕', title: 'Hanuman Mandir', desc: 'Visit the famous Bade Hanuman Ji temple near Sangam, where the unique reclining idol of Lord Hanuman is partially submerged during floods — a rare and sacred sight.' },
              { icon: '🕉️', title: 'Shringverpur Dham', desc: 'Visit the sacred Shringverpur (33 km), where Lord Ram crossed the Ganga during his exile. The beautiful temple complex overlooks the river and is a peaceful pilgrimage spot.' },
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
            <h2 className="font-serif text-3xl md:text-4xl font-light">Prayagraj Tour Package Prices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Day Trip', price: '₹2,499', duration: '1 Day', features: ['AC sedan Varanasi-Prayagraj-Varanasi', 'Triveni Sangam snan', 'Boat ride at Sangam', 'Allahabad Fort visit', 'Hanuman Mandir', 'Driver + fuel included'] },
              { name: 'Overnight Package', price: '₹4,999', duration: '2 Days / 1 Night', features: ['AC Innova transport', '3-Star hotel stay', 'Sangam snan + boat ride', 'All major temples', 'Anand Bhavan museum', 'Breakfast included', 'Dedicated guide'], popular: true },
              { name: 'Varanasi + Prayagraj Combo', price: '₹8,999', duration: '4 Days / 3 Nights', features: ['Complete Varanasi tour', 'Prayagraj overnight', 'All darshans included', 'Hotel + all meals', 'VIP Kashi Vishwanath darshan', 'Personal guide', 'Boat rides included'] },
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
          <p className="text-center text-gray-400 text-xs mt-6">* Prices are indicative and may vary based on season, group size, and customization. Contact us for an exact quote.</p>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto prose prose-gray prose-lg">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-6">Complete Guide to Prayagraj Tour from Varanasi</h2>
          <p>Prayagraj (formerly Allahabad), situated at the sacred <strong>Triveni Sangam</strong> — the confluence of the Ganga, Yamuna, and the mythical Saraswati rivers — is one of the holiest cities in Hinduism. Located just 120 km from Varanasi, it is an essential destination on any spiritual tour of Uttar Pradesh. The city has deep religious significance and was one of the four sites of the Kumbh Mela, the largest religious gathering in the world.</p>
          <p><strong>Varanasi SN Tour & Travels</strong> offers the most convenient and affordable <strong>Prayagraj tour packages from Varanasi</strong>. As a trusted local travel agency, we handle every detail — from comfortable AC transport to boat arrangements at Sangam — so you can focus entirely on your spiritual experience.</p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Why Visit Prayagraj from Varanasi?</h3>
          <p>Prayagraj and Varanasi together form the spiritual heartland of India. Here's why combining these two cities makes the perfect pilgrimage:</p>
          <ul className="space-y-2 text-gray-600">
            <li><strong>Proximity:</strong> Just 2.5 hours by road, making it ideal for a day trip or overnight excursion.</li>
            <li><strong>Spiritual Significance:</strong> Sangam snan (holy bath at the confluence) is believed to cleanse all sins — comparable in significance to a dip in the Ganga at Varanasi.</li>
            <li><strong>Historical Importance:</strong> Allahabad Fort, Anand Bhavan, and other monuments make it culturally rich beyond its spiritual appeal.</li>
            <li><strong>Kumbh Mela Connection:</strong> Prayagraj hosts the Maha Kumbh Mela every 12 years, attracting over 100 million pilgrims.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Top Places to Visit in Prayagraj</h3>
          <ol className="space-y-2 text-gray-600">
            <li><strong>Triveni Sangam:</strong> The most sacred spot where the waters of Ganga (brown), Yamuna (green), and mythical Saraswati meet. Boat rides take you to the exact confluence point.</li>
            <li><strong>Allahabad Fort:</strong> A magnificent Mughal-era fort built by Emperor Akbar in 1583. Inside, you'll find the Akshayavat (an undying banyan tree mentioned in Hindu scriptures), Patalpuri Temple, and Saraswati Koop.</li>
            <li><strong>Anand Bhavan:</strong> The grand ancestral home of the Nehru-Gandhi family, now a national museum displaying India's freedom struggle history.</li>
            <li><strong>Bade Hanuman Ji Temple:</strong> A unique temple near Sangam featuring a reclining idol of Lord Hanuman, the only such idol in India.</li>
            <li><strong>Khusro Bagh:</strong> A beautiful Mughal garden with three 17th-century tombs, featuring stunning architecture and peaceful surroundings.</li>
          </ol>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Combine with Other Destinations</h3>
          <p>Enhance your spiritual journey by combining Prayagraj with nearby destinations:</p>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/varanasi-tour-package" className="text-[#ff9933] hover:underline font-medium">Varanasi Tour Package</Link> — Complete Kashi darshan with Ganga Aarti and Kashi Vishwanath Temple.</li>
            <li><Link to="/ayodhya-tour-package" className="text-[#ff9933] hover:underline font-medium">Ayodhya Tour Package</Link> — Visit Ram Mandir and Hanuman Garhi.</li>
            <li><Link to="/kashi-vishwanath-tour" className="text-[#ff9933] hover:underline font-medium">Kashi Vishwanath Special Tour</Link> — VIP darshan with dedicated guide.</li>
            <li><Link to="/spiritual-tour-india" className="text-[#ff9933] hover:underline font-medium">Complete Spiritual Circuit</Link> — Varanasi + Prayagraj + Ayodhya + Gaya full spiritual tour.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">How to Reach Prayagraj from Varanasi</h3>
          <ul className="space-y-2 text-gray-600">
            <li><strong>By Road:</strong> 120 km via NH-19 (Grand Trunk Road). Our <Link to="/varanasi-taxi-service" className="text-[#ff9933] hover:underline font-medium">taxi service</Link> provides comfortable AC vehicles for the journey.</li>
            <li><strong>By Train:</strong> Multiple trains run daily between Varanasi Junction and Prayagraj Junction (1.5–2 hours).</li>
            <li><strong>By Air:</strong> Bamrauli Airport (IXD) in Prayagraj has limited flights. Varanasi airport is better connected.</li>
          </ul>
        </div>
      </section>

      <TestimonialsSection title="Prayagraj Tour Reviews" />
      <FAQSection faqs={faqs} title="Prayagraj Tour Package — FAQ" />
      <CTASection heading="Book Your Prayagraj Tour Today" subheading="Experience the divine Triveni Sangam with Varanasi SN Tour & Travels. Free customized itinerary within 2 hours!" />

      {/* Internal Links */}
      <section className="py-12 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-light text-center mb-8">Explore More Packages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ to: '/varanasi-tour-package', label: 'Varanasi Tour Package' }, { to: '/ayodhya-tour-package', label: 'Ayodhya Tour Package' }, { to: '/kashi-vishwanath-tour', label: 'Kashi Vishwanath Tour' }, { to: '/nepal-tour-package', label: 'Nepal Tour Package' }, { to: '/varanasi-taxi-service', label: 'Taxi Service' }, { to: '/spiritual-tour-india', label: 'Spiritual Tour India' }, { to: '/varanasi-travel-agency', label: 'About Us' }, { to: '/blog', label: 'Travel Blog' }].map((l, i) => (<Link key={i} to={l.to} className="text-sm text-gray-600 hover:text-[#ff9933] transition-colors py-2 border-b border-gray-100 hover:border-[#ff9933]">{l.label} →</Link>))}
          </div>
        </div>
      </section>
    </main>
  );
}
