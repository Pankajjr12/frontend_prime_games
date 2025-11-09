import React, { useEffect, useState } from "react";
import PCGameCategory from "./home/pc/PCGameCategory";
import CategoryGrid from "./home/category/CategoryGrid";
import Deal from "./home/deal/DealSlider";
import ShopByCategory from "./home/category/ShopByCategory";
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import Storefront from "@mui/icons-material/Storefront";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../state/store";
import ChatBot from "./chatBot/ChatBot";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const footerImages = [
  { image: "https://i.ibb.co/tK91rdr/21.jpg" },
  { image: "https://i.ibb.co/s1B8KqN/banner-tomb.jpg" },
  { image: "https://i.ibb.co/gWhhdYn/banner-god.jpg" },
  { image: "https://i.ibb.co/vkKWcnq/banner-dead.jpg" },
  { image: "https://i.ibb.co/y0Y95VR/banner-creed.jpg" },
];

const Home = () => {
  const homePage = useAppSelector((state) => state.homePage);
  const [showChatBot, setShowChatBot] = useState(false);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Loading screen messages
  const messages = [
    "Render server is slow because of limited storage...",
    "Please wait patiently for 5 minutes. Data loading...",
  ];

  // ⏱ Alternate messages every 4 seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(messageInterval);
  }, []);

  // 🎵 Background music effect
  useEffect(() => {
    let audio: HTMLAudioElement | null = null; // ✅ Explicit type
  
    if (homePage.loading) {
      audio = new Audio("/trim_battle.mp3");
      audio.loop = true;
      audio.volume = 0.4;
  
      audio.play().catch(() => {
        console.warn("Autoplay blocked — waiting for user gesture...");
        const resumeAudio = () => {
          audio?.play().catch((err) => console.warn("Still blocked:", err));
          document.removeEventListener("click", resumeAudio);
        };
        document.addEventListener("click", resumeAudio);
      });
    }
  
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // ✅ Now TypeScript knows this exists
        audio = null;
      }
    };
  }, [homePage.loading]);
  

  // 🔄 Footer image rotation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % footerImages.length);
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const img = footerImages[currentImageIndex].image;
  const becomeSellerClick = () => navigate("/become-seller");

  return (
    <>
      {!homePage.loading ? (
        <div>
          {/* 🏠 Main Home Content */}
          <div className="space-y-5 lg:space-y-10 relative pb-8">
            {homePage.homePageData?.gameCategories && <PCGameCategory />}
            {homePage.homePageData?.grid && <CategoryGrid />}
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

          {/* 🖼 Footer Promo Banner */}
          <section className="relative h-[180px] lg:h-[400px] overflow-hidden lg:px-20 mb-10">
            <img
              className="object-cover w-full h-full"
              src={img}
              alt="Promotional"
            />
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-right md:right-1/2 md:transform md:-translate-x-1/2 lg:right-[5rem]">
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

          {/* 💬 Chatbot */}
          <section className="fixed bottom-14 right-4">
            {showChatBot ? (
              <ChatBot handleClose={() => setShowChatBot(false)} />
            ) : (
              <Button
                onClick={() => setShowChatBot(true)}
                sx={{
                  borderRadius: "100%",
                  height: "50px",
                  width: "50px",
                  padding: "0",
                }}
                variant="contained"
              >
                <ChatBubbleIcon sx={{ color: "white", fontSize: "2rem" }} />
              </Button>
            )}
          </section>

          <Footer />
        </div>
      ) : (
        // 🎬 Backdrop Loading Screen
        <Backdrop open={true} sx={{ color: "#fff", zIndex: 9999 }}>
          <div className="flex flex-col items-center">
            <CircularProgress color="inherit" />
            <Typography
              variant="h6"
              color="white"
              mt={2}
              sx={{ transition: "opacity 0.5s ease-in-out" }}
            >
              {messages[currentMessageIndex]}
            </Typography>
          </div>
        </Backdrop>
      )}
    </>
  );
};

export default Home;
