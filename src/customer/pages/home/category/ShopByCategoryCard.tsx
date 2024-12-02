import React from "react";

const ShopByCategoryCard = () => {
  return (
    <div className="flex flex-col justify-center items-center group cursor-pointer relative overflow-hidden">
    <div className="w-[150px] h-[150px] flex justify-center items-center">
      <div className="rainbow-border w-full h-full">
        <img
          className="group-hover:scale-95 transition-transform duration-600 object-cover object-top w-full h-full rounded-2xl"
          src="https://th.bing.com/th/id/OIP.egMTOhl9ppFW3O2zrt69GQHaEK?rs=1&pid=ImgDetMain"
          alt="no-img"
        />
      </div>
    </div>
    <h1>Spider Man</h1>
  </div>
  
  
  );
};

export default ShopByCategoryCard;
