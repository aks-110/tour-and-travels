import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import CTASection from '../../components/CTASection';
import { getBreadcrumbSchema, getOrganizationSchema } from '../../data/schemas';

import { blogPosts } from './blogData';

export default function BlogIndex() {
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Travel Blog' }];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.to }))),
    getOrganizationSchema()
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      <SEO 
        title="Varanasi Travel Blog — Guides, Tips & Spiritual Insights" 
        description="Read the latest travel guides, itineraries, and spiritual insights about Varanasi, Ayodhya, and North India from local experts at Varanasi SN Tour & Travels." 
        keywords="Varanasi travel blog, Varanasi guide, Kashi travel tips, Ayodhya travel guide, spiritual travel India blog" 
        url="/blog" 
        schemaData={schemas} 
      />

      {/* Hero */}
      <section className="bg-black text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&q=80&w=1600" alt="Varanasi sunrise" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-5xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Travel & Spiritual Blog</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">Insider tips, complete guides, and spiritual insights from the local experts at Varanasi SN Tour & Travels.</p>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* Featured Post (Latest) */}
      <section className="py-12 md:py-16">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
          <Link to={blogPosts[0].url} className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
            <div className="h-64 md:h-auto overflow-hidden relative">
              <img src={blogPosts[0].image} alt={blogPosts[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4 bg-[#ff9933] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Latest Article</div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="text-[#ff9933] font-semibold">{blogPosts[0].category}</span>
                <span>•</span>
                <span>{new Date(blogPosts[0].date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span>{blogPosts[0].readingTime} read</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#ff9933] transition-colors">{blogPosts[0].title}</h2>
              <p className="text-gray-600 text-base md:text-lg mb-6 line-clamp-3">{blogPosts[0].excerpt}</p>
              <span className="inline-flex items-center gap-2 font-bold text-[#1c2011] group-hover:text-[#ff9933] transition-colors">Read Full Article →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Grid of Posts */}
      <section className="pb-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link key={post.id} to={post.url} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                <div className="h-56 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full">{post.category}</div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{post.readingTime} read</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#ff9933] transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mt-auto">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Need a Custom Tour Package?" subheading="Read enough and ready to travel? Let us plan the perfect Varanasi trip for you." />
    </main>
  );
}
