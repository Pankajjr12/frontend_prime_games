import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Box, Button, Modal } from "@mui/material";
import { teal } from "@mui/material/colors";

import { Product } from "../../../types/productTypes";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { addProductToWishlist } from "../../../state/Customer/wishlistSlice";
import { isWishlisted } from "../../../utils/isWishlisted";
import ChatBot from "../chatBot/ChatBot";

interface ProductCardProps {
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((store) => store);

  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  // ✅ Safe fallback for images
  const images = item?.images || [];

  // ✅ Prevent undefined .length access with optional chaining
  useEffect(() => {
    if (!isHovered || !images.length) return;

    const interval = window.setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [isHovered, images.length]);

  // ✅ Handle wishlist
  const handleAddWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFavorite((prev) => !prev);

    if (item?.id) {
      dispatch(addProductToWishlist({ productId: item.id }));
    }
  };

  // ✅ Navigate to product details
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product-details/${item?.category?.categoryId}/${item?.title}/${item?.id}`);
  };

  // ✅ Chatbot modal handlers
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
          onHoverCategory(item?.title || "");
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHoverCategory("");
        }}
      >
        {/* ✅ Image carousel */}
        <div className="card">
          {images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                className="card-media object-top"
                src={image}
                alt={`product-${index}`}
                style={{
                  transform: `translateX(${(index - currentImage) * 100}%)`,
                }}
              />
            ))
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

          {/* ✅ Hover Indicators */}
          {isHovered && images.length > 1 && (
            <div className="indicator flex flex-col items-center space-y-2">
              <div className="flex gap-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator-button ${index === currentImage ? "active" : ""}`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                {wishlist?.wishlist && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ zIndex: 10 }}
                    onClick={handleAddWishlist}
                  >
                    {isWishlisted(wishlist.wishlist, item) ? (
                      <FavoriteIcon sx={{ color: teal[500] }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "gray" }} />
                    )}
                  </Button>
                )}
                <Button onClick={handleShowChatBot} color="secondary" variant="contained">
                  <ModeCommentIcon sx={{ color: teal[500] }} />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* ✅ Product Details */}
        <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
          <div className="space-y-1">
            <h1 className="font-semibold text-lg">
              {item?.seller?.businessDetails?.businessName || "Unknown Seller"}
            </h1>
            <p className="text-md line-clamp-1">{item?.title || "Untitled Product"}</p>
          </div>

          <div className="price flex items-center gap-3">
            <span className="font-semibold text-gray-800">
              ₹{item?.sellingPrice?.toLocaleString("en-IN") || 0}
            </span>
            <span className="text thin-line-through text-gray-400">
              ₹{item?.mrpPrice?.toLocaleString("en-IN") || 0}
            </span>
            <span className="text-[#00927c] font-semibold">
              {item?.discountPercent || 0}% off
            </span>
          </div>
        </div>
      </div>

      {/* ✅ ChatBot Modal */}
      {showChatBot && (
        <section className="absolute left-16 top-0">
          <Modal
            open={true}
            onClose={handleCloseChatBot}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ChatBot handleClose={handleCloseChatBot} productId={item?.id} />
            </Box>
          </Modal>
        </section>
      )}
    </>
  );
};

export default ProductCard;
