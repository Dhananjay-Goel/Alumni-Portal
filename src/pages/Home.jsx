import React, {useContext, useState, useEffect} from 'react'
import StateContext from '../StateContext.js';
import NewsUpdate from "../components/NewsUpdate";
import BecomeMember from '../components/BecomeMember';
import TextSlider from '../components/TextSlider';
import { useNavigate  } from 'react-router-dom';
import image1 from '.././assets/a4.jpg'
import image4 from '.././assets/a4.jpeg'
import image3 from '.././assets/fund6.png'
import {motion} from 'framer-motion'
import {db} from "../firebase.js";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import ProfMessageAdmin from './ProfMessageAdmin.jsx';


const Home = () => {
    const navigate = useNavigate(); 
    // const { isAdmin, setIsAdmin } = useContext(StateContext);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
      return localStorage.getItem("userId") !== null;
    });
    const Slides = [
        {
          url:image3,
        },
        {
            url:image1,
        },
        {
            url:image4,
        },
      ];

      const [currentIndex, setCurrentIndex] = useState(0);
      const [nextIndex, setNextIndex] = useState(1);

      const prevSlide = () => {
        const newIndex = currentIndex === 0 ? Slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setNextIndex(newIndex === 0 ? Slides.length - 1 : newIndex - 1);
      };
    
      const nextSlide = () => {
        const newIndex = currentIndex === Slides.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setNextIndex(newIndex === Slides.length - 1 ? 0 : newIndex + 1);
      };
    
      const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
        setNextIndex(slideIndex === Slides.length - 1 ? 0 : slideIndex + 1);
      };
    
      useEffect(() => {
        const interval = setInterval(() => {
          nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const isAdmin = localStorage.getItem("isAdmin");
    console.log(isAdmin);
    // console.log(isAdmin);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchProfessorMessages = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'professorMessages'));
                const data = snapshot.docs.map((doc) => ({
                    image: doc.data().ImageUrl,
                    heading: doc.data().Heading,
                    body: doc.data().Description,
                    author: doc.data().Author,
                  }));
                setSlides(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching professor messages:', error);
            }
        };
        fetchProfessorMessages();
    }, []);

    const handleNewsClick = () => {
        navigate('/news');
    };
    // const slides = [
    //     {
    //         image: '/images/director.jpeg',
    //         heading: 'Message from Prof. Rajeev Ahuja',
    //         body: 'The Institute is committed to create an ambience for nurturing innovation, creativity and excellence within its students. We, at IIT Ropar, strongly support interdisciplinary research and development for the benefit of Industry and Society.\n\nWe emphasise on developing all round leadership skills. We are proud to say that the Institute is ideally placed to exploit the synergy within the engineering and science departments at the Institute. In doing so, we believe the Institute will continue to create unique and novel programmes to make significant contributions to Science and Technology as a domain. We are confident that all our efforts will grow into significant epitomes of achievements in the larger academic parlance. Hopefully, our labors in all the major areas of science and technology will produce fruitful results in academic innovation, top-tier journal publications, citations and technology developments.',
    //         author: 'Author 1',
    //     },
    //     {
    //         image: '/images/puneet_sir.jpeg',
    //         heading: 'Message from Dr. Puneet Goyal',
    //         body: 'The Institute is committed to create an ambience for nurturing innovation, creativity and excellence within its students. We, at IIT Ropar, strongly support interdisciplinary research and development for the benefit of Industry and Society.\n\nWe emphasise on developing all round leadership skills. We are proud to say that the Institute is ideally placed to exploit the synergy within the engineering and science departments at the Institute. In doing so, we believe the Institute will continue to create unique and novel programmes to make significant contributions to Science and Technology as a domain. We are confident that all our efforts will grow into significant epitomes of achievements in the larger academic parlance. Hopefully, our labors in all the major areas of science and technology will produce fruitful results in academic innovation, top-tier journal publications, citations and technology developments.',
    //         author: 'Author 2',
    //     },
    //     {
    //         image: '/images/Sudarshan_sir.jpg',
    //         heading: 'Message from Dr. Sudarshan Iyenger',
    //         body: 'The Institute is committed to create an ambience for nurturing innovation, creativity and excellence within its students. We, at IIT Ropar, strongly support interdisciplinary research and development for the benefit of Industry and Society.\n\nWe emphasise on developing all round leadership skills. We are proud to say that the Institute is ideally placed to exploit the synergy within the engineering and science departments at the Institute. In doing so, we believe the Institute will continue to create unique and novel programmes to make significant contributions to Science and Technology as a domain. We are confident that all our efforts will grow into significant epitomes of achievements in the larger academic parlance. Hopefully, our labors in all the major areas of science and technology will produce fruitful results in academic innovation, top-tier journal publications, citations and technology developments.',
    //         author: 'Author 3',
    //     },
    //     // Add more slide objects as needed
    // ];
    
  return (
    <div className='ml-8 mr-8 mt-4'>
        <div className=' h-screen w-full m-auto py-16 px-4 group overflow-hidden'>
    <motion.div
      style={{ backgroundImage: `url(${Slides[currentIndex].url})` }}
      className='absolute top-[100px] left-0 w-full h-full bg-cover bg-center z-0'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='relative flex flex-col mt-[120px] justify-end items-center'>
      {isLoggedIn ? (
        <>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`text-[70px] ${currentIndex === 1 ? 'text-white' : 'text-black'} font-semibold mb-4 mt-10`}
            // className='text-[70px] text-black font-semibold mb-4 mt-10'
          >
            Welcome to Alumni Relations
          </motion.h1>
        </>
      ) : 
      <>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`text-[70px] ${currentIndex === 1 ? 'text-white' : 'text-black'} font-semibold mb-4`}
            // className='text-[70px] text-black font-semibold mb-4'
          >
            Welcome to Alumni Relations
          </motion.h1>
          <div className='flex justify-center items-center'>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className={`text-[25px] ${currentIndex === 1 ? 'text-white' : 'text-black'} mb-8 w-full whitespace-nowrap`}
              // className='text-[25px]  text-black mb-8 w-full whitespace-nowrap'
            >
              Register now and become a member of Alumni Association of IIT Ropar.
            </motion.p>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className={`text-[27px] ${currentIndex === 1 ? 'text-white' : 'text-black'} bg-transparent border-blue-900 border-[4px] rounded-full font-bold py-2 px-3`}
            // className='bg-transparent border-blue-900 border-[4px] rounded-full text-black text-[27px] font-bold py-2 px-3'
            onClick={() => { navigate('/signup') }}
          >
            Register Now
          </motion.button>
        </>
      }
    </div>

    </motion.div>
    <div className='flex top-4 justify-center py-2 z-10'>
      {Slides.map((slide, slideIndex) => (
        <div
          key={slideIndex}
          onClick={() => goToSlide(slideIndex)}
          className={`text-2xl cursor-pointer ${currentIndex === slideIndex ? 'text-blue-500' : 'text-gray-500'}`}
        >
          &bull;
        </div>
      ))}
    </div>
        </div>
        {/* <div className="">
            <BecomeMember /> 
        </div> */}
        <hr className="border-gray-300 my-8" />
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-4 mb-8 flex-grow">
                <div className="bg-white border-2 rounded-lg text-left p-4 h-full">
                    <h1 className="text-2xl font-bold mb-4 animate-bounce">Latest News Updates</h1>
                    <div className="space-y-4">
                        <NewsUpdate 
                        title="IIT-Ropar researchers discover rare metal in Sutlej" 
                        description="A team of researchers from the Indian Institute of Technology (IIT), Ropar has detected the presence of tantalum, a rare metal used in manufacturing of electronic components, in the Sutlej river sand in Punjab."
                        date="February 10, 2024"
                        />
                        <NewsUpdate 
                        title="IIT Ropar director Rajeev Ahuja gets additional charge of IIT-G" 
                        description="Amid controversy of illegal appointment of acting (officiating) director in IIT Guwahati and following Gauhati high court’s recent directive to remove acting director PK Iyer from the post."
                        date="February 9, 2024"
                        />
                    </div>
                    <div className="mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNewsClick}>
                            Read More News
                        </button>
                    </div>
                    <div>
                      {isAdmin==="true" ? (
                        <div className="flex mt-4">
                          <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                            onClick={() => navigate("/newsadmin")}
                          >
                            Edit News
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 md:pl-4 mb-8 flex-grow">
                <div className="bg-white border-2 rounded-lg text-left p-4 h-full">
                    <h1 className="text-2xl font-bold mb-4 animate-bounce mt-2" >Monthly Newsletters</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                        <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                            <img src="/images/images.jpg" alt="January 2024" className="object-cover w-full h-48" />
                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <h2 className="text-white font-bold text-lg">January 2024</h2>
                            </div>
                        </div>
                        <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                            <img src="/images/car1.jpg" alt="January 2024" className="object-cover w-full h-48" />
                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <h2 className="text-white font-bold text-lg">December 2023</h2>
                            </div>
                        </div>
                        <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                            <img src="/images/iit_ropar_front.jpg" alt="January 2024" className="object-cover w-full h-48" />
                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <h2 className="text-white font-bold text-lg">November 2023</h2>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[60px]">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNewsClick}>
                            Newsletter Archive
                        </button>
                    </div>
                    <div>
                      {isAdmin==="true" ? (
                        <div className="flex mt-4">
                          <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                            onClick={() => navigate("/newsadmin")}
                          >
                            Edit NewsLetters
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                </div>
            </div>
        </div>
        {/* <hr className="border-gray-300 my-8" /> */}
        {/* <Gallery/> */}
        {/* <hr className="border-gray-300 my-8" /> */}
        <div className='container mx-auto py-8 '>
          <TextSlider slides={slides} interval={5000} />
          {isAdmin==="true" ? (
            <div className="flex justify-center mt-4">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                onClick={() => navigate("/ProfMessageAdmin")}
              >
                Edit Professor Messages
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>


        
    </div>
  )
}

export default Home