import { Link } from 'react-router-dom';
import BlogLayout from './BlogLayout';
import FAQSection from '../../components/FAQSection';
import { blogPosts } from './blogData';

export default function TopGhatsVaranasi() {
  const postInfo = blogPosts.find(p => p.id === 'top-ghats-in-varanasi');
  const relatedPosts = blogPosts.filter(p => ['ganga-aarti-complete-guide', 'best-places-to-visit-in-varanasi', 'best-time-to-visit-varanasi'].includes(p.id));

  const faqs = [
    { question: 'How many ghats are there in Varanasi?', answer: 'There are exactly 84 ghats along the river Ganga in Varanasi. While you can walk across almost all of them, the best way to see them is via an early morning or sunset boat ride.' },
    { question: 'Which is the best ghat for taking a holy dip?', answer: 'Dashashwamedh Ghat and Assi Ghat are considered the best and safest for taking a holy dip, as they are well-maintained and have proper steps leading into the water.' },
    { question: 'Is photography allowed at the burning ghats?', answer: 'Photography is strictly prohibited at Manikarnika and Harishchandra ghats (the cremation ghats) out of respect for the deceased and their families. Please be respectful of local customs.' }
  ];

  return (
    <BlogLayout
      title={postInfo.title}
      description={postInfo.excerpt}
      keywords="Varanasi ghats, best ghats in Varanasi, Dashashwamedh Ghat, Assi Ghat, Manikarnika Ghat, Banaras ghats, Varanasi Ganga ghat"
      url={postInfo.url}
      publishDate={postInfo.date}
      heroImage={postInfo.image}
      category={postInfo.category}
      readingTime={postInfo.readingTime}
      relatedPosts={relatedPosts}
    >
      <p>The 84 ghats of Varanasi are the soul of the city. Stretching for miles along the western bank of the sacred river Ganga, these stone steps leading down to the water are where life and death play out in public view. Each ghat has its own legend, history, and unique atmosphere.</p>
      
      <p>While taking a <Link to="/varanasi-tour-package">boat ride along all 84 ghats</Link> is a must-do experience, here are the 10 most important ghats you must explore on foot.</p>

      <h2>1. Dashashwamedh Ghat</h2>
      <p>This is the most famous and spectacular ghat in Varanasi. Located close to the Kashi Vishwanath Temple, it is always bustling with pilgrims, priests, and tourists. It is famous for the grand <strong>Ganga Aarti</strong> performed every evening. According to mythology, Lord Brahma sacrificed ten horses here to welcome Lord Shiva.</p>

      <h2>2. Assi Ghat</h2>
      <p>Located at the southern end of the city, Assi Ghat is where the river Assi meets the Ganga. It is famous for the 'Subah-e-Banaras' — a beautiful morning ritual involving Vedic chanting, yoga, and classical music before dawn. It's a favorite spot for long-term travelers and students.</p>

      <h2>3. Manikarnika Ghat</h2>
      <p>The main cremation ghat of Varanasi. Hindus believe that being cremated here ensures <em>moksha</em> (liberation from the cycle of rebirth). The funeral pyres here burn 24/7, and it is a deeply profound place that reminds visitors of the impermanence of life.</p>

      <h2>4. Kedar Ghat</h2>
      <p>Named after Lord Shiva (Kedarnath), this ghat features a beautiful temple with red and white horizontal stripes. It is very popular among South Indian pilgrims and has a serene, less commercialized atmosphere compared to Dashashwamedh.</p>

      <h2>5. Chet Singh Ghat</h2>
      <p>This ghat is dominated by a massive, fortress-like palace built by Maharaja Chet Singh in the 18th century. It was the site of a fierce battle between the Maharaja and the British forces led by Warren Hastings in 1781.</p>

      <h2>6. Darbhanga Ghat</h2>
      <p>Visually, this is one of the most stunning ghats in Varanasi. It is dominated by the majestic Brijrama Palace (now a luxury hotel), built in the early 20th century by the royal family of Bihar. It is an excellent spot for photography.</p>

      <h2>7. Scindia Ghat</h2>
      <p>Located right next to Manikarnika Ghat, Scindia Ghat is famous for its partially submerged Shiva temple. The temple sank under its own weight during construction in the 19th century and has remained leaning in the water ever since.</p>

      <h2>8. Ahilyabai Ghat</h2>
      <p>Named after the great Maratha queen Ahilyabai Holkar of Indore, who contributed immensely to rebuilding the temples and ghats of Kashi in the 18th century. It is the first ghat named after a person.</p>

      <h2>9. Panchganga Ghat</h2>
      <p>As the name suggests, this ghat is believed to be the mythical meeting point of five rivers: Ganga, Yamuna, Saraswati, Kirana, and Dhutpapa. It is dominated by the impressive Alamgir Mosque, built by Emperor Aurangzeb over a destroyed Hindu temple.</p>

      <h2>10. Harishchandra Ghat</h2>
      <p>This is the second cremation ghat in Varanasi and is much older than Manikarnika. It is named after the legendary King Harishchandra, who once worked at this very ghat to uphold truth and righteousness.</p>

      <h2>How to Experience the Ghats</h2>
      <p>The best way to experience these ghats is by taking a sunrise boat ride. As the first rays of the sun hit the western banks, the ghats glow with a golden hue, and the city wakes up to morning prayers. To arrange a private boat ride and a guided walking tour of the ghats, check out our <Link to="/varanasi-tour-package">customized Varanasi packages</Link>.</p>

      <FAQSection faqs={faqs} title="Frequently Asked Questions About Varanasi Ghats" />

    </BlogLayout>
  );
}
