const testimonials = [
  {
    text: "Varanasi SN Tour & Travels provided a truly exceptional experience. Their polite and friendly behavior made our family feel completely safe. They arranged VIP darshan at Kashi Vishwanath effortlessly. Highly recommended!",
    name: "Rajesh Sharma",
    from: "Mumbai",
    rating: 5,
  },
  {
    text: "The Gaya Pind Daan was perfectly organized. Varanasi SN Tour & Travels ensured all rituals were complete without any hassle. The hotels they booked were comfortable and the pricing was very reasonable.",
    name: "Suresh Kumar",
    from: "Delhi",
    rating: 5,
  },
  {
    text: "We went to Ayodhya Ram Mandir and Prayagraj Sangam. Varanasi SN Tour & Travels' knowledge of the sacred places is profound. Their dedication to 100% customer satisfaction is real.",
    name: "Anjali Gupta",
    from: "Bangalore",
    rating: 5,
  },
  {
    text: "Our trip to Kashi was magical thanks to Varanasi SN Tour & Travels. They know all the hidden gems and the best times to visit the ghats. The boat ride during Ganga Aarti was unforgettable.",
    name: "Priya Patel",
    from: "Ahmedabad",
    rating: 5,
  },
  {
    text: "Extremely professional service. From picking us up at the station to arranging local transport, everything was seamless. We didn't have to worry about a thing.",
    name: "Vikram Singh",
    from: "Jaipur",
    rating: 5,
  },
];

/**
 * Reusable testimonials section for landing pages.
 * Shows a compact grid of testimonials.
 */
export default function TestimonialsSection({ title = 'What Our Travelers Say', limit = 3 }) {
  const display = testimonials.slice(0, limit);
  return (
    <section className="py-16 md:py-20 bg-gray-50" aria-labelledby="testimonials-heading">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="text-center mb-10">
          <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">
            Testimonials
          </span>
          <h2 id="testimonials-heading" className="font-serif text-3xl md:text-4xl font-light text-gray-900">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {display.map((review, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex gap-0.5 text-[#ff9933] mb-3" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} aria-hidden="true">★</span>
                  ))}
                </div>
                <p className="text-gray-600 italic text-sm leading-relaxed mb-4">"{review.text}"</p>
              </div>
              <div>
                <p className="font-serif text-base font-medium text-gray-900">{review.name}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">From {review.from}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
