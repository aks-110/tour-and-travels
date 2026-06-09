import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import FAQSection from '../../components/FAQSection';
import CTASection from '../../components/CTASection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { getBreadcrumbSchema, getFAQSchema, getLocalBusinessSchema } from '../../data/schemas';

const faqs = [
  { question: 'Where is Varanasi SN Tour & Travels located?', answer: 'Our office is located at Mahmoorganj, Nirala Nagar, Lane No.3, Varanasi, Uttar Pradesh 221010. However, we provide services across Varanasi, including airport/station pickups, hotel transfers, and comprehensive tour packages.' },
  { question: 'What services does your travel agency provide?', answer: 'We are a full-service travel agency providing: Customized tour packages (Varanasi, Ayodhya, Prayagraj, Gaya, Nepal), AC taxi and car rentals, airport/railway station transfers, hotel bookings, VIP temple darshan assistance, boat rides, and complete event/pilgrimage management.' },
  { question: 'Are you a registered travel agency in Varanasi?', answer: 'Yes, Varanasi SN Tour & Travels is a fully registered and licensed travel agency operating in Varanasi. We have years of experience serving thousands of satisfied tourists and pilgrims from across India and abroad.' },
  { question: 'Do you provide guides who speak languages other than Hindi?', answer: 'Yes, our professional local guides speak fluent Hindi and English. On special request (with prior booking), we can also arrange guides who speak regional Indian languages or foreign languages like Spanish, French, or Japanese.' },
  { question: 'How can I customize a tour package with your agency?', answer: 'Customizing a package is easy! Simply contact us via WhatsApp (+91 9120073105) or our enquiry form. Tell us your travel dates, number of people, places you want to visit, and your budget. Our travel experts will design a personalized itinerary for you within 2 hours.' },
  { question: 'Do you offer group tour discounts?', answer: 'Yes, we offer special discounted rates for large groups, corporate trips, school/college tours, and family gatherings. We have a fleet of Tempo Travellers and mini-buses to comfortably accommodate groups of any size.' },
];

export default function VaranasiTravelAgency() {
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'About Us' }];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.to }))),
    getFAQSchema(faqs),
    getLocalBusinessSchema(),
  ];

  return (
    <main className="bg-white text-gray-900">
      <SEO title="Best Travel Agency in Varanasi — Varanasi SN Tour & Travels" description="Varanasi SN Tour & Travels is the most trusted travel agency in Varanasi. Book custom tour packages, taxi services, and hotel bookings. 100% customer satisfaction." keywords="travel agency in Varanasi, best tour operator in Varanasi, Varanasi travel agent, tour company Varanasi, Banaras travel agency, local tour operator Varanasi, Varanasi SN Tour & Travels" url="/varanasi-travel-agency" schemaData={schemas} />

      {/* Hero */}
      <section className="relative bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1571536802807-3cab52656360?auto=format&fit=crop&q=80&w=1600" alt="Varanasi ghats and boats — Varanasi SN Tour & Travels" className="w-full h-full object-cover opacity-35" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 block">About Us</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Varanasi SN Tour & Travels — Your Trusted Local Travel Partner</h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">Experience the spiritual heart of India with Varanasi's most reliable travel agency. From customized tour packages to premium taxi services, we ensure your journey is safe, comfortable, and deeply memorable.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919120073105?text=Hi%2C%20I%20want%20to%20plan%20a%20trip" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">WhatsApp Us</a>
            <Link to="/enquire-now" className="bg-[#ff9933] hover:brightness-110 text-[#1c2011] font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">Contact Us →</Link>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* Why Choose Us */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Our Commitment</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Why We Are the Best Travel Agency in Varanasi</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📍', title: 'Local Expertise', desc: 'Born and based in Varanasi, we know every hidden lane, temple timing, and ghat. We offer authentic experiences that outside agencies simply cannot provide.' },
              { icon: '⭐', title: '100% Satisfaction', desc: 'Customer satisfaction is our top priority. Our glowing reviews are a testament to our dedication to making every trip perfect.' },
              { icon: '🚗', title: 'Premium Fleet', desc: 'We own and maintain a modern fleet of AC vehicles (Sedans, Innovas, Tempo Travellers) driven by professional, courteous chauffeurs.' },
              { icon: '🎫', title: 'VIP Darshan Access', desc: 'Skip the long queues. We specialize in arranging VIP darshan at Kashi Vishwanath and other major temples for a peaceful spiritual experience.' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden fees, no surprise charges. We offer competitive, upfront pricing for all our tour packages and taxi services.' },
              { icon: '🤝', title: '24/7 Support', desc: 'From the moment you arrive until your departure, our team is available round-the-clock to assist you with any needs or emergencies.' },
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

      {/* Services Overview */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light">Our Comprehensive Travel Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-[#ff9933]">Tour Packages</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">Expertly crafted itineraries covering the most sacred destinations. We handle everything from hotels to local transport and guides.</p>
              <ul className="space-y-3 mb-6">
                <li><Link to="/varanasi-tour-package" className="text-gray-700 hover:text-[#ff9933] flex items-center gap-2"><span className="text-[#ff9933]">→</span> Varanasi Local & Spiritual Tours</Link></li>
                <li><Link to="/ayodhya-tour-package" className="text-gray-700 hover:text-[#ff9933] flex items-center gap-2"><span className="text-[#ff9933]">→</span> Ayodhya Ram Mandir Tours</Link></li>
                <li><Link to="/prayagraj-tour-package" className="text-gray-700 hover:text-[#ff9933] flex items-center gap-2"><span className="text-[#ff9933]">→</span> Prayagraj Triveni Sangam Tours</Link></li>
                <li><Link to="/nepal-tour-package" className="text-gray-700 hover:text-[#ff9933] flex items-center gap-2"><span className="text-[#ff9933]">→</span> Nepal International Tours</Link></li>
              </ul>
              <Link to="/tour-packages" className="text-sm font-bold text-[#1c2011] hover:text-[#ff9933] uppercase tracking-wider">View All Packages →</Link>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-[#ff9933]">Transport & Logistics</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">Reliable, comfortable, and safe transportation services across Uttar Pradesh. Clean vehicles and verified professional drivers.</p>
              <ul className="space-y-3 mb-6">
                <li><Link to="/varanasi-airport-taxi" className="text-gray-700 hover:text-[#ff9933] flex items-center gap-2"><span className="text-[#ff9933]">→</span> 24/7 Airport & Railway Transfers</Link></li>
                <li><Link to="/varanasi-taxi-service" className="text-gray-700 hover:text-[#ff9933] flex items-center gap-2"><span className="text-[#ff9933]">→</span> Local Sightseeing Cabs</Link></li>
                <li><Link to="/car-rentals" className="text-gray-700 hover:text-[#ff9933] flex items-center gap-2"><span className="text-[#ff9933]">→</span> Outstation Car Rentals</Link></li>
                <li><Link to="/hotels" className="text-gray-700 hover:text-[#ff9933] flex items-center gap-2"><span className="text-[#ff9933]">→</span> Premium Hotel Bookings</Link></li>
              </ul>
              <Link to="/car-rentals" className="text-sm font-bold text-[#1c2011] hover:text-[#ff9933] uppercase tracking-wider">View Transport Services →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto prose prose-gray prose-lg">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-6">About Varanasi SN Tour & Travels</h2>
          <p>Founded with a passion for sharing the spiritual and cultural heritage of Kashi, <strong>Varanasi SN Tour & Travels</strong> has grown into the leading <strong>travel agency in Varanasi</strong>. We understand that visiting Varanasi is often a profound, once-in-a-lifetime spiritual journey for our clients. Our mission is to remove all logistical worries so you can focus entirely on your experience.</p>
          <p>Whether you need a simple <Link to="/varanasi-airport-taxi" className="text-[#ff9933] hover:underline font-medium">airport taxi</Link>, a guided <Link to="/kashi-vishwanath-tour" className="text-[#ff9933] hover:underline font-medium">Kashi Vishwanath darshan</Link>, or a comprehensive <Link to="/spiritual-tour-india" className="text-[#ff9933] hover:underline font-medium">spiritual tour across India</Link>, our dedicated team handles every detail with professionalism and care.</p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Our Local Advantage</h3>
          <p>As a local Varanasi tour operator, we possess an intimate understanding of the city's complex geography, traffic patterns, and temple protocols. We know exactly which ghat offers the best sunrise view, the optimal times to avoid crowds at major temples, and how to navigate the narrow ancient alleys safely.</p>
          
          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Contact Information</h3>
          <ul className="space-y-2 text-gray-600">
            <li><strong>Office Address:</strong> Mahmoorganj, Nirala Nagar, Lane No.3, Varanasi, UP, India - 221010</li>
            <li><strong>Phone:</strong> +91 9120073105 / +91 9335487124 / +91 8707482524</li>
            <li><strong>Email:</strong> varanasisntourandtravels@gmail.com</li>
            <li><strong>Business Hours:</strong> Monday - Sunday, 06:00 AM - 10:00 PM</li>
          </ul>
        </div>
      </section>

      <TestimonialsSection title="What Our Clients Say About Us" />
      <FAQSection faqs={faqs} title="Frequently Asked Questions" />
      <CTASection heading="Ready to Plan Your Trip?" subheading="Contact Varanasi SN Tour & Travels today. Let our experts create the perfect itinerary for your spiritual journey." />

    </main>
  );
}
