import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import FAQSection from '../../components/FAQSection';
import CTASection from '../../components/CTASection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { getBreadcrumbSchema, getFAQSchema, getTouristTripSchema, getLocalBusinessSchema } from '../../data/schemas';

const faqs = [
  { question: 'What is included in the Kashi Vishwanath tour package?', answer: 'Our Kashi Vishwanath tour package includes hotel accommodation, AC transport for local sightseeing, VIP darshan at Kashi Vishwanath Temple (skip-the-queue), Kashi Vishwanath Corridor exploration, Ganga Aarti at Dashashwamedh Ghat, sunrise boat ride, visit to Annapurna Temple, Kal Bhairav Temple, and other nearby temples. Meals and extended stays can be customized.' },
  { question: 'How can I get VIP darshan at Kashi Vishwanath Temple?', answer: 'Varanasi SN Tour & Travels specializes in arranging VIP darshan at Kashi Vishwanath Temple. We help you skip the regular queue (which can be 2-4 hours long) and ensure a peaceful, unhurried darshan experience. VIP darshan is subject to availability and temple regulations. Contact us for current availability.' },
  { question: 'What is the Kashi Vishwanath Corridor (Kashi Dham)?', answer: 'The Kashi Vishwanath Corridor (also called Kashi Dham) is a newly constructed grand corridor connecting the ancient Kashi Vishwanath Temple directly to the Ganga River ghats. Inaugurated in 2021, this ₹339 crore project spans 5 lakh sq ft and includes beautiful walkways, ghats, museums, temple gardens, and pilgrim facilities. It has transformed the temple precinct into a world-class pilgrimage destination.' },
  { question: 'What is the best time for Kashi Vishwanath darshan?', answer: 'Early morning (4-6 AM) during Mangala Aarti is the most auspicious time for darshan, with the smallest crowds. Regular hours are 3 AM to 11 PM. Avoid weekends and festivals for shorter queues. Mondays and during Shravan month (July-August) see the highest footfall. Our VIP packages help manage crowds during peak times.' },
  { question: 'What are the rules for visiting Kashi Vishwanath Temple?', answer: 'Key rules: No mobile phones, cameras, or electronic devices allowed inside the temple (lockers available outside). Modest clothing is required — men should wear dhoti/kurta or trousers, women should cover shoulders and legs. Leather items (belts, wallets) are not allowed. ID proof (Aadhaar) is mandatory for entry. Our guides help you with all preparations.' },
  { question: 'Can I combine Kashi Vishwanath darshan with other temples?', answer: 'Yes! Our comprehensive Kashi Vishwanath tour includes visits to nearby temples: Annapurna Temple, Kal Bhairav Temple, Vishalakshi Temple, Durga Temple, Sankat Mochan Temple, Tulsi Manas Mandir, and the Vishwanath Temple inside BHU. We also offer combo packages with Ayodhya Ram Mandir and Prayagraj Sangam.' },
];

export default function KashiVishwanathTour() {
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Tour Packages', to: '/tour-packages' }, { label: 'Kashi Vishwanath Tour' }];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.to }))),
    getFAQSchema(faqs),
    getTouristTripSchema({ name: 'Kashi Vishwanath Tour Package', description: 'Book Kashi Vishwanath darshan package with VIP access. Visit Kashi Vishwanath Temple, Kashi Dham Corridor, Ganga Aarti with Varanasi SN Tour & Travels.', url: '/kashi-vishwanath-tour', price: '2999', duration: '2 Days / 1 Night', location: 'Varanasi, Uttar Pradesh' }),
    getLocalBusinessSchema(),
  ];

  return (
    <main className="bg-white text-gray-900">
      <SEO title="Kashi Vishwanath Tour — VIP Darshan Package & Kashi Dham Visit 2025" description="Book Kashi Vishwanath tour package with VIP darshan. Visit Kashi Vishwanath Temple, Kashi Dham Corridor, Ganga Aarti, temple circuit. Skip queues with Varanasi SN Tour & Travels from ₹2,999." keywords="Kashi Vishwanath tour, Kashi Vishwanath darshan, Kashi Vishwanath package, VIP darshan Kashi Vishwanath, Kashi Dham tour, Kashi Vishwanath Temple visit, Kashi Vishwanath Corridor, Kashi tour package, Banaras temple tour" url="/kashi-vishwanath-tour" schemaData={schemas} />

      {/* Hero */}
      <section className="relative bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=1600" alt="Kashi Vishwanath Temple golden spire — Kashi Vishwanath darshan package" className="w-full h-full object-cover opacity-35" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 block">Sacred Jyotirlinga</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Kashi Vishwanath Tour — VIP Darshan & Kashi Dham Experience</h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">Experience the most sacred Jyotirlinga with our premium Kashi Vishwanath darshan packages. Skip queues with VIP access, explore the magnificent Kashi Vishwanath Corridor, and witness the divine Ganga Aarti — all expertly organized by Varanasi SN Tour & Travels.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919120073105?text=Hi%2C%20I%20want%20to%20book%20Kashi%20Vishwanath%20darshan%20package" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">WhatsApp — Book VIP Darshan</a>
            <Link to="/enquire-now" className="bg-[#ff9933] hover:brightness-110 text-[#1c2011] font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">Get Free Quote →</Link>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* Highlights */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Darshan Experience</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Kashi Vishwanath Tour — What's Included</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🛕', title: 'VIP Kashi Vishwanath Darshan', desc: 'Skip the regular queue (2-4 hours) with our VIP darshan arrangement. Our guides ensure a peaceful, unhurried darshan at the sacred Jyotirlinga temple — the holiest shrine of Lord Shiva.' },
              { icon: '🏛️', title: 'Kashi Dham Corridor Tour', desc: 'Explore the magnificent ₹339-crore Kashi Vishwanath Corridor (Kashi Dham) — the grand walkway connecting the temple to the Ganga ghats. Walk through beautifully landscaped paths, rest areas, and heritage galleries.' },
              { icon: '🪔', title: 'Ganga Aarti Experience', desc: 'Witness the world-famous Ganga Aarti at Dashashwamedh Ghat. Our reserved seating (where available) and private boat ride option ensure the best view of this spectacular spiritual ceremony.' },
              { icon: '🚣', title: 'Sunrise Boat Ride', desc: 'Experience a magical sunrise boat ride on the Ganga. Watch the ancient city come alive as the first rays of sun illuminate 84 ghats. See the morning rituals, yoga, and prayers along the riverbank.' },
              { icon: '🕉️', title: 'Full Temple Circuit', desc: 'Visit all major temples: Annapurna Temple, Kal Bhairav Temple, Vishalakshi Temple, Durga Temple (Monkey Temple), Sankat Mochan Temple, Tulsi Manas Mandir, and BHU Vishwanath Temple.' },
              { icon: '⭐', title: 'Expert Local Guide', desc: 'Our Varanasi-native guides share the rich history, mythology, and significance of each temple. They navigate the old city lanes expertly and ensure you don\'t miss any hidden gem.' },
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
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Choose Your Darshan Package</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Kashi Vishwanath Tour Prices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Essential Darshan', price: '₹2,999', duration: '1 Day', features: ['Kashi Vishwanath darshan', 'Kashi Dham Corridor tour', 'Ganga Aarti viewing', 'AC transport', '2 major temples', 'Expert guide'] },
              { name: 'Premium Darshan', price: '₹5,999', duration: '2 Days / 1 Night', features: ['VIP Kashi Vishwanath darshan', 'Complete Kashi Dham tour', 'Sunrise boat ride + Aarti', 'Full temple circuit (8 temples)', '4-Star hotel stay', 'All meals included', 'Personal guide + AC Innova'], popular: true },
              { name: 'Ultimate Spiritual', price: '₹11,999', duration: '3 Days / 2 Nights', features: ['VIP darshan all temples', 'Private boat rides', 'Heritage walk + Sarnath', '5-Star hotel stay', 'All meals + snacks', 'Dedicated guide', 'Rudraksha/puja souvenirs'] },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 md:p-8 border ${plan.popular ? 'border-[#ff9933] shadow-lg shadow-[#ff9933]/10 relative' : 'border-gray-200 shadow-sm'} bg-white flex flex-col`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff9933] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">Best Value</span>}
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
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto prose prose-gray prose-lg">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-6">Complete Guide to Kashi Vishwanath Darshan</h2>
          <p>The <strong>Kashi Vishwanath Temple</strong> is the most sacred Hindu temple dedicated to Lord Shiva, located in the heart of Varanasi (Kashi) on the western bank of the holy river Ganga. As one of the twelve <strong>Jyotirlingas</strong> (self-manifested lingams of Lord Shiva), it holds supreme importance in Hinduism. Every devout Hindu aspires to visit Kashi Vishwanath at least once in their lifetime.</p>
          <p><strong>Varanasi SN Tour & Travels</strong> offers specialized <strong>Kashi Vishwanath darshan packages</strong> that ensure a smooth, hassle-free, and deeply spiritual experience. Our VIP darshan arrangements help you avoid the long queues that can stretch for 2-4 hours during peak seasons.</p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">History & Significance of Kashi Vishwanath Temple</h3>
          <p>The original Kashi Vishwanath Temple is believed to have been built thousands of years ago. The current structure was rebuilt in 1780 by Queen Ahilyabai Holkar of Indore. The temple's gold-plated spire (shikhara) was donated by Maharaja Ranjit Singh of Punjab in 1835, earning it the nickname "Golden Temple." The temple has been destroyed and rebuilt multiple times throughout history, yet its spiritual significance has only grown stronger.</p>
          <p>According to Hindu mythology, Lord Shiva himself established the Jyotirlinga at Kashi. The Kashi Vishwanath Temple is mentioned in the Skanda Purana, one of the 18 major Puranas. It is believed that a visit to Kashi Vishwanath and a holy dip in the Ganga can liberate a person from the cycle of birth and death (moksha).</p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">The Magnificent Kashi Vishwanath Corridor</h3>
          <p>Inaugurated in December 2021 by Prime Minister Narendra Modi, the <strong>Kashi Vishwanath Corridor (Kashi Dham)</strong> is a transformative ₹339-crore project that has reimagined the entire temple precinct. The corridor spans approximately 5 lakh square feet and directly connects the temple to the Lalita Ghat on the Ganga.</p>
          <p>Key features of the corridor include 23 beautified buildings, museum galleries, Mumukshu Bhavan (shelter for devotees), Bhogshala (community kitchen), city museum, viewing gallery, and spacious pilgrim facilities. The corridor has made it possible for pilgrims to walk from the Ganga directly to the temple — a journey that was previously through narrow, congested lanes.</p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Extend Your Spiritual Journey</h3>
          <p>Combine your Kashi Vishwanath darshan with other sacred destinations:</p>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/varanasi-tour-package" className="text-[#ff9933] hover:underline font-medium">Complete Varanasi Tour Package</Link> — Full Varanasi sightseeing with all ghats and temples.</li>
            <li><Link to="/ayodhya-tour-package" className="text-[#ff9933] hover:underline font-medium">Ayodhya Tour Package</Link> — Visit the magnificent Ram Mandir.</li>
            <li><Link to="/prayagraj-tour-package" className="text-[#ff9933] hover:underline font-medium">Prayagraj Tour Package</Link> — Holy dip at Triveni Sangam.</li>
            <li><Link to="/spiritual-tour-india" className="text-[#ff9933] hover:underline font-medium">Complete Spiritual Circuit</Link> — Varanasi + Ayodhya + Prayagraj + Gaya.</li>
          </ul>
        </div>
      </section>

      <TestimonialsSection title="Kashi Vishwanath Darshan Reviews" />
      <FAQSection faqs={faqs} title="Kashi Vishwanath Tour — FAQ" />
      <CTASection heading="Book Your Kashi Vishwanath Darshan Today" subheading="Get VIP darshan at Kashi Vishwanath Temple with Varanasi SN Tour & Travels. Skip queues, hassle-free experience guaranteed!" />

      {/* Internal Links */}
      <section className="py-12 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-light text-center mb-8">Explore More Packages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ to: '/varanasi-tour-package', label: 'Varanasi Tour Package' }, { to: '/ayodhya-tour-package', label: 'Ayodhya Tour Package' }, { to: '/prayagraj-tour-package', label: 'Prayagraj Tour Package' }, { to: '/nepal-tour-package', label: 'Nepal Tour Package' }, { to: '/varanasi-taxi-service', label: 'Taxi Service' }, { to: '/spiritual-tour-india', label: 'Spiritual Tour India' }, { to: '/varanasi-travel-agency', label: 'About Us' }, { to: '/blog', label: 'Travel Blog' }].map((l, i) => (<Link key={i} to={l.to} className="text-sm text-gray-600 hover:text-[#ff9933] transition-colors py-2 border-b border-gray-100 hover:border-[#ff9933]">{l.label} →</Link>))}
          </div>
        </div>
      </section>
    </main>
  );
}
