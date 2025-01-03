import React, { useEffect, useRef } from "react";
import DealCard from "./DealCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { useAppSelector } from "../../../../state/store";
import { Deal } from "../../../../types/dealTypes";

const DealSlider = () => {
  const sliderRef = useRef<Slider | null>(null); // Create a ref for the slider
  const { homePage } = useAppSelector(store => store);
  
  const settings: Settings = {
    dots: false,
    infinite: true, // Enable infinite scrolling for smooth transitions
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        (sliderRef.current as any).slickNext(); // Trigger the next slide
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="px-4 md:px-20 py-5">
      <div className="overflow-x-hidden"> {/* Hide horizontal scrollbar */}
        <Slider ref={sliderRef} {...settings}>
          {homePage.homePageData?.deals?.map((item: Deal) => (
            <div className="border flex flex-col items-center justify-center" key={item.id}>
              <DealCard deal={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DealSlider;
