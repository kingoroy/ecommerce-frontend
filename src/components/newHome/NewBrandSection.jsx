import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFlip, Navigation } from "swiper/modules";
import useBreakpoints from "../../api/utilities/responsive";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import { useNavigate } from "react-router-dom";

const NewBrandSection = () => {
  const { brandDetails } = useSelector((state) => state.getProductCategory);
  const { isMobile } = useBreakpoints();
  const navigate = useNavigate();
  const handleClickBrand = (brand) => {
    navigate(`/products?search=${brand?.brandName}`);
  }
  return (
    <div className="brandSection-main-newcontainer">
      <h3 className="ourBrands-text">Our Popular Brands</h3>
      <div className="homePage-category-section">
        <Swiper
          modules={[Pagination, Autoplay, EffectFlip, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="slide"
          loop={true}
          navigation={true}
          breakpoints={{
            1024: {
              slidesPerView: 6, // Desktop
            },
            768: {
              slidesPerView: 4, // Tablet
            },
            480: {
              slidesPerView: 3, // Mobile
            },
          }}
          className="brandSection-cardSlides-wrapper"
        >
          {brandDetails?.map((brand, index) => (
            <SwiperSlide key={index} onClick={() => handleClickBrand(brand)}>
              <div className="brandSection-cardSlide">
                <div className="brandSection-cardSlide-image-wrapper">
                <img
                      alt={brand?.brandName || "DesiCart"}
                      src={brand?.brandLogoImage || "/default-logo.png"}
                    />
                </div>
                {brand?.brandName}
                {/* <p className="brandSection-brandName">
                  {brand?.brandName || "DesiCart"}
                </p> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewBrandSection;
