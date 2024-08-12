import Lottie from 'lottie-react';
import React from 'react';
import animatedCart from '../../assets/animatedImages/Cart.json';
import animatedHeadphone from '../../assets/animatedImages/headphone.json';
import animatedSecurePayment from '../../assets/animatedImages/SecurePayment.json';
import { motion } from 'framer-motion';

const TitleInfo = () => {
  return (
    <motion.div 
      className='titleInfoContainer'
      whileInView={{
        opacity: [0, 1],
        y: [50, 0], 
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className='titleInfoMenuWrapper'>
        <Lottie animationData={animatedCart} loop={true} className='menuLogo'/>
        <div className='menuContent'>
          <h3 className='titleInfo'>FREE HOME DELIVERY</h3>
          <h3 className='extraInfo'>SUPERFAST DELIVERY</h3>
        </div>
      </div>
      <div className='titleInfoMenuWrapper'>
        <Lottie animationData={animatedHeadphone} loop={true} className='menuLogoHeadphone' />
        <div className='menuContent'>
          <h3 className='titleInfo'>24/7 SUPPORT</h3>
          <h3 className='extraInfo'>CONTACT US ANYTIME</h3>
        </div>
      </div>
      <div className='titleInfoMenuWrapper'>
        <Lottie animationData={animatedSecurePayment} loop={true} className='menuLogoHeadphone' />
        <div className='menuContent'>
          <h3 className='titleInfo'>SECURE PAYMENT</h3>
          <h3 className='extraInfo'>100% SAFE TRANSACTIONS</h3>
        </div>
      </div>
    </motion.div>
  );
}

export default TitleInfo;
