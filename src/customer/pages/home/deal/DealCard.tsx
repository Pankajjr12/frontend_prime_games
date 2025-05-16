import React from "react";
import { Deal } from "../../../../types/dealTypes";
import { useNavigate } from "react-router-dom";

const DealCard = ({deal}:{deal:Deal}) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/products/${deal.homeCategory?.categoryId}`)} className='w-full cursor-pointer'>
    <img className='border-x-[7px] border-t-[7px] border-primary-color w-full h-[14rem] object-cover object-top' src={deal.homeCategory?.image} alt="" />
    <div className='border-4 border-black bg-black text-white p-1 text-center'>
       
        <p className='text-2xl font-bold'>{deal.discount}% OFF</p>
        <p className='text-balance text-lg'>shop now</p>

    </div>
</div>
  );
};

export default DealCard;
