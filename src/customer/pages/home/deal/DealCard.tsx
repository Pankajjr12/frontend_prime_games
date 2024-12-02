import React from "react";

const DealCard = () => {
  return (
    <div >
      <img
        className="border-x-[7px] border-t-[7px] border-primary-color w-full h-[12rem] object-cover object-top"
        src="https://th.bing.com/th/id/OIP.egMTOhl9ppFW3O2zrt69GQHaEK?rs=1&pid=ImgDetMain"
        alt=""
      />
      <div className="border-4 border-black bg-black text-white p-2 text-center">
        <p className="text-lg font-semibold">Amazing</p>
        <p className="text-2xl font-bold">30% off</p>
        <p className="text-balance text-lg">Hurry!</p>
      </div>
    </div>
  );
};

export default DealCard;
