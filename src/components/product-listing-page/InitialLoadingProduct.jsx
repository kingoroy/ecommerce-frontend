import Lottie from 'lottie-react';
import React from 'react'
import animatedSearch from '../../assets/animatedImages/animatedProductSearch.json';
const InitialLoadingProduct = () => {
  return (
    <div className='initialLoadingContainer'>
      <Lottie animationData={animatedSearch} />
    </div>
  )
}

export default InitialLoadingProduct;
