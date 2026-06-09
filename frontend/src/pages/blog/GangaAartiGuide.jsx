import { Link } from 'react-router-dom';
import BlogLayout from './BlogLayout';
import FAQSection from '../../components/FAQSection';
import { blogPosts } from './blogData';

export default function GangaAartiGuide() {
  const postInfo = blogPosts.find(p => p.id === 'ganga-aarti-complete-guide');
  const relatedPosts = blogPosts.filter(p => ['top-ghats-in-varanasi', 'best-places-to-visit-in-varanasi', '2-day-varanasi-itinerary'].includes(p.id));

  const faqs = [
    { question: 'What is the timing of Ganga Aarti in Varanasi?', answer: 'The Ganga Aarti starts around 6:30 PM in the summer and around 6:00 PM in the winter. It lasts for about 45 minutes. You should arrive at least an hour early to get a good spot.' },
    { question: 'Is there an entry fee for Ganga Aarti?', answer: 'No, witnessing the Ganga Aarti is completely free if you stand or sit on the ghat steps. However, if you want to watch it from a boat (which offers the best view), you have to pay the boatman.' },
    { question: 'Which ghat has the best Ganga Aarti?', answer: 'Dashashwamedh Ghat hosts the most grand and famous Ganga Aarti. A slightly quieter, but equally beautiful aarti also takes place daily at Assi Ghat.' }
  ];

  return (
    <BlogLayout
      title={postInfo.title}
      description={postInfo.excerpt}
      keywords="Ganga Aarti Varanasi, Varanasi Aarti timings, Dashashwamedh Ghat Aarti, Ganga Aarti boat ride, Banaras Aarti guide"
      url={postInfo.url}
      publishDate={postInfo.date}
      heroImage={postInfo.image}
      category={postInfo.category}
      readingTime={postInfo.readingTime}
      relatedPosts={relatedPosts}
    >
      <p>As the sun sets over the ancient city of Varanasi, a profound transformation takes place at the ghats. The chaotic noise of the day gives way to the rhythmic ringing of bells, the blowing of conch shells, and the mesmerizing glow of fire. This is the <strong>Ganga Aarti</strong> — the daily ritual of expressing gratitude to the holy river Ganga.</p>
      
      <p>If you are visiting Varanasi, witnessing this ceremony is an absolute must. Here is your complete guide to experiencing the Ganga Aarti at its best.</p>

      <h2>What is the Ganga Aarti?</h2>
      <p>In Hinduism, the river Ganga is not just a body of water; she is revered as a living Goddess (Ganga Mata) who descended from heaven to earth to wash away the sins of humanity. The Aarti is a devotional ritual where fire (via large brass lamps) is offered to the Goddess, along with flowers, incense, and chanting.</p>
      <p>The ritual is performed by a group of young pandits (priests) dressed in traditional silk dhotis and kurtas. Their movements are perfectly synchronized, creating a highly choreographed and deeply spiritual spectacle.</p>

      <h2>Where does the Aarti take place?</h2>
      <p>While small aartis happen at various ghats, there are two main locations you should consider:</p>

      <h3>1. Dashashwamedh Ghat (The Grand Aarti)</h3>
      <p>This is the main, world-famous Ganga Aarti. It is organized by the Ganga Seva Nidhi and the Gangotri Seva Samiti. The scale here is massive. Several priests perform the aarti simultaneously on elevated wooden platforms under umbrella-like canopies. The atmosphere is electric, charged with the energy of thousands of devotees clapping and singing along.</p>

      <h3>2. Assi Ghat (The Serene Aarti)</h3>
      <p>Located at the southern end of the city, the aarti at Assi Ghat is slightly smaller but much more intimate and peaceful. Assi Ghat is also famous for its morning aarti (Subah-e-Banaras), which takes place before sunrise.</p>

      <h2>Timings: When to go?</h2>
      <p>The timing of the Aarti changes slightly depending on the season, as it must coincide with the sunset.</p>
      <ul>
        <li><strong>Summer Timings:</strong> Usually begins around 6:30 PM to 7:00 PM.</li>
        <li><strong>Winter Timings:</strong> Usually begins earlier, around 6:00 PM.</li>
      </ul>
      <p><strong>Crucial Tip:</strong> If you want a seat on the stairs of Dashashwamedh Ghat, you must arrive by 5:00 PM. The ghat fills up incredibly fast.</p>

      <h2>How to Get the Best View</h2>
      <p>You have three main options for viewing the aarti:</p>
      
      <h3>1. From the Ghat Steps (Free)</h3>
      <p>You can sit on the stairs directly behind or beside the priests. This gets you very close to the action and the music, but it gets extremely crowded. Arrive very early.</p>

      <h3>2. From the Balconies/Terraces (Paid)</h3>
      <p>Several shops, guesthouses, and temples located directly behind the ghat rent out their terrace or balcony space. This offers an elevated, uncrowded view of the entire spectacle.</p>

      <h3>3. From a Boat on the River (Highly Recommended)</h3>
      <p>The absolute best way to watch the Ganga Aarti is from a boat anchored in the river, facing the ghat. You get a panoramic view of all the priests facing you, the beautifully lit ghat, and the reflection of the fire in the dark waters of the Ganga.</p>
      <p>Boats charge a premium during aarti time. If you book our <Link to="/varanasi-tour-package">Varanasi Tour Package</Link>, a private boat ride for the evening aarti is included, ensuring you get the best spot without having to haggle with boatmen.</p>

      <h2>The Ritual Sequence</h2>
      <p>The 45-minute ceremony follows a specific sequence:</p>
      <ol>
        <li>It begins with the blowing of the <strong>Shankh (conch shell)</strong>, which is believed to purify the environment and signal the start of the divine ritual.</li>
        <li>The priests then wave <strong>incense sticks (agarbatti)</strong> in elaborate circular motions.</li>
        <li>Next, they use the multi-tiered, heavy <strong>brass lamps (deepams)</strong> filled with camphor. This is the most visually spectacular part of the ceremony.</li>
        <li>Finally, <strong>peacock feathers</strong> and a <strong>yak-tail fan (chawar)</strong> are waved, symbolizing deep respect and royalty towards the Goddess.</li>
      </ol>

      <h2>Conclusion</h2>
      <p>The Ganga Aarti is not just a visual spectacle; it is a profound spiritual experience that has been happening daily for years. As the ceremony concludes, thousands of small leaf-bowls containing flowers and a lit candle (diyas) are floated down the dark river by devotees, carrying their prayers into the night.</p>

      <FAQSection faqs={faqs} title="Ganga Aarti FAQ" />

    </BlogLayout>
  );
}
