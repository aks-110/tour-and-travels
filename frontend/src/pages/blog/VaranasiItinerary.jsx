import { Link } from 'react-router-dom';
import BlogLayout from './BlogLayout';
import FAQSection from '../../components/FAQSection';
import { blogPosts } from './blogData';

export default function VaranasiItinerary() {
  const postInfo = blogPosts.find(p => p.id === '2-day-varanasi-itinerary');
  const relatedPosts = blogPosts.filter(p => ['best-places-to-visit-in-varanasi', 'ganga-aarti-complete-guide', 'best-time-to-visit-varanasi'].includes(p.id));

  const faqs = [
    { question: 'Is 2 days really enough for Varanasi?', answer: 'While you can spend a lifetime exploring the spiritual depths of Kashi, 48 hours is enough to cover the "must-do" highlights: Kashi Vishwanath darshan, Ganga Aarti, a sunrise boat ride, and Sarnath.' },
    { question: 'Do I need a guide for this itinerary?', answer: 'A local guide is highly recommended. The ancient alleys of Varanasi are a labyrinth. A guide will save you from getting lost, protect you from scams, and explain the profound history and mythology behind every site.' },
    { question: 'How do I get around the city?', answer: 'For the old city (ghats and temples), walking is the only way. For longer distances like Sarnath, BHU, or the airport, you should hire an AC taxi or an auto-rickshaw.' }
  ];

  return (
    <BlogLayout
      title={postInfo.title}
      description={postInfo.excerpt}
      keywords="Varanasi itinerary, 2 days in Varanasi, what to do in Varanasi in 2 days, short trip to Varanasi, Banaras weekend trip"
      url={postInfo.url}
      publishDate={postInfo.date}
      heroImage={postInfo.image}
      category={postInfo.category}
      readingTime={postInfo.readingTime}
      relatedPosts={relatedPosts}
    >
      <p>Planning a short trip to the spiritual capital of India? Varanasi can be overwhelming for first-timers. The chaotic streets, the maze-like alleys, and the sheer intensity of the spiritual activities require a bit of planning.</p>
      
      <p>If you only have 48 hours, here is the perfect, optimized <strong>2-Day Varanasi Itinerary</strong> designed by the local experts at Varanasi SN Tour & Travels. This plan ensures you hit all the major highlights without feeling completely burnt out.</p>

      <h2>Day 1: The Heart of Kashi</h2>
      
      <h3>Morning (6:00 AM - 10:00 AM): Sunrise and the Old City</h3>
      <ul>
        <li><strong>6:00 AM — Sunrise Boat Ride:</strong> Start your trip with the most iconic Varanasi experience. Hire a boat from Dashashwamedh Ghat or Assi Ghat. Watching the first rays of the sun illuminate the 84 ghats is magical.</li>
        <li><strong>7:30 AM — Ghat Walk:</strong> Get off the boat at Manikarnika Ghat (the burning ghat) and walk back towards Dashashwamedh. Observe the morning rituals, yogis, and the incredible architecture.</li>
        <li><strong>9:00 AM — Breakfast:</strong> Head to the old city alleys for a traditional Banarasi breakfast — Kachori Sabzi and fresh Jalebi, followed by Kulhad Chai.</li>
      </ul>

      <h3>Late Morning (10:00 AM - 1:00 PM): The Sacred Jyotirlinga</h3>
      <ul>
        <li><strong>10:30 AM — Kashi Vishwanath Temple:</strong> Walk through the new Kashi Dham Corridor to visit the golden temple. <em>Pro tip: <Link to="/kashi-vishwanath-tour">Book VIP darshan</Link> in advance to save time.</em></li>
        <li><strong>12:00 PM — Annapurna Temple & Kal Bhairav:</strong> Visit the nearby Goddess Annapurna temple, then take a rickshaw to the Kal Bhairav Temple (the guardian deity of Varanasi).</li>
      </ul>

      <h3>Afternoon (1:00 PM - 4:00 PM): Rest and Refuel</h3>
      <p>The afternoons in Varanasi can be exhausting. Have lunch at a good restaurant and return to your hotel for some rest. You'll need energy for the evening!</p>

      <h3>Evening (5:00 PM - 8:00 PM): The Grand Spectacle</h3>
      <ul>
        <li><strong>5:30 PM — Find your spot:</strong> Head to Dashashwamedh Ghat early. You can rent a chair on the ghat or book a seat on a boat facing the ghat for the best view.</li>
        <li><strong>6:30 PM — Ganga Aarti:</strong> Witness the spectacular 45-minute synchronized fire ceremony dedicated to the River Ganga, Lord Shiva, Surya (Sun), and Agni (Fire).</li>
        <li><strong>8:00 PM — Dinner:</strong> Try some local street food like Tamatar Chaat and conclude your day with the famous Banarasi Paan.</li>
      </ul>

      <h2>Day 2: Peace, Knowledge, and Culture</h2>

      <h3>Morning (8:00 AM - 1:00 PM): The Buddhist Connection</h3>
      <ul>
        <li><strong>9:00 AM — Drive to Sarnath:</strong> Hire a <Link to="/varanasi-taxi-service">local taxi</Link> and drive 10 km to Sarnath, where Lord Buddha gave his first sermon.</li>
        <li><strong>10:00 AM — Sarnath Sightseeing:</strong> The atmosphere here is completely peaceful, a sharp contrast to the ghats. Visit the massive Dhamek Stupa, the ruins of ancient monasteries, and the incredible Archaeological Museum (which houses India's national emblem, the Ashoka Lion Capital).</li>
        <li><strong>12:30 PM — Thai/Japanese Temples:</strong> Visit the beautiful modern monasteries built by Buddhist countries before heading back to the city.</li>
      </ul>

      <h3>Afternoon (2:00 PM - 5:00 PM): The Southern Circuit</h3>
      <ul>
        <li><strong>2:30 PM — Banaras Hindu University (BHU):</strong> Drive through this massive, green, and peaceful campus. Visit the New Vishwanath Temple (Birla Temple), which boasts the tallest temple tower in the world.</li>
        <li><strong>3:30 PM — Sankat Mochan & Tulsi Manas:</strong> Visit the famous Hanuman temple established by poet Tulsidas, and the nearby Tulsi Manas Temple, where the Ramcharitmanas was written.</li>
      </ul>

      <h3>Evening (5:00 PM - 8:00 PM): Shopping and Farewells</h3>
      <ul>
        <li><strong>5:00 PM — Assi Ghat:</strong> Spend your last evening at the relaxed Assi Ghat. Have a coffee at a riverside cafe.</li>
        <li><strong>6:30 PM — Silk Shopping:</strong> Varanasi is famous worldwide for its silk sarees. Head to the Godowlia or Chowk area to buy authentic Banarasi silk.</li>
        <li><strong>8:00 PM — Final Dinner:</strong> Enjoy a celebratory dinner before packing up for your departure the next day.</li>
      </ul>

      <h2>Make it Effortless</h2>
      <p>Does this sound like a lot to organize? It can be. To ensure you don't waste time haggling with boatmen or getting lost in alleys, check out our pre-arranged <Link to="/varanasi-tour-package">2-Day Varanasi Tour Package</Link>, which includes all transport, guides, boat rides, and VIP darshan tickets.</p>

      <FAQSection faqs={faqs} title="Varanasi Itinerary FAQ" />

    </BlogLayout>
  );
}
