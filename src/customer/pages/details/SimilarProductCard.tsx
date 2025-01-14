import React from "react";
import { useNavigate } from "react-router-dom";

const SimilarProductCard = ({ product }: any) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Scroll to the top of the page before navigating
    window.scrollTo(0, 0);

    navigate(
      `/product-details/${product.category?.categoryId}/${product.title}/${product.id}`
    );
  };
  return (
    <div onClick={handleClick} className="group ">
      <div className="relative h-[300px]">
        <img
          className="h-full w-full object-cover"
          src={product.images[0]}
          alt={`product-similar`}
        />
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect  rounded-md ">
        <div className="name space-y ">
          <h1 className="font-semibold text-lg">
            {product.seller?.businessDetails.businessName}
          </h1>
          <p className="">{product.title}</p>
        </div>
        <div className="price flex items-center gap-3 ">
          <span className="font-semibold text-gray-800">
            {" "}
            ₹{product.sellingPrice}
          </span>
          <span className="text thin-line-through text-gray-400 ">
            ₹{product.mrpPrice}
          </span>
          <span className="text-[#00927c] font-semibold">
            {product.discountPercent}% off
          </span>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
