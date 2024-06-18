import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Gallery = () => {
    const slides=[
      { url: require('../assets/c1.jpeg'), alt: 'image1' },
      { url: require('../assets/c2.jpeg'), alt: 'image2' },
      { url: require('../assets/c3.jpeg'), alt: 'image3' },
      { url: require('../assets/c4.jpeg'), alt: 'image4' },
    ];

    // const slides = [
    //     {
    //       url: 'https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/04/17/Pictures/iconic-pillars-installed-iit-the-entrance-ropar_125b41aa-8099-11ea-a716-f322ae116ff6.jpg',
    //     },
    //     {
    //       url: 'https://dst.gov.in/sites/default/files/SAMRIDHI%20Conclave.png',
    //     },
    //     {
    //       url: 'https://www.iitrpr.ac.in/ismp/images/carousel/slide_7.jpg',
    //     },
    
    //     {
    //       url: 'https://royalpatiala.in/wp-content/uploads/2022/12/Graduands-in-jubilant-modd-jpg.webp',
    //     },
    //     {
    //       url: 'https://ihub-awadh.in/wp-content/uploads/2023/09/SPRINT-UPES.jpg',
    //     },
    //   ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
  
    const nextSlide = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
  
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };
  
    return (
      <div className='max-w-[1100px] h-[700px] w-full m-auto py-16 px-4 relative group'>
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
        ></div>
        {/* Left Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className='flex top-4 justify-center py-2'>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className='text-2xl cursor-pointer'
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    );
  
}

export default Gallery
