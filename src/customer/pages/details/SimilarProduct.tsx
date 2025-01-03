import React from "react";
import Slider from "react-slick";
import SimilarProductCard from "./SimilarProductCard";
import { CustomPrevArrow, CustomNextArrow } from "./../../components/CustomArrow"; // Import your custom arrows
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from "../../../state/store";

const SimilarProduct = ({ currentProductId }: any) => {
  const { products } = useAppSelector((store) => store);
  const filteredProducts = products.products.filter((item) => item.id !== currentProductId);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Slider {...settings}>
      {filteredProducts.map((item) => (
          <div key={item.id}>
            <SimilarProductCard product={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimilarProduct;
