import { Link } from 'react-router-dom';
import BlogLayout from './BlogLayout';
import FAQSection from '../../components/FAQSection';
import { blogPosts } from './blogData';

export default function KashiVishwanathDarshan() {
  const postInfo = blogPosts.find(p => p.id === 'kashi-vishwanath-darshan-guide');
  const relatedPosts = blogPosts.filter(p => ['spiritual-tourism-in-india', 'best-places-to-visit-in-varanasi', 'ganga-aarti-complete-guide'].includes(p.id));

  const faqs = [
    { question: 'Is mobile phone allowed inside Kashi Vishwanath Temple?', answer: 'No, mobile phones, cameras, smartwatches, and all electronic items are strictly prohibited inside the temple premises. You must deposit them in the lockers available outside before joining the queue.' },
    { question: 'What is the dress code for Kashi Vishwanath Temple?', answer: 'Devotees are expected to wear modest traditional clothing. Men should ideally wear dhoti-kurta or full trousers with shirts. Women should wear sarees, salwar kameez, or long skirts. Shorts, sleeveless tops, and revealing clothes are not permitted.' },
    { question: 'How much does VIP darshan (Sugam Darshan) cost?', answer: 'The official Sugam Darshan ticket usually costs around ₹300-₹500 per person depending on the season, and it allows you to skip the regular queue. Prices for specific aartis like Mangala Aarti are higher. Our tour packages include assistance with these bookings.' }
  ];

  return (
    <BlogLayout
      title={postInfo.title}
      description={postInfo.excerpt}
      keywords="Kashi Vishwanath darshan, Kashi Vishwanath temple timings, VIP darshan Varanasi, Kashi Dham corridor, Mangala Aarti booking"
      url={postInfo.url}
      publishDate={postInfo.date}
      heroImage={postInfo.image}
      category={postInfo.category}
      readingTime={postInfo.readingTime}
      relatedPosts={relatedPosts}
    >
      <p>The Kashi Vishwanath Temple, dedicated to Lord Shiva, is the most sacred shrine in Varanasi and one of the twelve Jyotirlingas in India. For millions of Hindus, a visit to this temple and a holy dip in the adjacent river Ganga is the ultimate spiritual goal.</p>
      
      <p>With the recent inauguration of the magnificent <strong>Kashi Vishwanath Corridor (Kashi Dham)</strong>, the pilgrimage experience has been completely transformed. If you are planning a visit, here is a complete guide to ensure a smooth and peaceful darshan.</p>

      <h2>Temple Timings & Aarti Schedule</h2>
      <p>The temple is open every day, but the crowd density varies significantly depending on the time of day and the specific rituals (Aartis) taking place.</p>
      
      <ul>
        <li><strong>Mangala Aarti:</strong> 3:00 AM to 4:00 AM (Ticket required. This is the first aarti of the day and highly auspicious).</li>
        <li><strong>General Darshan:</strong> 4:00 AM to 11:00 AM</li>
        <li><strong>Bhog Aarti:</strong> 11:15 AM to 12:20 PM (Darshan closed during this time)</li>
        <li><strong>General Darshan:</strong> 12:20 PM to 7:00 PM</li>
        <li><strong>Sandhya Aarti:</strong> 7:00 PM to 8:15 PM (Darshan closed)</li>
        <li><strong>Shringara Aarti:</strong> 9:00 PM to 10:15 PM</li>
        <li><strong>Shayana Aarti:</strong> 10:30 PM to 11:00 PM (Temple closes after this)</li>
      </ul>

      <h2>The Kashi Vishwanath Corridor (Kashi Dham)</h2>
      <p>Previously, reaching the temple involved navigating through narrow, congested lanes. Today, the new Kashi Dham corridor directly connects the Ganga river (Lalita Ghat) to the temple complex via a massive 5-lakh-square-foot paved plaza.</p>
      <p>The corridor features clean walkways, resting areas, a museum, a spiritual library, and a food court. Devotees can now take a holy dip in the Ganga and walk straight up to the temple carrying the holy water to offer to the Shivalinga.</p>

      <h2>How to Get VIP Darshan (Sugam Darshan)</h2>
      <p>During peak seasons, the free general darshan queue can take anywhere from 2 to 4 hours. To save time and avoid exhaustion, you can opt for <strong>Sugam Darshan (VIP Darshan)</strong>.</p>
      <ul>
        <li>Tickets can be booked officially via the Shri Kashi Vishwanath Temple Trust website or at the help desks near the temple.</li>
        <li>Sugam Darshan provides a dedicated fast-track entry, reducing the waiting time to 15-30 minutes.</li>
        <li>If you book a <Link to="/kashi-vishwanath-tour">Kashi Vishwanath Tour Package</Link> with us, our local guides will arrange the tickets, navigate the complex, and ensure you have a hassle-free VIP experience.</li>
      </ul>

      <h2>Rules and Regulations</h2>
      <p>The temple has strict security protocols. Knowing them in advance will save you a lot of hassle:</p>
      <ul>
        <li><strong>Prohibited Items:</strong> Mobile phones, cameras, smartwatches, pens, lighters, matchboxes, and leather items (belts, wallets) are strictly banned inside.</li>
        <li><strong>Lockers:</strong> Free and paid locker facilities are available near the entrance gates where you can deposit your belongings.</li>
        <li><strong>ID Proof:</strong> Always carry a valid original ID proof (Aadhaar Card, Passport, or Voter ID). It is mandatory for entry, especially for ticketed aartis.</li>
        <li><strong>Dress Code:</strong> Modest clothing is required. Avoid shorts, sleeveless tops, and revealing clothes.</li>
      </ul>

      <h2>Best Time for Darshan</h2>
      <p>To avoid massive crowds, aim for the early morning slot right after the Mangala Aarti (around 4:30 AM to 5:30 AM) or late at night (around 9:30 PM). <strong>Mondays</strong> are considered Lord Shiva's day and are always extremely crowded. Avoid Mondays if you are short on time. The month of Shravan (July-August) and the festival of Maha Shivaratri see the highest footfalls of the year.</p>

      <h2>Plan Your Visit</h2>
      <p>Visiting Kashi Vishwanath is a profound experience, but the logistics can be overwhelming for first-timers. Let our experts handle the details. Check out our <Link to="/spiritual-tour-india">complete spiritual tour packages</Link> that include guided darshan, transport, and hotel bookings.</p>

      <FAQSection faqs={faqs} title="Kashi Vishwanath Darshan FAQ" />

    </BlogLayout>
  );
}
