import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NewCategorySection = () => {
  const { categoryDetails } = useSelector((state) => state.getProductCategory);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const handleMouseOverCard = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeaveCard = () => {
    setHoveredCard(null);
  };

  const handleClickCategory =(category)=> {
    navigate(`/products?search=${category?.categoryName}`)
  };
  return (
    <div className="CategorySection-main-newContainer">
      <h3 className="ourBrands-text">SHOP BY CATEGORY</h3>
      <div className="categorySection-cards-wrapper">
        {categoryDetails?.map((category, index) => {
          const isHovered = hoveredCard === index;

          return (
            <div
              key={index}
              className="categorySection-card"
              onMouseOver={() => handleMouseOverCard(index)}
              onMouseLeave={handleMouseLeaveCard}
              onClick={()=>handleClickCategory(category)}
            >
              <img
                src={category?.categoryDefaultImage}
                alt={category?.categoryDescription}
                className="categorySection-card-image"
              />
              <p className="categorySection-card-titleText">
                {category?.categoryName?.toUpperCase()}
              </p>
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ x: 0, y:0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0}} // Debugging exit
                    transition={{ duration: 0.5 }}
                    className="categorySection-card-Description"
                  >
                    <div className="shopNowBtn">SHOP NOW</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewCategorySection;
