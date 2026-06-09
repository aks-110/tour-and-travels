import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import FAQSection from '../../components/FAQSection';
import CTASection from '../../components/CTASection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { getBreadcrumbSchema, getFAQSchema, getTouristTripSchema, getLocalBusinessSchema } from '../../data/schemas';

const faqs = [
  { question: 'What destinations are covered in the spiritual tour of India?', answer: 'Our spiritual tour of India covers the major pilgrimage circuit of Uttar Pradesh and beyond: Varanasi (Kashi Vishwanath, Ganga Aarti, Sarnath), Ayodhya (Ram Mandir, Hanuman Garhi), Prayagraj (Triveni Sangam), Gaya/Bodh Gaya (Mahabodhi Temple, Pind Daan), Vindhyachal (Vindhyavasini Devi), and optionally Nepal (Pashupatinath, Lumbini). Each tour is fully customizable.' },
  { question: 'How many days are needed for a complete spiritual tour?', answer: 'A basic spiritual circuit (Varanasi + Ayodhya + Prayagraj) takes 5-6 days. Adding Gaya makes it 7-8 days. The complete circuit including Vindhyachal and Nepal takes 10-12 days. We also offer shorter focused tours: Varanasi-only (2-3 days), Varanasi + Ayodhya (3-4 days), or Varanasi + Prayagraj (3-4 days).' },
  { question: 'What makes your spiritual tour different from others?', answer: 'Varanasi SN Tour & Travels is based in Varanasi with deep local knowledge. Our guides are not just tour operators — they understand the spiritual significance of each site. We offer VIP darshan at Kashi Vishwanath, private boat rides for Ganga Aarti, early morning temple access, and personalized puja arrangements at each destination.' },
  { question: 'Do you provide puja and ritual arrangements?', answer: 'Yes! We arrange all types of pujas and rituals: Ganga Aarti special darshan, Kashi Vishwanath abhishek, Pind Daan at Gaya, Sangam snan at Prayagraj, Rudrabhishek puja, Maha Mrityunjaya Jaap, and more. All puja materials and pandit services are arranged by us.' },
  { question: 'Is the spiritual tour suitable for elderly travelers?', answer: 'Absolutely! We specialize in comfortable spiritual tours for senior citizens. Our packages include AC vehicles with comfortable seating, wheelchair-accessible options, hotels with lifts, shorter walking distances, frequent rest stops, VIP darshan (less standing), and medical assistance contact on standby.' },
  { question: 'What is included in the spiritual tour package pricing?', answer: 'Our spiritual tour packages typically include: AC transport throughout, hotel accommodation, breakfast/meals as per plan, sightseeing as per itinerary, guide services, boat rides, and puja arrangements. Temple entry fees, tips, personal expenses, and airfare are not included. Contact us for a detailed customized quote.' },
];

export default function SpiritualTourIndia() {
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Tour Packages', to: '/tour-packages' }, { label: 'Spiritual Tour India' }];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.to }))),
    getFAQSchema(faqs),
    getTouristTripSchema({ name: 'Spiritual Tour of India', description: 'Book comprehensive spiritual tour package covering Varanasi, Ayodhya, Prayagraj, Gaya, Vindhyachal. Complete pilgrimage circuit with Varanasi SN Tour & Travels.', url: '/spiritual-tour-india', price: '12999', duration: '7–12 Days', location: 'Uttar Pradesh, India' }),
    getLocalBusinessSchema(),
  ];

  return (
    <main className="bg-white text-gray-900">
      <SEO title="Spiritual Tour India — Complete Pilgrimage Circuit | Varanasi, Ayodhya, Prayagraj, Gaya" description="Book the ultimate spiritual tour of India with Varanasi SN Tour & Travels. Complete pilgrimage circuit: Varanasi (Kashi Vishwanath), Ayodhya (Ram Mandir), Prayagraj (Sangam), Gaya, Vindhyachal. From ₹12,999." keywords="spiritual tour India, spiritual tour package, pilgrimage tour India, Hindu pilgrimage package, Kashi Ayodhya Prayagraj tour, spiritual circuit India, religious tour India, Char Dham UP tour, spiritual travel India" url="/spiritual-tour-india" schemaData={schemas} />

      {/* Hero */}
      <section className="relative bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&q=80&w=1600" alt="Spiritual India — Ganga Aarti ceremony at Varanasi ghats" className="w-full h-full object-cover opacity-35" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 block">Complete Pilgrimage Circuit</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Spiritual Tour India — Complete Pilgrimage Circuit</h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">Embark on the ultimate spiritual journey across India's most sacred destinations — Varanasi, Ayodhya, Prayagraj, Gaya, and beyond. Experience divine darshans, holy rituals, and soul-enriching experiences expertly organized by Varanasi SN Tour & Travels.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919120073105?text=Hi%2C%20I%20want%20to%20book%20spiritual%20tour%20package" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">WhatsApp — Plan My Pilgrimage</a>
            <Link to="/enquire-now" className="bg-[#ff9933] hover:brightness-110 text-[#1c2011] font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">Get Free Itinerary →</Link>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* Destinations */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Sacred Destinations</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Your Spiritual Journey Covers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🛕', title: 'Varanasi — Kashi', desc: 'The spiritual capital of India. Kashi Vishwanath darshan, Ganga Aarti, sunrise boat ride, Sarnath, and 84 ghats. The starting point of every great pilgrimage.', link: '/varanasi-tour-package' },
              { icon: '🏛️', title: 'Ayodhya — Ram Janmabhoomi', desc: 'Visit the magnificent Ram Mandir, Hanuman Garhi, Saryu Ghat, and Kanak Bhavan. The birthplace of Lord Ram is now India\'s grandest temple complex.', link: '/ayodhya-tour-package' },
              { icon: '🌊', title: 'Prayagraj — Triveni Sangam', desc: 'Holy dip at the sacred confluence of Ganga, Yamuna, and Saraswati. Visit Allahabad Fort, Hanuman Mandir, and Anand Bhavan.', link: '/prayagraj-tour-package' },
              { icon: '☸️', title: 'Gaya & Bodh Gaya', desc: 'Perform Pind Daan for ancestors at Gaya. Visit the Mahabodhi Temple (UNESCO) where Lord Buddha attained enlightenment under the Bodhi Tree.' },
              { icon: '🙏', title: 'Vindhyachal', desc: 'Visit the ancient Vindhyavasini Devi Temple, one of the Shakti Peethas. Also visit Kali Khoh and Ashtabhuja Temple in this powerful Devi circuit.' },
              { icon: '🏔️', title: 'Nepal (Optional)', desc: 'Extend to Pashupatinath Temple and Lumbini (Buddha\'s birthplace). No visa needed for Indian citizens. Complete your spiritual circle across borders.', link: '/nepal-tour-package' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.desc}</p>
                {item.link && <Link to={item.link} className="text-[#ff9933] text-sm font-medium hover:underline">View Package →</Link>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Sample Itinerary</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">7-Day Spiritual Circuit Itinerary</h2>
          </div>
          {[
            { day: 'Day 1–2', title: 'Varanasi — Kashi Darshan', items: ['Arrive Varanasi, hotel check-in', 'Evening Ganga Aarti at Dashashwamedh Ghat', 'Day 2: Kashi Vishwanath VIP darshan', 'Sunrise boat ride, temple circuit', 'Sarnath visit (Buddha\'s first sermon)'] },
            { day: 'Day 3', title: 'Varanasi → Prayagraj', items: ['Drive to Prayagraj (2.5 hours)', 'Triveni Sangam holy dip + boat ride', 'Allahabad Fort, Akshayavat darshan', 'Hanuman Mandir, Anand Bhavan', 'Overnight stay in Prayagraj'] },
            { day: 'Day 4', title: 'Prayagraj → Ayodhya', items: ['Drive to Ayodhya (4 hours)', 'Ram Mandir darshan', 'Hanuman Garhi Temple', 'Saryu Ghat evening aarti', 'Overnight stay in Ayodhya'] },
            { day: 'Day 5–6', title: 'Ayodhya → Gaya/Bodh Gaya', items: ['Drive to Gaya (6 hours)', 'Pind Daan rituals at Gaya', 'Vishnupad Temple darshan', 'Bodh Gaya — Mahabodhi Temple', 'Bodhi Tree meditation', 'Overnight stay'] },
            { day: 'Day 7', title: 'Return to Varanasi', items: ['Drive back to Varanasi (5 hours)', 'Evening free for shopping', 'Banarasi silk, rudraksha, souvenirs', 'Airport/station drop', 'Tour concludes'] },
          ].map((day, i) => (
            <div key={i} className="mb-8 last:mb-0">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-[#ff9933] text-white text-xs font-bold px-3 py-1.5 rounded-full">{day.day}</span>
                <h3 className="font-serif text-xl font-semibold text-gray-900">{day.title}</h3>
              </div>
              <ul className="space-y-2 pl-16">
                {day.items.map((item, j) => (
                  <li key={j} className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-[#ff9933] mt-0.5 flex-shrink-0">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light">Spiritual Tour Package Prices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Mini Circuit', price: '₹12,999', duration: '5 Days / 4 Nights', features: ['Varanasi + Prayagraj + Ayodhya', 'AC sedan transport', '3-Star hotels', 'Breakfast included', 'Temple darshan assistance', 'Professional guide'] },
              { name: 'Grand Circuit', price: '₹19,999', duration: '7 Days / 6 Nights', features: ['Varanasi + Prayagraj + Ayodhya + Gaya', 'AC Innova transport', '4-Star hotels', 'All meals included', 'VIP darshan Kashi Vishwanath', 'Pind Daan arrangement at Gaya', 'Personal guide throughout'], popular: true },
              { name: 'Ultimate Spiritual', price: '₹32,999', duration: '10 Days / 9 Nights', features: ['Full circuit + Nepal', 'Pashupatinath + Lumbini', 'AC transport + Nepal vehicle', 'Luxury hotels', 'All meals + snacks', 'VIP darshan everywhere', 'All pujas arranged', 'Dedicated guide'] },
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
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto prose prose-gray prose-lg">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-6">Why Choose a Spiritual Tour of India?</h2>
          <p>India is the birthplace of four major world religions — Hinduism, Buddhism, Jainism, and Sikhism — making it the ultimate destination for spiritual tourism. The state of <strong>Uttar Pradesh</strong> alone contains some of the most sacred sites in the world: <strong>Varanasi</strong> (the oldest living city), <strong>Ayodhya</strong> (birthplace of Lord Ram), <strong>Prayagraj</strong> (Triveni Sangam), and <strong>Mathura-Vrindavan</strong> (birthplace of Lord Krishna).</p>
          <p><strong>Varanasi SN Tour & Travels</strong> is uniquely positioned to offer the best <strong>spiritual tour packages in India</strong>. Based in Varanasi — the spiritual capital — we have deep knowledge of every temple, ritual, and sacred tradition. Our guides are not just tour operators but devotees who understand the spiritual significance of each destination.</p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">The Sacred Geography of Our Tours</h3>
          <p>Our spiritual tours follow the ancient pilgrimage routes that have been traveled by devotees for thousands of years. Each destination adds a unique dimension to your spiritual journey:</p>
          <ul className="space-y-2 text-gray-600">
            <li><strong>Varanasi (Moksha):</strong> Liberation from the cycle of birth and death. A dip in the Ganga and darshan at Kashi Vishwanath is believed to grant moksha.</li>
            <li><strong>Prayagraj (Purification):</strong> The Triveni Sangam is the ultimate purification site. Bathing here during Kumbh Mela is considered the highest form of spiritual cleansing.</li>
            <li><strong>Ayodhya (Devotion):</strong> The birthplace of Lord Ram represents the ideal of dharma, devotion, and righteous living.</li>
            <li><strong>Gaya (Ancestral Peace):</strong> Pind Daan at Gaya gives peace to departed ancestors — a sacred duty in Hindu tradition.</li>
            <li><strong>Bodh Gaya (Enlightenment):</strong> Where Siddhartha Gautama became the Buddha — representing the ultimate spiritual awakening.</li>
          </ul>
        </div>
      </section>

      <TestimonialsSection title="Spiritual Tour Reviews" />
      <FAQSection faqs={faqs} title="Spiritual Tour India — FAQ" />
      <CTASection heading="Plan Your Spiritual Journey Today" subheading="Let Varanasi SN Tour & Travels create your perfect pilgrimage itinerary. Every detail handled — you focus on your spiritual experience." />

      {/* Internal Links */}
      <section className="py-12 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-light text-center mb-8">Explore Individual Packages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ to: '/varanasi-tour-package', label: 'Varanasi Tour Package' }, { to: '/ayodhya-tour-package', label: 'Ayodhya Tour Package' }, { to: '/prayagraj-tour-package', label: 'Prayagraj Tour Package' }, { to: '/kashi-vishwanath-tour', label: 'Kashi Vishwanath Tour' }, { to: '/nepal-tour-package', label: 'Nepal Tour Package' }, { to: '/varanasi-taxi-service', label: 'Taxi Service' }, { to: '/varanasi-travel-agency', label: 'About Us' }, { to: '/blog', label: 'Travel Blog' }].map((l, i) => (<Link key={i} to={l.to} className="text-sm text-gray-600 hover:text-[#ff9933] transition-colors py-2 border-b border-gray-100 hover:border-[#ff9933]">{l.label} →</Link>))}
          </div>
        </div>
      </section>
    </main>
  );
}
