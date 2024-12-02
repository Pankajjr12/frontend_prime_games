import React from "react";
import Slider from "react-slick";
import SimilarProductCard from "./SimilarProductCard";
import { CustomPrevArrow, CustomNextArrow } from "./../../components/CustomArrow"; // Import your custom arrows
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimilarProduct = () => {
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
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <SimilarProductCard key={item} />
        ))}
      </Slider>
    </div>
  );
};

export default SimilarProduct;
