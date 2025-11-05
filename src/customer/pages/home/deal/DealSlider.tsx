import React, { useEffect, useRef } from "react";
import DealCard from "./DealCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { useAppSelector } from "../../../../state/store";
import { Deal } from "../../../../types/dealTypes";

const DealSlider = () => {
  const sliderRef = useRef<Slider | null>(null);
  const homePage = useAppSelector((state) => state.homePage);

  // 🔧 Normalize nested array
  const rawDeals = homePage.homePageData?.deals;
  const deals =
    Array.isArray(rawDeals) && Array.isArray(rawDeals[1])
      ? rawDeals[1]
      : Array.isArray(rawDeals)
      ? rawDeals
      : [];

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sliderRef.current?.slickNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!deals.length) {
    console.warn("⚠️ Deals array is empty or misformatted:", rawDeals);
    return <div className="text-center text-gray-400 py-4">No deals available</div>;
  }

  return (
    <div className="px-4 md:px-20 py-5">
      <div className="overflow-x-hidden">
        <Slider ref={sliderRef} {...settings}>
          {deals.map((item: Deal) => (
            <div key={item.id} className="border flex flex-col items-center justify-center">
              <DealCard deal={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DealSlider;
