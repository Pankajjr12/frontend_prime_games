import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { teal } from "@mui/material/colors";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/productTypes";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../../state/store";
import { addProductToWishlist } from "../../../state/Customer/wishlistSlice";

interface ProductCardProps {
  item: Product;
}

const WishlistProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Product ID:", item.id);  // Check if ID is valid
    setIsFavorite((prev) => !prev);

    if (item.id) {
      dispatch(addProductToWishlist({ productId: item.id }));
    } else {
      console.error("Product ID is missing");
    }
  };

  // Function to handle card click and navigate to product details page
  const handleCardClick = () => {
    navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`);
  };

  return (
    <div
      className="w-60 relative cursor-pointer"  // Add cursor-pointer to indicate it's clickable
     // Navigate on card click
    >
      <div className="w-full">
        <img
          className="object-top w-full"
          src={item.images[0]}
          alt={`product-${item.title}`}
        />
      </div>
      <div className="p-3 space-y-1 bg-slate-100 rounded-md"  onClick={handleCardClick}  >
        <div className="space-y">
          <p>{item.title}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-800">
            ₹{item.sellingPrice.toLocaleString("en-IN")}
          </span>
          <span className="text thin-line-through text-gray-400">
            ₹{item.mrpPrice.toLocaleString("en-IN")}
          </span>
          <span className="text-[#00927c] font-semibold">
            {item.discountPercent}% off
          </span>
        </div>
      </div>

      <div className="absolute top-1 right-1">
        <button onClick={handleIconClick}>
          <CloseIcon
            className="cursor-pointer bg-white rounded-full p-1"
            sx={{ color: teal[500], fontSize: "2rem" }}
          />
        </button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
