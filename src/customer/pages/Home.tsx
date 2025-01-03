import React, { useEffect, useState } from "react";
import PCGameCategory from "./home/pc/PCGameCategory";
import CategoryGrid from "./home/category/CategoryGrid";
import Deal from "./home/deal/DealSlider";
import ShopByCategory from "./home/category/ShopByCategory";
import img from "../../assests/21.jpg";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import Storefront from "@mui/icons-material/Storefront";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../state/store";
import ChatBot from "./chatBot/ChatBot";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const footerImages = [
  {
    name: "",
    image: "https://i.ibb.co/tK91rdr/21.jpg",
  },
  {
    name: "Tomb Raider",
    image: "https://i.ibb.co/s1B8KqN/banner-tomb.jpg",
  },
  {
    name: "God of War",
    image: "https://i.ibb.co/gWhhdYn/banner-god.jpg",
  },
  {
    name: "Walking Dead",
    image: "https://i.ibb.co/vkKWcnq/banner-dead.jpg",
  },
  {
    name: "Creed",
    image: "https://i.ibb.co/y0Y95VR/banner-creed.jpg",
  },
];

const Home = () => {
  const { homePage } = useAppSelector((store) => store);
  const [showChatBot, setShowChatBot] = useState(false);
  const becomeSellerClick = () => {
    navigate("/become-seller");
  };

  const handleShowChatBot = () => {
    setShowChatBot(!showChatBot);
  };
  const handleCloseChatBot = () => {
    setShowChatBot(false);
  };
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % footerImages.length
      );
    }, 10000); // Change image every 6 seconds

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const img = footerImages[currentImageIndex].image;
  return (
    <>
      {!homePage.loading ? (
        <div>
          <div className="space-y-5 lg:space-y-10 relative pb-8">
            {homePage.homePageData?.dealCategories && <PCGameCategory />}
            {homePage.homePageData?.grid && (
              <section>
                <CategoryGrid />
              </section>
            )}

            {homePage.homePageData?.deals && (
              <section className="pt-10">
                <h1 className="text-lg lg:text-4xl pb-5 lg:pb-10 font-bold text-primary-color text-center">
                  TODAY'S DEAL
                </h1>
                <Deal />
              </section>
            )}
            {homePage.homePageData?.shopByCategories && (
              <section className="pt-10">
                <h1 className="text-lg lg:text-4xl pb-5 lg:pb-10 font-bold text-primary-color text-center">
                  SHOP BY CATEGORY
                </h1>
                <ShopByCategory />
              </section>
            )}
          </div>
          <section className="relative h-[180px] lg:h-[400px] overflow-hidden lg:px-20 mb-10">
            <img
              className="object-cover w-full h-full max-w-full"
              src={img}
              alt="Description of the image"
            />
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2 font-semibold space-y-2 text-right md:right-1/2 md:transform md:-translate-x-1/2 lg:right-[5rem] lg:text-right lg:text-4xl">
              <h1 className="text-lg lg:text-xl md:text-3xl text-primary-color">
                Sell Your Product
              </h1>
              <p className="text-lg md:text-2xl text-white">
                with
                <span className="mx-2 logo text-black">Prime GameStore</span>
              </p>
              <div className="pt-8 flex justify-center">
                <Button
                  startIcon={<Storefront />}
                  variant="contained"
                  onClick={becomeSellerClick}
                >
                  Become Seller
                </Button>
              </div>
            </div>
          </section>
          <section className="fixed bottom-14 right-4">
            {showChatBot ? (
              <ChatBot handleClose={handleCloseChatBot} />
            ) : (
              <Button
                onClick={handleShowChatBot}
                sx={{
                  borderRadius: "100%",
                  height: "50px", // Increase height
                  width: "50px", // Increase width to make it more prominent
                  padding: "0", // Remove padding for exact circle
                }}
                variant="contained"
                className="flex justify-center items-center"
              >
                <ChatBubbleIcon sx={{ color: "white", fontSize: "2rem" }} />
              </Button>
            )}
          </section>
          <section>
            <Footer />
          </section>
        </div>
      ) : (
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default Home;
