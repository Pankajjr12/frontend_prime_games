import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Product } from "../../../types/productTypes";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { addProductToWishlist } from "../../../state/Customer/wishlistSlice";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { teal } from "@mui/material/colors";
import { isWishlisted } from "../../../utils/isWishlisted";
import { Box, Button, Modal } from "@mui/material";
import ChatBot from "../chatBot/ChatBot";
interface ProductCardProps {
  // images: string[];
  // categoryId: string | undefined;
  item: Product;
  onHoverCategory: (categoryName: string) => void;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  borderRadius: ".5rem",
  boxShadow: 24,
};

const ProductCard: React.FC<ProductCardProps> = ({ item, onHoverCategory }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const { wishlist } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showChatBot, setShowChatBot] = useState(false);

  const handleAddWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFavorite((prev) => !prev);
    console.log(item.id);
    if (item.id) dispatch(addProductToWishlist({ productId: item.id }));
  };

  const handleClick = () => {
    // Scroll to the top of the page (or specific component)
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scroll effect
    });

    // Navigate to the category page
    navigate(
      `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`
    );
  };

  useEffect(() => {
    let interval: any;

    if (isHovered) {
      const interval = window.setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      }, 6000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHovered, item.images.length]);

  const handleShowChatBot = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowChatBot(true);
  };
  const handleCloseChatBot = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowChatBot(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="group px-4 relative pb-4"
        onMouseEnter={() => {
          setIsHovered(true);
          onHoverCategory(item?.title || ""); // Pass category name on hover
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHoverCategory(""); // Reset category name on hover leave
        }}
      >
        <div className="card ">
          {item.images.map((image: any, index: number) => (
            <img
              key={index}
              className="card-media object-top"
              src={image}
              alt={`product-${index}`}
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
            />
          ))}
          {isHovered && (
            <div className="indicator flex flex-col items-center space-y-2">
              <div className="flex gap-4">
                {item.images.map((item: any, index: number) => (
                  <button
                    key={index}
                    className={`indicator-button ${
                      index === currentImage ? "active" : ""
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                {wishlist.wishlist && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ zIndex: 10 }}
                    className=" z-50"
                    onClick={handleAddWishlist}
                  >
                    {isWishlisted(wishlist.wishlist, item) ? (
                      <FavoriteIcon sx={{ color: teal[500] }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "gray" }} />
                    )}
                  </Button>
                )}
                <Button
                  onClick={handleShowChatBot}
                  color="secondary"
                  variant="contained"
                >
                  <ModeCommentIcon sx={{ color: teal[500] }} />
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="details pt-3 space-y-1 group-hover-effect  rounded-md ">
          <div className="space-y-1">
            <h1 className="font-semibold text-lg">
              {item.seller?.businessDetails.businessName}
            </h1>
            <p className="text-md line-clamp-1">{item.title}</p>
          </div>
          <div className="price flex items-center gap-3 ">
            <span className="font-semibold text-gray-800">
              {" "}
              ₹{item.sellingPrice.toLocaleString("en-IN")}
            </span>
            <span className="text thin-line-through text-gray-400 ">
              ₹{item.mrpPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-[#00927c] font-semibold">
              {item.discountPercent}% off
            </span>
          </div>
        </div>
      </div>

      {showChatBot && (
        <section className="absolute left-16 top-0">
          <Modal
            open={true}
            onClose={handleCloseChatBot}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ChatBot handleClose={handleCloseChatBot} productId={item.id} />
            </Box>
          </Modal>
        </section>
      )}
    </>
  );
};

export default ProductCard;
