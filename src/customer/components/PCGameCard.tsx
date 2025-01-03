import React from "react";
import { useNavigate } from "react-router-dom";

const PCGameCard = ({ item }: any) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${item?.categoryId}`)}
      className="flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 ease-in-out"
      style={{
        flexShrink: 0, // Prevent shrinking on scroll
      }}
    >
      <img
        className="object-cover w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full" // Fixed width and height with rounded full
        src={item.image}
        alt={item.name}
      />
    </div>
  );
};

export default PCGameCard;
