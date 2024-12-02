import React from "react";
import { useNavigate } from "react-router-dom";

const PCGameCard = ({item}:any) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/products/${item.categoryId}`)} className='flex w-20 flex-col items-center gap-3 cursor-pointer'>
      <img
        className="object-contain h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32" // Adjust sizes based on screen size
        src="https://orig00.deviantart.net/3563/f/2016/141/3/d/assassin_s_creed_iii_icon_v3_by_andonovmarko-da3brlj.png"
        alt="PC Game Icon"
      />
    </div>
  )
};

export default PCGameCard;
