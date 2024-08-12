import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { newTitleImages, newTitleImagesMobile } from '../../assets/pictures/homePage/newTitleImages';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { Pagination, Autoplay, EffectFade, Navigation } from 'swiper/modules';
import Lottie from 'lottie-react';
import animatedScrollDown from '../../assets/animatedImages/ScrollDown.json';
import { useNavigate } from 'react-router-dom';
import useBreakpoints from '../../api/utilities/responsive';

// Lazy load the TitleTexts component
const TitleTexts = lazy(() => import('./titleTexts'));

const TitleCarousel = () => {
  const navigate = useNavigate();
  const {isMobile} = useBreakpoints();
  const [titleTextPosition, setTitleTextPosition] = useState('right');
  const [showScrollDown, setShowScrollDown] = useState(true);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setShowScrollDown(false);
      } else {
        setShowScrollDown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle navigation based on the collection
  const handleImageClick = (collection) => {
    if (collection === 'MENS COLLECTION') {
      navigate('/products?search=men-clothing'); // Update this path based on your routing
    } else if (collection === 'WOMENS COLLECTION') {
      navigate('/products?search=women-clothing'); // Update this path based on your routing
    }
  };
  const titleImages = isMobile ? newTitleImagesMobile : newTitleImages;
  return (
    <div className="title-carousel-container">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        effect="fade"
        navigation={true}
        fadeEffect={{ crossFade: true }}
        className='product-courosel-swiper-container'
      >
        { titleImages?.map((item, index) => {
          const collection = index === 0 ? 'MENS COLLECTION' : 'WOMENS COLLECTION';
          return (
            <SwiperSlide
              key={index}
              className='courosel-image-wrapper'
              onClick={() => handleImageClick(collection)} // Add click handler
            >
              <img
                src={item?.src}
                alt={`Product image ${index}`}
                className="carousel-image"
              />
              <Suspense fallback={<div>Loading...</div>}>
                <TitleTexts
                  key={index} // Use the index to force re-render
                  position={index === 0 ? 'right' : 'left'}
                  text={collection}
                />
              </Suspense>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <motion.div
        className='scrollDownContainer'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showScrollDown ? 1 : 0, y: showScrollDown ? 0 : 50 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <motion.p
          animate={{
            x: [0, -5, 5, 0], // Creates the vibrate effect
            transition: {
              duration: 0.5, // Duration of the vibration
              repeat: Infinity, // Repeat the effect indefinitely
              repeatType: "loop", // Loop the effect
              ease: "easeInOut", // Easing function for smoothness
            },
          }}
        >Scroll down</motion.p>
        <Lottie animationData={animatedScrollDown} loop={true} size={20} className='animatedScroll'/>
      </motion.div>
    </div>
  );
};

export default TitleCarousel;
