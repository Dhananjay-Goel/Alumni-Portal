import React, { useState , useEffect} from 'react';
import "./NewAndUpdates.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {db} from "../firebase.js";
import { collection, query, orderBy, getDocs } from 'firebase/firestore';


const NewsCard = ({ image, heading, description }) => {
  return (
    <div className="news-card">
      <img src={image} alt={heading} />
      <div className='news-card-text'>
        <h2>{heading}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

const NewsletterCard = ({ image, heading, drivelink}) => {
  return (
    <div className="newsletter-card">
      <a href={drivelink} target="_blank">
      <img src={image} alt={heading} />
      <div className='newsletter-card-text'>
        <h2>{heading}</h2>
      </div>
      </a>
    </div>
  );
};

// const newsItems = [
//   {
//     id: 1,
//     image: "/News_images/news1.jpg",
//     heading: "IIT-Ropar researchers discover rare metal in Sutlej",
//     description: "A team of researchers from the Indian Institute of Technology (IIT), Ropar has detected the presence of tantalum, a rare metal used in manufacturing of electronic components, in the Sutlej river sand in Punjab.The discovery was made by a team headed by Dr Resmi Sebastian, assistant professor at the institute’s Civil Engineering Department. The researchers were working on an unrelated project when they stumbled upon the metal in samples collected from the Sutlej basin, Dr Sebastian told The Indian Express."
//   },
//   {
//     id: 2,
//     image: "/News_images/news2.jpg",
//     heading: "IIT Ropar director Rajeev Ahuja gets additional charge of IIT-G",
//     description: "Amid controversy of illegal appointment of acting (officiating) director in IIT Guwahati and following Gauhati high court’s recent directive to remove acting director PK Iyer from the post, the education ministry has entrusted the additional charge of IIT Guwahati on Rajeev Ahuja, who is the current director of IIT Ropar.Ahuja will act as officiating director of IIT Guwahati till further orders, whichever is earlier The ministry requested the registrar (I/C) to take necessaryaction and send a confirmation to the ministry by Tuesday."
//   },
//   {
//     id: 3,
//     image: "/News_images/news3.webp",
//     heading: "DroneAcharya expands training reach with IIT Ropar, shares up",
//     description: "DroneAcharya Aerial Innovations Ltd’s shares were up by 1.22 per cent after the company announced its collaboration with IIT Ropar to launch its third Remote Pilot Training Organization (RPTO). With centres in Pune and Rashtriya Raksha University, Gujarat, the collaboration aims to address the demand for skilled drone professionals in Northern India. DroneAcharya has trained 564 DGCA-certified drone pilots. The company reported that it recently secured India’s largest government drone training project from the Karnataka Forest Department and has expansion plans with Tata Strive and Wollstone Capital to launch 30 new centres across India."
//   },
//   {
//     id: 4,
//     image: "/News_images/news4.jpg",
//     heading: "Kashmiri Startup, Wildfloc Adventures, Secures Seed Funding from IIT Ropar with KAN’s Support",
//     description: "Breaking new ground in Jammu and Kashmir’s entrepreneurial landscape, the Kashmir Angel Network (KAN) has announced the successful facilitation of seed funding for Wildfloc Adventures through a partnership with IIT Ropar. This undisclosed investment, a result of collaboration with the Wadhwani Foundation, signifies a significant leap forward not only for Wildfloc Adventures but also for the burgeoning startup ecosystem in the Kashmir region."
//   },
//   {
//     id: 5,
//     image: "/News_images/news5.webp",
//     heading: "IIT Ropar organises SAMRIDHI conclave on innovation in agriculture, water technology",
//     description: "The Indian Institute of Technology (IIT Ropar) is hosting the Deeptech Startup Accelerator programme, which aims at catalysing innovation in agriculture and water technology.The programme is being held under the SAMRIDHI (Strategic Acceleration for Market, Research, Innovation and Development: a Holistic Initiative for ICPS Startups) initiative of IIT Ropar’s iHub AwaDH. The iHub AwaDH was set up under the National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS)."
//   },
//   {
//     id: 6,
//     image: "/images/car1.jpg",
//     heading: "IIT-Ropar proposes Centre of Excellence on sand mining in Punjab",
//     description: "The Indian Institute of Technology (IIT), Ropar, has proposed a Centre of Excellence on socio-environmental sustainability for river sand mining in Punjab as the ruling Aam Aadmi Party (AAP) government in the state mulls a collaboration with the premiere institute of the Centre government on hot potato issue of sand mining, and alleged illegalities over it, in the State."
//   },
// ];

// const newsletterItems = [
//   {
//     id: 1,
//     image: "/images/images.jpg",
//     heading: "Feburary 2024",
//     driveLink: "https://www.iitrpr.ac.in/sites/default/files/Prajwalam%20Volume%2012%2C%20Issue%20III%2C%20August%202023.pdf"
//   },
//   {
//     id: 2,
//     image: "/images/car1.jpg",
//     heading: "January 2024",
//     driveLink: "https://www.iitrpr.ac.in/sites/default/files/Newsletter-1_compressed.pdf"
//   },
//   {
//     id: 3,
//     image: "/images/IIT_Front.webp",
//     heading: "December 2023",
//     driveLink: "https://www.iitrpr.ac.in/sites/default/files/IIT%20Ropar%20January%20Newsletter%202023.pdf"
//   },
//   {
//     id: 4,
//     image: "/images/download.jpg",
//     heading: "November 2023",
//     driveLink: "https://www.iitrpr.ac.in/sites/default/files/Prajwalam%20-%20Volume%2011%20-%20Issue%203%2C%20Nov%202022-compressed.pdf"
//   },
//   {
//     id: 5,
//     image: "/images/car1.jpg",
//     heading: "October 2023",
//     driveLink: "https://www.iitrpr.ac.in/sites/default/files/Prajwalam%20Volume%2011%2C%20Issue%202%2C%20July%202022.pdf"
//   },
//   {
//     id: 6,
//     image: "/images/images.jpg",
//     heading: "September 2023",
//     driveLink: "https://www.iitrpr.ac.in/sites/default/files/Prajwalam%2C%20Volume%2011%20Issue%201%20April%202022.pdf"
//   },
// ];

const NewAndUpdates = () => {

  const [currentDeck, setCurrentDeck] = useState(0);
  const cardsPerPage = 4;
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDeck2, setCurrentDeck2] = useState(0);
  const [newsletterItems, setNewsletterItems] = useState([]);
  const [loadingNewsletter, setLoadingNewsletter] = useState(true);

  useEffect(() => {
    const fetchNewsItems = async () => {
      const q = query(collection(db, 'NewsUpdates'), orderBy('id', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedNewsItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        image: doc.data().NewsUrl,
        heading: doc.data().Heading,
        description: doc.data().Description,
      }));
      setNewsItems(fetchedNewsItems);
      console.log(fetchNewsItems);
      setLoading(false);
    };
    fetchNewsItems();
  }, []);

  useEffect(() => {
    const fetchNewsletterItems = async () => {
      const q = query(collection(db, 'Newsletters'), orderBy('id', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedNewsletterItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        image: doc.data().ImageUrl,
        heading: doc.data().MonthYear,
        driveLink: doc.data().PdfUrl,
      }));
      setNewsletterItems(fetchedNewsletterItems);
      setLoadingNewsletter(false);
    };
    fetchNewsletterItems();
  }, []);

  if (loadingNewsletter || loading) {
    return <p>Loading...</p>;
  }
  console.log(newsletterItems);
  const totalDecks = Math.ceil(newsItems.length / cardsPerPage);

  const handleNextDeck = () => {
    setCurrentDeck((prevDeck) => Math.min(prevDeck + 1, totalDecks - 1));
  };

  const handlePrevDeck = () => {
    setCurrentDeck((prevDeck) => Math.max(prevDeck - 1, 0));
  };

  const startIdx = currentDeck * cardsPerPage;
  const endIdx = Math.min(startIdx + cardsPerPage, newsItems.length);
  const currentNews = newsItems.slice(startIdx, endIdx);

  const cardsPerPage2 = 3;
  const totalDecks2 = Math.ceil(newsletterItems.length / cardsPerPage2);

  const handleNextDeck2 = () => {
    setCurrentDeck2((prevDeck2) => Math.min(prevDeck2 + 1, totalDecks2 - 1));
  };

  const handlePrevDeck2 = () => {
    setCurrentDeck2((prevDeck2) => Math.max(prevDeck2 - 1, 0));
  };

  const startIdx2 = currentDeck2 * cardsPerPage2;
  const endIdx2 = Math.min(startIdx2 + cardsPerPage2, newsletterItems.length);
  const currentNewsletter = newsletterItems.slice(startIdx2, endIdx2);
  
  return (
    <div>
      <div>
        <div className='news-updates-heading'>
          <h1><FontAwesomeIcon icon={faNewspaper} /> News and Updates</h1>
        </div>
        <div className="news-cards">
          {currentNews.map((news) => (
            <NewsCard
              key={news.id}
              image={news.image}
              heading={news.heading}
              description={news.description}
            />
          ))}
        </div>
        <div className="news-cards-navigation-bar">
          <button onClick={handlePrevDeck} disabled={currentDeck === 0}>
            Prev
          </button>
          <span>{`${currentDeck + 1} / ${totalDecks}`}</span>
          <button onClick={handleNextDeck} disabled={currentDeck === totalDecks - 1}>
            Next
          </button>
        </div>
      </div>
      <div>
        <div className='news-letters-heading'>
          <h1><FontAwesomeIcon icon={faEnvelope} /> News Letters </h1>
        </div>
        <div className="newsletter-cards">
          {currentNewsletter.map((newsletter) => ( 
            <NewsletterCard
              key={newsletter.id}
              image={newsletter.image}
              heading={newsletter.heading}
              drivelink={newsletter.driveLink}
            />
          ))}
        </div>
        <div className="newsletter-cards-navigation-bar">
          <button onClick={handlePrevDeck2} disabled={currentDeck2 === 0}>
            Prev
          </button>
          <span>{`${currentDeck2 + 1} / ${totalDecks2}`}</span>
          <button onClick={handleNextDeck2} disabled={currentDeck2 === totalDecks2 - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewAndUpdates;
