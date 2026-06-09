import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import CTASection from '../../components/CTASection';
import { getArticleSchema, getBreadcrumbSchema } from '../../data/schemas';

export default function BlogLayout({ 
  title, 
  description, 
  keywords, 
  url, 
  author = "Varanasi SN Tour & Travels", 
  publishDate, 
  modifiedDate,
  heroImage,
  heroImageAlt,
  category = "Travel Guide",
  readingTime,
  children,
  relatedPosts = []
}) {
  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: title }
  ];

  const schemas = [
    getBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.to }))),
    getArticleSchema({
      headline: title,
      description: description,
      image: heroImage,
      authorName: author,
      datePublished: publishDate,
      dateModified: modifiedDate || publishDate,
      url: url
    })
  ];

  return (
    <main className="bg-white text-gray-900 pb-16">
      <SEO 
        title={`${title} | Travel Blog`}
        description={description}
        keywords={keywords}
        url={url}
        schemaData={schemas}
        type="article"
      />

      {/* Hero Section */}
      <section className="relative bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt={heroImageAlt || title} 
              className="w-full h-full object-cover opacity-40" 
              loading="eager" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          </div>
        )}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
            <span className="bg-[#ff9933] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{category}</span>
            {readingTime && <span className="text-white/80 text-sm flex items-center gap-1">⏱️ {readingTime} read</span>}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">{title}</h1>
          <div className="flex justify-center items-center gap-4 text-sm text-white/70">
            <span>By {author}</span>
            <span>•</span>
            <time dateTime={publishDate}>{new Date(publishDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* Article Body */}
      <article className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto py-12 md:py-16">
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-serif prose-headings:font-light prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-a:text-[#ff9933] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md">
          {children}
        </div>
      </article>

      {/* Share & Author Box */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto border-t border-b border-gray-100 py-8 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl border-2 border-[#ff9933]">
              ✍️
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-gray-900">{author}</h4>
              <p className="text-gray-500 text-sm">Local travel experts sharing insights about spiritual India.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Share:</span>
            <a href={`https://wa.me/?text=Check out this article: ${encodeURIComponent('https://www.varanasisntours.com' + url)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.varanasisntours.com' + url)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto mb-16">
          <h2 className="font-serif text-2xl font-light text-center mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post, i) => (
              <Link key={i} to={post.url} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-[#ff9933] text-xs font-bold uppercase tracking-wider mb-2">{post.category}</span>
                  <h3 className="font-serif text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#ff9933] transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mt-auto">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTASection 
        heading="Ready to Explore Varanasi?" 
        subheading="Let our local experts plan the perfect itinerary based on your interests. We offer customized tour packages and reliable taxi services." 
      />
    </main>
  );
}
