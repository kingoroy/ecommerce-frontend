import React, { useEffect, useState } from 'react'
import Popup from '../../small-components/Popup';

const ProductListingMobileFilter = ({
  setOpenFilterModal,
  productsFilter,
  filterLoading,
  selectedItems,
  setSelectedItems,
  priceRange,
  setPriceRange,
  setLatestChangingKey
}) => {
  const [currentFilter, setCurrentFilter] = useState(null);

  const handleSliderChange = (value, newValue) => {
    if (newValue && newValue.length === 2) {
      setPriceRange({
        minPrice: newValue[0],
        maxPrice: newValue[1]
      });
    }
  };

  useEffect(() => {
    if (productsFilter) {
      const minPrice = productsFilter.minPrice;
      const maxPrice = productsFilter.maxPrice;
      if (minPrice !== priceRange.minPrice || maxPrice !== priceRange.maxPrice) {
        setPriceRange({
          ...priceRange,
          minPrice,
          maxPrice
        });
      }
    }
  }, [productsFilter]);

  const handleItemClick = (name, item) => {
    console.log(name, 'name');
    setSelectedItems((prevItems) => {
      if (name === 'discountPercentage') {
        return {
          ...prevItems,
          [name]: prevItems[name] === item ? null : item, 
        };
      } else {
        const updatedItems = prevItems[name] ? [...prevItems[name]] : [];
        const itemIndex = updatedItems.indexOf(item);
        if (itemIndex === -1) {
          updatedItems.push(item);
        } else {
          updatedItems.splice(itemIndex, 1);
        }
        return {
          ...prevItems,
          [name]: updatedItems,
        };
      }
    });
    setLatestChangingKey(name);
  };

  const renderFilterItems = (name, items) => {
    if (name === 'colours') {
      return items.map((item, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              name={name}
              value={item}
              checked={selectedItems[name]?.includes(item?.colour)}
              onChange={() => handleItemClick(name, item?.colour)}
            />
              <span
                style={{
                  backgroundColor: item.hexCode,
                  width: "20px",
                  height: "20px",
                  display: "inline-block",
                  marginRight: "8px",
                }}
              ></span>
                {item?.colour}
          </label>
        </li>
      ))
    } else if (name === 'discountPercentages') {
      return items.map((item, index) => (
        <li key={index}>
          <label>
            <input
              type="radio"
              name={name}
              value={item?.discountPercentageText}
              checked={selectedItems[name]?.includes(item?.discountPercentage)}
              onChange={() => handleItemClick(name, item?.discountPercentage)}
            />
                {item?.discountPercentageText}
          </label>
        </li>
      ))
    }
    else {
      return items.map((item, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              name={name}
              value={item}
              checked={selectedItems[name]?.includes(item)}
              onChange={() => handleItemClick(name, item)}
            />
            {item}
          </label>
        </li>
      ))
    }
  };

  return (
    <Popup
      title='Filter'
      onClose={() => setOpenFilterModal(false)}
      backgroundColor='white'
    >
      <div style={{height: '70vh'}}>
     {filterLoading ? (
    <div className="product-filter-container">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="filter-dropdown-loading"></div>
      ))}
    </div>
  ) : (
    <div className="product-filter-mobile-container">
      {productsFilter && (
        <div className="filter-buttons">
          {productsFilter.masterCategories?.length > 0 && (
            <button onClick={() => setCurrentFilter("masterCategories")}>Master Categories</button>
          )}
          {productsFilter.categories?.length > 0 && (
            <button onClick={() => setCurrentFilter("categories")}>Categories</button>
          )}
          {productsFilter.brands?.length > 0 && (
            <button onClick={() => setCurrentFilter("brands")}>Brands</button>
          )}
          {productsFilter.colours?.length > 0 && (
            <button onClick={() => setCurrentFilter("colours")}>Colours</button>
          )}
          {productsFilter.sizes?.length > 0 && (
            <button onClick={() => setCurrentFilter("sizes")}>Sizes</button>
          )}
          {productsFilter.discountPercentages?.length > 0 && (
            <button onClick={() => setCurrentFilter("discountPercentages")}>Discount Percentages</button>
          )}
          {/* <div className="price-range-container">
            <RangeSlider
              min={productsFilter?.minPrice || 0}
              max={productsFilter?.maxPrice || 1000}
              defaultValue={[priceRange.minPrice, priceRange.maxPrice]}
              onRangeDragEnd={handleSliderChange}
            />
            <p>Selected range: {priceRange.minPrice} - {priceRange.maxPrice}</p>
          </div> */}
        </div>
      )}

      <div className="filter-items">
        <ul>
          {currentFilter && renderFilterItems(currentFilter, productsFilter[currentFilter])}
        </ul>
      </div>
    </div>
  )
}
      </div>
    </Popup>
  )
}

export default ProductListingMobileFilter;
