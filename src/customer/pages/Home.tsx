import React from "react";
import PCGameCategory from "./home/pc/PCGameCategory";
import CategoryGrid from "./home/category/CategoryGrid";
import Deal from "./home/deal/Deal";
import ShopByCategory from "./home/category/ShopByCategory";
import img from "../../assests/21.jpg";
import { Button } from "@mui/material";
import Storefront from "@mui/icons-material/Storefront";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()
  return (
    <div className="space-y-5 lg:space-y-10 relative pb-8">
      <PCGameCategory />
      <CategoryGrid />

      <section className="pt-10">
        <h1 className="text-lg lg:text-4xl pb-5 lg:pb-10 font-bold text-primary-color text-center">
          TODAY'S DEAL
        </h1>
        <Deal />
      </section>
      <section className="pt-10">
        <h1 className="text-lg lg:text-4xl pb-5 lg:pb-10 font-bold text-primary-color text-center">
          SHOP BY CATEGORY
        </h1>
        <ShopByCategory />
      </section>

      <section className="relative h-[180px] lg:h-[400px] overflow-hidden lg:px-20">
        <img
          className="object-cover w-full h-full max-w-full"
          src={img}
          alt="Description of the image"
        />
        <div className="absolute top-1/2 left-3 transform -translate-y-1/2 font-semibold space-y-2 text-center md:left-1/2 md:transform md:-translate-x-1/2 lg:left-[15rem] lg:text-left lg:text-4xl">
          <h1 className="text-xl md:text-3xl text-white">Sell Your Product</h1>
          <p className="text-lg md:text-2xl text-white">
            with
            <span className="mx-2 logo text-black">
              Prime GameStore
            </span>
          </p>
          <div className="pt-8 flex justify-center">
            <Button startIcon={<Storefront />} variant="contained"  onClick={() => navigate("/become-seller")}>
              Become Seller
            </Button>
          </div>
        </div>
      </section>
      <section>
        <Footer/>
      </section>
    </div>
  );
};

export default Home;
