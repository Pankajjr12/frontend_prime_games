import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { teal } from "@mui/material/colors";
import { Divider, Button } from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import WalletIcon from "@mui/icons-material/Wallet";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import SimilarProduct from "./SimilarProduct";
import Review from "../review/Review";
import ReviewCard from "../review/ReviewCard";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://assets.mycast.io/posters/resident-evil-a-nightmare-on-dulvey-fan-casting-poster-426731-large.jpg?1707090598",
    "https://apollo2.dl.playstation.net/cdn/EP0102/CUSA09473_00/YS4DidDlWvRfqWUCJezWpeNNpbkoq12B.png",
  "https://th.bing.com/th/id/OIP.Rjk3mfFICWqQzvSN6CqKkwHaHa?w=1080&h=1080&rs=1&pid=ImgDetMain"
  ];
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleOpen = () => {
    navigate("/gallery")
  }
  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="flex flex-col lg:flex-row gap-2">
          {/* <div className="w-full lg:w-[15%] hidden flex-wrap lg:flex-col gap-2">
            {[1, 1, 2].map((item) => (
              <img
                className="lg:w-full w-[50%] rounded-md cursor-pointer"
                src="https://th.bing.com/th/id/OIP.bYy-0euHFfwfYRDrBlOlsQHaNK?w=187&h=333&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="no"
              />
            ))}
          </div> */}
          <div className="relative w-full lg:w-[85%] overflow-hidden">
            <img
              className="w-full h-[400px] object-contain rounded-md transition-transform duration-300"
              src={images[currentIndex]}
              onClick={handleOpen}
              alt={`Slide ${currentIndex}`}
            />
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary-color p-2 rounded-md"
            >
                <span className="text-white">&#8592;</span> 
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-color p-2 rounded-md"
            >
               <span className="text-white font-bold">&#8594;</span>
            </button>
          </div>
        </section>
        <section>
          <h1 className="font-bold text-lg lg:text-4xl  text-primary-color">
            Resident Evil Biohazard
          </h1>
          <p className="text-gray-500 font-semibold">Capcom</p>
          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <StarIcon sx={{ color: teal[500], fontSize: "16px" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>23 Ratings</span>
          </div>
          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-semibold text-gray-800">Rs 2400</span>
              <span className="font-thin line-through text-gray-400">
                Rs 1599
              </span>
              <span className="text-primary-color font-semibold">40%</span>
            </div>
            <p className="text-sm text-gray-400">
              Inclusive of all taxes. Free Shipping above Rs 1500.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-4">
              <ShieldIcon sx={{ color: teal[500] }} />
              <p>Quality Product Assurance</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremiumIcon sx={{ color: teal[500] }} />
              <p>100% money back guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShippingIcon sx={{ color: teal[500] }} />
              <p>Free Shipping & Returns</p>
            </div>
            <div className="flex items-center gap-4">
              <WalletIcon sx={{ color: teal[500] }} />
              <p>Pay on Delivery might be available</p>
            </div>
          </div>

          <div className="mt-6 space-y-2 ">
            <h1>QUANTITY</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                className="border"
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <RemoveCircleIcon />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <AddCircleIcon />
              </Button>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCartIcon />}
              sx={{
                backgroundColor: "primary.main", // Use theme colors
                color: "white", // Text color
                "&:hover": {
                  backgroundColor: "primary.dark", // Darker shade on hover
                },
              }}
            >
              Add To Cart
            </Button>

            <Button variant="outlined" fullWidth startIcon={<FavoriteBorder />}>
              Wishlist
            </Button>
          </div>
          <div className="mt-5">
            <p>
            Resident Evil 7: Biohazard is a 2017 survival horror game developed and published by Capcom. The player controls Ethan Winters as he searches for his long-missing wife in a derelict plantation occupie…
            </p>
          </div>
          <div className="mt-10 space-y-4">
            <ReviewCard />
          </div>
        </section>
      </div>

      <div className="mt-20">
        <h1 className="text-2xl font-bold">Similar Product</h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
