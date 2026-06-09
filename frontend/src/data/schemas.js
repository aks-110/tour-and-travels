// ============================================================
// Centralized JSON-LD Schema Generators
// Varanasi SN Tour & Travels — Production SEO
// ============================================================

const SITE_URL = 'https://www.varanasisntours.com';
const BRAND = 'Varanasi SN Tour & Travels';
const LOGO = `${SITE_URL}/favicon.svg`;
const PHONE = '+919120073105';
const EMAIL = 'varanasisntourandtravels@gmail.com';

// ── Organization ─────────────────────────────────────────────
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    url: SITE_URL,
    logo: LOGO,
    description: 'Varanasi SN Tour & Travels is a trusted travel agency in Varanasi offering customized tour packages, taxi services, hotel bookings, and spiritual travel experiences across Uttar Pradesh and India.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.facebook.com/people/varanasi-sn-tour-travels/61590351614973/',
      'https://www.instagram.com/varanasi_sn_tour_travel',
    ],
  };
}

// ── TravelAgency + LocalBusiness ─────────────────────────────
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: BRAND,
    url: SITE_URL,
    logo: LOGO,
    image: LOGO,
    description: 'Trusted travel agency in Varanasi, Uttar Pradesh offering Varanasi tour packages, Ayodhya tours, Prayagraj tours, Kashi Vishwanath darshan, Nepal tour packages, taxi services, and customized spiritual travel experiences.',
    telephone: PHONE,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mahmoorganj, Nirala Nagar, Lane No.3',
      addressLocality: 'Varanasi',
      addressRegion: 'Uttar Pradesh',
      postalCode: '221010',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.3176,
      longitude: 83.0103,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '06:00',
      closes: '22:00',
    },
    priceRange: '₹₹',
    areaServed: [
      { '@type': 'City', name: 'Varanasi' },
      { '@type': 'City', name: 'Ayodhya' },
      { '@type': 'City', name: 'Prayagraj' },
      { '@type': 'City', name: 'Gaya' },
      { '@type': 'State', name: 'Uttar Pradesh' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tour Packages',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'TouristTrip', name: 'Varanasi Tour Package' } },
        { '@type': 'Offer', itemOffered: { '@type': 'TouristTrip', name: 'Ayodhya Tour Package' } },
        { '@type': 'Offer', itemOffered: { '@type': 'TouristTrip', name: 'Kashi Vishwanath Tour' } },
        { '@type': 'Offer', itemOffered: { '@type': 'TouristTrip', name: 'Nepal Tour Package' } },
      ],
    },
  };
}

// ── WebSite with SearchAction ────────────────────────────────
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/tour-packages?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// ── BreadcrumbList ───────────────────────────────────────────
export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

// ── FAQPage ──────────────────────────────────────────────────
export function getFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ── TouristTrip ──────────────────────────────────────────────
export function getTouristTripSchema({ name, description, image, url, price, duration, location }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    image,
    url: `${SITE_URL}${url}`,
    touristType: 'Pilgrimage',
    provider: {
      '@type': 'TravelAgency',
      name: BRAND,
      url: SITE_URL,
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    }),
    ...(duration && { itinerary: { '@type': 'ItemList', name: duration } }),
    ...(location && {
      touristDestination: {
        '@type': 'TouristDestination',
        name: location,
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Uttar Pradesh',
          addressCountry: 'IN',
        },
      },
    }),
  };
}

// ── Article (Blog) ───────────────────────────────────────────
export function getArticleSchema({ title, description, url, image, datePublished, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || LOGO,
    url: `${SITE_URL}${url}`,
    datePublished: datePublished || '2025-01-15',
    dateModified: dateModified || new Date().toISOString().split('T')[0],
    author: {
      '@type': 'Organization',
      name: BRAND,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND,
      logo: { '@type': 'ImageObject', url: LOGO },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${url}` },
  };
}
