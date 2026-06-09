import { Link } from 'react-router-dom';
import BlogLayout from './BlogLayout';
import FAQSection from '../../components/FAQSection';
import { blogPosts } from './blogData';

export default function AyodhyaRamMandir() {
  const postInfo = blogPosts.find(p => p.id === 'ayodhya-ram-mandir-travel-guide');
  const relatedPosts = blogPosts.filter(p => ['spiritual-tourism-in-india', '2-day-varanasi-itinerary', 'kashi-vishwanath-darshan-guide'].includes(p.id));

  const faqs = [
    { question: 'How far is Ayodhya from Varanasi?', answer: 'Ayodhya is approximately 220 kilometers from Varanasi. The journey takes about 4 to 4.5 hours by road via NH 28 and NH 330. It is a very comfortable drive, making Ayodhya an ideal 1-day or 2-day excursion from Varanasi.' },
    { question: 'What are the darshan timings at Ram Mandir?', answer: 'The Ram Mandir is open for darshan in two shifts: Morning from 7:00 AM to 11:30 AM, and Afternoon/Evening from 2:00 PM to 7:00 PM. The temple is closed between 11:30 AM and 2:00 PM for Bhog and rest.' },
    { question: 'Can we visit Hanuman Garhi on the same day?', answer: 'Yes, absolutely! In fact, according to tradition, devotees must visit Hanuman Garhi to seek Lord Hanuman\'s permission before visiting the Ram Mandir. The two temples are located close to each other.' }
  ];

  return (
    <BlogLayout
      title={postInfo.title}
      description={postInfo.excerpt}
      keywords="Ayodhya Ram Mandir, Ram Janmabhoomi, Ayodhya travel guide, Varanasi to Ayodhya, Ayodhya tour, Ram Mandir darshan timings"
      url={postInfo.url}
      publishDate={postInfo.date}
      heroImage={postInfo.image}
      category={postInfo.category}
      readingTime={postInfo.readingTime}
      relatedPosts={relatedPosts}
    >
      <p>The inauguration of the grand Ram Mandir in Ayodhya has made it the epicenter of spiritual tourism in India. The birthplace of Lord Rama, Ayodhya holds immense significance in Hindu mythology. For travelers visiting Varanasi, an excursion to Ayodhya is now considered an essential part of the pilgrimage.</p>
      
      <p>If you are planning to visit the sacred city, here is a complete travel guide from the experts at Varanasi SN Tour & Travels.</p>

      <h2>How to Reach Ayodhya from Varanasi</h2>
      <p>Ayodhya is located about 220 km north of Varanasi. The newly constructed highways have made the journey smooth and comfortable.</p>
      <ul>
        <li><strong>By Road (Recommended):</strong> A <Link to="/varanasi-taxi-service">private taxi from Varanasi to Ayodhya</Link> takes about 4 to 4.5 hours. It is the most convenient option as it allows you to start early and control your schedule.</li>
        <li><strong>By Train:</strong> The Vande Bharat Express and several other trains connect Varanasi to Ayodhya. The journey takes around 3 hours, but availability can be an issue during peak seasons.</li>
      </ul>

      <h2>The Ram Mandir Darshan Experience</h2>
      <p>The magnificent Ram Mandir is built in the traditional Nagara style of architecture, using pink sandstone from Rajasthan. The idol of Ram Lalla (the child form of Lord Rama) resides in the main sanctum sanctorum.</p>
      
      <h3>Darshan Timings:</h3>
      <ul>
        <li><strong>Morning Shift:</strong> 7:00 AM to 11:30 AM</li>
        <li><strong>Evening Shift:</strong> 2:00 PM to 7:00 PM</li>
      </ul>
      <p><em>Note: The temple is closed for darshan between 11:30 AM and 2:00 PM.</em></p>

      <h3>Rules and Guidelines:</h3>
      <ul>
        <li>Mobile phones, electronic gadgets, leather belts, and bags are not allowed inside the temple premises. Free cloakrooms are available near the entrance.</li>
        <li>Dress modestly. Traditional Indian wear is highly recommended.</li>
        <li>Expect to walk. Wheelchair facilities are available for elderly and differently-abled devotees.</li>
      </ul>

      <h2>Other Must-Visit Places in Ayodhya</h2>
      <p>While the Ram Mandir is the main draw, Ayodhya has several other significant sites:</p>
      
      <h3>1. Hanuman Garhi</h3>
      <p>Located on a small hill accessible by 76 steps, this 10th-century temple is dedicated to Lord Hanuman. Tradition dictates that a pilgrim must visit Hanuman Garhi before going to the Ram Mandir to seek Lord Hanuman's blessing.</p>

      <h3>2. Kanak Bhavan</h3>
      <p>Believed to be a gift to Goddess Sita by Lord Rama's stepmother Kaikeyi, this is one of the finest temples in Ayodhya. The temple houses beautiful idols of Rama and Sita wearing golden crowns (Kanak).</p>

      <h3>3. Nageshwarnath Temple</h3>
      <p>According to legend, this temple was built by Kush, the son of Lord Rama. It is dedicated to Lord Shiva and is one of the oldest temples in Ayodhya that survived through the centuries.</p>

      <h3>4. Saryu Ghat (Ram Ki Paidi)</h3>
      <p>A series of beautiful ghats on the banks of the Saryu River. Taking a holy dip here is considered extremely auspicious. In the evening, the ghats light up for the beautiful Saryu River Aarti, a serene experience similar to the Ganga Aarti but less crowded.</p>

      <h2>Recommended Itinerary from Varanasi</h2>
      <p>For the best experience, we recommend booking a <Link to="/ayodhya-tour-package">1-Night/2-Day Ayodhya Package</Link>:</p>
      <ul>
        <li><strong>Day 1:</strong> Start from Varanasi at 8:00 AM. Reach Ayodhya by 12:30 PM. Check into your hotel. Post lunch, visit Hanuman Garhi and Kanak Bhavan. In the evening, witness the Saryu Aarti.</li>
        <li><strong>Day 2:</strong> Early morning darshan at Ram Mandir (7:00 AM). Enjoy a peaceful breakfast, explore local markets for souvenirs, and drive back to Varanasi by afternoon.</li>
      </ul>
      <p>Alternatively, if you are short on time, a same-day return trip is also possible if you start very early (around 5:00 AM) from Varanasi.</p>

      <FAQSection faqs={faqs} title="Ayodhya Travel FAQ" />

    </BlogLayout>
  );
}
