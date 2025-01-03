import React from "react";
import { useNavigate } from "react-router-dom";
import './shopCard.css'
const ShopByCategoryCard = ({ item }: any) => {

  const handleClick = () => {
    // Scroll to the top of the page (or specific component)
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adds smooth scroll effect
    });
    
    // Navigate to the category page
    navigate(`/products/${item.categoryId}`);
  };
  const navigate = useNavigate();
  return (
    <div
      onClick={handleClick}
      className="flex flex-col justify-center items-center group relative overflow-hidden cursor-pointer"
    >
      <div className="w-[150px] h-[150px] flex justify-center items-center">
        <div className="rainbow-border w-full h-full">
          <img
            className="group-hover:scale-95 transition-transform duration-600 object-cover object-top w-full h-full rounded-2xl"
            src={item.image}
            alt="no-img"
          />
        </div>
      </div>
      <h1 className="text-center text-sm md:text-xl font-semibold mt-3 leading-tight whitespace-nowrap overflow-hidden scrolling-text">{item.name}</h1>
    </div>
  );
};

export default ShopByCategoryCard;
