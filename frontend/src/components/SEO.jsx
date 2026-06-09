import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Varanasi SN Tour & Travels';
const SITE_URL = 'https://www.varanasisntours.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_DESCRIPTION = 'Varanasi SN Tour & Travels offers premium Varanasi tours, Ayodhya trips, Prayagraj packages, Nepal tours, taxi services and customized spiritual travel experiences in Uttar Pradesh, India.';

export default function SEO({ 
  title, 
  description = DEFAULT_DESCRIPTION,
  keywords,
  url,
  image,
  type = 'website',
  schemaData,
  robots = 'index, follow',
  article,
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Best Tour Packages & Travel Agency in Varanasi`;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const ogImage = image || DEFAULT_OG_IMAGE;
  const robotsContent = noindex ? 'noindex, follow' : robots;

  // Support single schema or array of schemas
  const schemas = schemaData 
    ? (Array.isArray(schemaData) ? schemaData : [schemaData])
    : [];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content={robotsContent} />

      {/* Geo Meta Tags — Local SEO */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Varanasi" />
      <meta name="geo.position" content="25.3176;83.0103" />
      <meta name="ICBM" content="25.3176, 83.0103" />

      {/* Language */}
      <html lang="en" />
      <link rel="alternate" hrefLang="en-in" href={fullUrl} />
      <link rel="alternate" hrefLang="en" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Article-specific OG tags */}
      {article && article.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article && article.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article && article.author && (
        <meta property="article:author" content={article.author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
