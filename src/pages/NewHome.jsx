import React, { useEffect } from 'react'
import TitleCarousel from '../components/newHome/titleCourasel';
import TitleInfo from '../components/newHome/titleInfo';
import BrandSection from '../components/home/BrandSection';
import { useDispatch, useSelector } from 'react-redux';
import useBreakpoints from '../api/utilities/responsive';
import getCategoriesProductThunk from '../api/asyncThunk/product-thunk/getCategories-thunk';
import NewBrandSection from '../components/newHome/NewBrandSection';
import CategorySection from '../components/home/CategorySection';

const NewHome = () => {
  const user =useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const {isMobile} = useBreakpoints();
  const { getBrand, getCategory } = getCategoriesProductThunk;
  const {
    isLoggedIn,
    loggedInUserName,
  } = user;

  useEffect(()=>{
    dispatch(getBrand());
    dispatch(getCategory());
  },[]);
  return (
    <div className='global-margin'>
      <TitleCarousel /> 
      <TitleInfo />
      <NewBrandSection />
      <CategorySection />
    </div>
  )
}

export default NewHome;
