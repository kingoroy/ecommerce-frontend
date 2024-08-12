import React from 'react'
import noProductImage from '../../assets/pictures/noProductFound.png';
import animatedNoProductFound from '../../assets/animatedImages/NoProductFound.json';
import Lottie from 'lottie-react';

const NoProductFoundPage = () => {
  return (
    <div className='noProductFound-main-container'>
        <div className='noProductFound-imagewrapper'>
          {/* <img src={noProductImage} alt='no product image' /> */}
          <Lottie animationData={animatedNoProductFound} />
        </div>
        <div className='noProductFound-content-wrapper'>
          <h3 className='noProduct-title'>Oops! We Couldn't Find What You're Looking For</h3>
          <p>It seems we don't have any products matching your search. But don't worry, we've got plenty of other amazing items just for you!</p>
        </div>
    </div>
  )
}

export default NoProductFoundPage;
