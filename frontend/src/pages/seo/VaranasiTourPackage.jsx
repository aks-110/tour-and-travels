import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import FAQSection from '../../components/FAQSection';
import CTASection from '../../components/CTASection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { getBreadcrumbSchema, getFAQSchema, getTouristTripSchema, getLocalBusinessSchema } from '../../data/schemas';

const PAGE_DATA = {
  slug: '/varanasi-tour-package',
  title: 'Varanasi Tour Package — Best Kashi Tour Packages 2025',
  metaDescription: 'Book the best Varanasi tour package with Varanasi SN Tour & Travels. Explore Kashi Vishwanath, Ganga Aarti, Sarnath, and all major ghats. Affordable customized Varanasi tour packages from ₹2,999.',
  keywords: 'Varanasi tour package, Kashi tour package, Varanasi travel package, Varanasi trip package, Varanasi tourism package, best Varanasi tour, cheap Varanasi tour, Varanasi pilgrimage package, Varanasi darshan package, Varanasi tour cost',
  h1: 'Varanasi Tour Package — Experience the Spiritual Capital of India',
  breadcrumbs: [
    { label: 'Home', to: '/' },
    { label: 'Tour Packages', to: '/tour-packages' },
    { label: 'Varanasi Tour Package' },
  ],
  faqs: [
    { question: 'What is included in the Varanasi tour package?', answer: 'Our Varanasi tour packages typically include hotel accommodation, local sightseeing by AC vehicle, Kashi Vishwanath darshan assistance, Ganga Aarti viewing, boat ride on the Ganges, Sarnath visit, and meals as per the chosen plan. VIP darshan can be arranged on request.' },
    { question: 'How many days are ideal for a Varanasi tour?', answer: 'A 2-day Varanasi tour covers the major highlights including Kashi Vishwanath Temple, Ganga Aarti, major ghats, and Sarnath. For a more relaxed experience covering Ramnagar Fort, BHU, and day trips to Vindhyachal, we recommend 3-4 days.' },
    { question: 'What is the best time to visit Varanasi?', answer: 'October to March is the best time to visit Varanasi when the weather is pleasant (15°C-25°C). The winter months of November-February are ideal for comfortable sightseeing. Dev Deepawali in November and Maha Shivaratri in February/March are spectacular festivals to experience.' },
    { question: 'How much does a Varanasi tour package cost?', answer: 'Our Varanasi tour packages start from ₹2,999 per person for a 2-day budget tour. Premium packages with luxury hotels and VIP darshan range from ₹5,999 to ₹15,000 per person. Group discounts are available for parties of 5 or more.' },
    { question: 'Is Varanasi safe for solo female travelers?', answer: 'Yes, Varanasi is generally safe for solo female travelers, especially when traveling with a trusted agency like Varanasi SN Tour & Travels. We provide experienced guides who ensure safe navigation through the old city lanes and ghats. We recommend modest clothing when visiting temples.' },
    { question: 'Can you arrange VIP darshan at Kashi Vishwanath?', answer: 'Yes, Varanasi SN Tour & Travels specializes in VIP darshan arrangements at Kashi Vishwanath Temple. We help you skip the long queues and ensure a comfortable, hassle-free darshan experience. Contact us for VIP darshan availability and pricing.' },
  ],
};

export default function VaranasiTourPackage() {
  const schemas = [
    getBreadcrumbSchema(PAGE_DATA.breadcrumbs.map(b => ({ name: b.label, url: b.to }))),
    getFAQSchema(PAGE_DATA.faqs),
    getTouristTripSchema({
      name: 'Varanasi Tour Package',
      description: PAGE_DATA.metaDescription,
      url: PAGE_DATA.slug,
      price: '2999',
      duration: '2 Days / 1 Night',
      location: 'Varanasi, Uttar Pradesh',
    }),
    getLocalBusinessSchema(),
  ];

  return (
    <main className="bg-white text-gray-900">
      <SEO
        title={PAGE_DATA.title}
        description={PAGE_DATA.metaDescription}
        keywords={PAGE_DATA.keywords}
        url={PAGE_DATA.slug}
        schemaData={schemas}
      />

      {/* Hero */}
      <section className="relative bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://varanasiayodhya.com/images/varanasi-ghats-ganga-boats-evening.webp"
            alt="Varanasi ghats panoramic view along the Ganga river at sunset — Varanasi tour package"
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 block">
            Most Popular Package
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {PAGE_DATA.h1}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">
            Discover the ancient city of Varanasi with our expertly crafted tour packages. From the mesmerizing Ganga Aarti at Dashashwamedh Ghat to the sacred Kashi Vishwanath Temple, experience every spiritual highlight of Kashi with Varanasi SN Tour & Travels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919120073105?text=Hi%2C%20I%20want%20to%20book%20a%20Varanasi%20tour%20package" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">WhatsApp Us</a>
            <Link to="/enquire-now" className="bg-[#ff9933] hover:brightness-110 text-[#1c2011] font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">Get Free Quote →</Link>
          </div>
        </div>
      </section>

      <Breadcrumbs items={PAGE_DATA.breadcrumbs} />

      {/* Tour Highlights */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">What You'll Experience</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Varanasi Tour Package Highlights</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🛕', title: 'Kashi Vishwanath Darshan', desc: 'Visit the most sacred Jyotirlinga temple with our VIP darshan assistance. Skip queues and experience a peaceful, blessed darshan at the ancient Kashi Vishwanath Temple.' },
              { icon: '🪔', title: 'Ganga Aarti at Dashashwamedh Ghat', desc: 'Witness the world-famous Ganga Aarti ceremony performed every evening. Our boat ride option gives you the best view of this mesmerizing spiritual spectacle.' },
              { icon: '🚣', title: 'Sunrise Boat Ride', desc: 'Experience the magical sunrise over the ghats of Varanasi from a traditional wooden boat on the holy Ganga river. See all 84 ghats from the water.' },
              { icon: '🏛️', title: 'Sarnath Buddhist Site', desc: 'Visit the historic Sarnath where Lord Buddha gave his first sermon. Explore the Dhamek Stupa, Mulagandha Kuti Vihar, and the Sarnath Archaeological Museum.' },
              { icon: '🕉️', title: 'Temple Circuit', desc: 'Cover all major temples including Sankat Mochan, Durga Temple (Monkey Temple), Tulsi Manas Mandir, and the new Kashi Vishwanath Corridor (Kashi Dham).' },
              { icon: '🎭', title: 'Old City Heritage Walk', desc: 'Explore the ancient lanes of Varanasi with our expert guide. Discover hidden temples, famous Banarasi silk weaving centres, and the vibrant street food culture.' },
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

      {/* Itinerary Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Day-by-Day Plan</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Sample 3-Day Varanasi Tour Itinerary</h2>
          </div>
          {[
            { day: 'Day 1', title: 'Arrival & Evening Ganga Aarti', items: ['Arrive at Varanasi Airport/Railway Station — pickup by AC vehicle', 'Check-in to hotel, freshen up and rest', 'Evening visit to Dashashwamedh Ghat for the iconic Ganga Aarti ceremony', 'Optional: Boat ride during Aarti for panoramic views', 'Dinner and overnight stay at hotel'] },
            { day: 'Day 2', title: 'Kashi Vishwanath & Temple Circuit', items: ['Early morning sunrise boat ride on the Ganges', 'Visit Manikarnika Ghat and other historic ghats', 'Kashi Vishwanath Temple darshan (VIP available)', 'Kashi Vishwanath Corridor (Kashi Dham) exploration', 'Visit Annapurna Temple, Vishalakshi Temple, Kal Bhairav Temple', 'Afternoon: Sarnath excursion — Dhamek Stupa, Museum, Mulagandha Kuti Vihar', 'Evening: Free time for shopping (Banarasi silk, handicrafts)', 'Dinner and overnight stay'] },
            { day: 'Day 3', title: 'Heritage Tour & Departure', items: ['Morning visit to Sankat Mochan Temple (Hanuman Temple)', 'Durga Temple (Monkey Temple), Tulsi Manas Mandir', 'BHU campus and Vishwanath Temple inside BHU', 'Ramnagar Fort & Museum visit', 'Lunch and checkout', 'Drop at Varanasi Airport/Railway Station'] },
          ].map((day, i) => (
            <div key={i} className="mb-8 last:mb-0">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-[#ff9933] text-white text-xs font-bold px-3 py-1.5 rounded-full">{day.day}</span>
                <h3 className="font-serif text-xl font-semibold text-gray-900">{day.title}</h3>
              </div>
              <ul className="space-y-2 pl-16">
                {day.items.map((item, j) => (
                  <li key={j} className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-[#ff9933] mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">Transparent Pricing</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Varanasi Tour Package Prices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Budget', price: '₹2,999', duration: '2 Days / 1 Night', features: ['Standard AC hotel', 'AC sedan transport', 'Kashi Vishwanath darshan', 'Ganga Aarti visit', 'Sarnath excursion', 'Airport/Station pickup-drop'] },
              { name: 'Premium', price: '₹5,999', duration: '3 Days / 2 Nights', features: ['4-Star hotel', 'AC Innova transport', 'VIP Kashi Vishwanath darshan', 'Boat ride + Ganga Aarti', 'Full temple circuit', 'All meals included', 'Dedicated guide'], popular: true },
              { name: 'Luxury', price: '₹12,999', duration: '4 Days / 3 Nights', features: ['5-Star resort', 'AC Fortuner/Crysta', 'VIP darshan all temples', 'Private boat ride', 'Heritage walk', 'All meals + evening snacks', 'Personal guide + photographer'] },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 md:p-8 border ${plan.popular ? 'border-[#ff9933] shadow-lg shadow-[#ff9933]/10 relative' : 'border-gray-200 shadow-sm'} bg-white flex flex-col`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff9933] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</span>}
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">{plan.duration}</p>
                <p className="font-serif text-4xl font-bold text-gray-900 mb-1">{plan.price}</p>
                <p className="text-xs text-gray-400 mb-6">per person</p>
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link to="/enquire-now" className={`w-full text-center py-3 rounded-full font-bold text-sm transition-all ${plan.popular ? 'bg-[#ff9933] text-[#1c2011] hover:brightness-110' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                  Book This Package
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-6">* Prices are indicative and may vary based on season, hotel availability, and group size. Contact us for an exact quote.</p>
        </div>
      </section>

      {/* Content Section — SEO long-form */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto prose prose-gray prose-lg">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-6">Why Choose Varanasi SN Tour & Travels for Your Varanasi Tour Package?</h2>
          <p>Varanasi, also known as Kashi or Banaras, is the oldest living city in the world and the spiritual capital of India. Located on the banks of the sacred river Ganga in Uttar Pradesh, Varanasi attracts millions of pilgrims and tourists every year. Choosing the right <strong>Varanasi tour package</strong> can make the difference between a stressful trip and an unforgettable spiritual experience.</p>
          <p><strong>Varanasi SN Tour & Travels</strong> is a trusted, locally-operated travel agency based in Varanasi with deep knowledge of every temple, ghat, and hidden lane in the holy city. Our team of experienced guides has been serving pilgrims and tourists for years, ensuring 100% customer satisfaction on every tour.</p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">What Makes Our Varanasi Tour Packages Special?</h3>
          <p>Unlike generic tour operators, we are <strong>based in Varanasi</strong> and have intimate knowledge of the city. Here's what sets our Varanasi tour packages apart:</p>
          <ul className="space-y-2 text-gray-600">
            <li><strong>Local Expertise:</strong> Our guides are Varanasi natives who know every shortcut, every temple timing, and every hidden gem that mass-tourism agencies miss.</li>
            <li><strong>VIP Darshan Access:</strong> We specialize in arranging VIP darshan at Kashi Vishwanath Temple, saving you hours of waiting in queues.</li>
            <li><strong>Flexible Itineraries:</strong> Every Varanasi tour package is fully customizable. Add Ayodhya, Prayagraj, or Gaya to create your perfect spiritual circuit.</li>
            <li><strong>Safe Family Travel:</strong> We prioritize family safety with verified hotels, experienced drivers, and 24/7 support throughout your Varanasi tour.</li>
            <li><strong>Reasonable Pricing:</strong> As a local agency, we offer the most competitive Varanasi tour package prices without compromising on quality.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Top Places to Visit in Your Varanasi Tour Package</h3>
          <p>A well-planned Varanasi tour package should cover these essential attractions:</p>
          <ol className="space-y-2 text-gray-600">
            <li><strong>Kashi Vishwanath Temple:</strong> One of the twelve Jyotirlingas, this ancient Shiva temple is the most important pilgrimage site in Varanasi. The newly built Kashi Vishwanath Corridor (Kashi Dham) has transformed the temple precinct into a world-class pilgrimage destination.</li>
            <li><strong>Dashashwamedh Ghat:</strong> The main ghat of Varanasi where the spectacular Ganga Aarti ceremony takes place every evening. A must-see experience in any Varanasi tour.</li>
            <li><strong>Sarnath:</strong> Located 10 km from Varanasi, Sarnath is where Lord Buddha delivered his first sermon after attaining enlightenment. The Dhamek Stupa and Ashoka Pillar are UNESCO-worthy heritage sites.</li>
            <li><strong>Manikarnika Ghat:</strong> The most sacred cremation ghat in Hinduism, where the eternal flame has been burning for thousands of years.</li>
            <li><strong>Ramnagar Fort:</strong> An 18th-century Mughal-era fort across the Ganges that houses a museum with vintage cars, royal weapons, and antique artifacts.</li>
          </ol>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">Extend Your Varanasi Tour — Multi-City Packages</h3>
          <p>Many of our travelers combine their Varanasi tour with visits to nearby sacred cities. Our most popular extended packages include:</p>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/ayodhya-tour-package" className="text-[#ff9933] hover:underline font-medium">Varanasi + Ayodhya Tour Package</Link> — Visit the magnificent Ram Mandir in Ayodhya, just 4 hours from Varanasi.</li>
            <li><Link to="/prayagraj-tour-package" className="text-[#ff9933] hover:underline font-medium">Varanasi + Prayagraj Tour Package</Link> — Experience the sacred Triveni Sangam where three holy rivers meet.</li>
            <li><Link to="/kashi-vishwanath-tour" className="text-[#ff9933] hover:underline font-medium">Kashi Vishwanath Special Tour</Link> — Dedicated Kashi Vishwanath focused tour with VIP darshan.</li>
            <li><Link to="/spiritual-tour-india" className="text-[#ff9933] hover:underline font-medium">Complete Spiritual Circuit</Link> — Varanasi + Ayodhya + Prayagraj + Gaya full spiritual tour.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">How to Reach Varanasi</h3>
          <p>Varanasi is well connected to all major Indian cities:</p>
          <ul className="space-y-2 text-gray-600">
            <li><strong>By Air:</strong> Lal Bahadur Shastri International Airport (VNS) has direct flights from Delhi, Mumbai, Bangalore, Kolkata, and other major cities. Our <Link to="/varanasi-airport-taxi" className="text-[#ff9933] hover:underline font-medium">Varanasi airport taxi service</Link> provides hassle-free pickup.</li>
            <li><strong>By Train:</strong> Varanasi Junction (BSB) and Manduadih Station are the main railway stations with trains from all over India.</li>
            <li><strong>By Road:</strong> Well-connected via NH-2 (Grand Trunk Road) from Delhi, Lucknow, and Kolkata.</li>
          </ul>
        </div>
      </section>

      <TestimonialsSection title="What Our Varanasi Tour Travelers Say" />

      <FAQSection faqs={PAGE_DATA.faqs} title="Varanasi Tour Package — Frequently Asked Questions" />

      <CTASection
        heading="Book Your Varanasi Tour Package Today"
        subheading="Get a free customized Varanasi tour itinerary from Varanasi SN Tour & Travels. We respond within 2 hours with the best package for your group!"
      />

      {/* Internal Links */}
      <section className="py-12 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-light text-center mb-8">Explore More Tour Packages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { to: '/ayodhya-tour-package', label: 'Ayodhya Tour Package' },
              { to: '/prayagraj-tour-package', label: 'Prayagraj Tour Package' },
              { to: '/kashi-vishwanath-tour', label: 'Kashi Vishwanath Tour' },
              { to: '/nepal-tour-package', label: 'Nepal Tour Package' },
              { to: '/varanasi-taxi-service', label: 'Varanasi Taxi Service' },
              { to: '/varanasi-airport-taxi', label: 'Airport Taxi Service' },
              { to: '/spiritual-tour-india', label: 'Spiritual Tour India' },
              { to: '/varanasi-travel-agency', label: 'About Our Agency' },
            ].map((link, i) => (
              <Link key={i} to={link.to} className="text-sm text-gray-600 hover:text-[#ff9933] transition-colors py-2 border-b border-gray-100 hover:border-[#ff9933]">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
