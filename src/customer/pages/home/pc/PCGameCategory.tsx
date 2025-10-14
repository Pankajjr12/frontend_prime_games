import React, { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../../../state/store";
import PCGameCard from "../../../components/PCGameCard";

const PCGameCategory = () => {
 // ✅ GOOD
const homePage = useAppSelector((state) => state.homePage);
  const [scrollDirection, setScrollDirection] = useState("animate-scroll");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll function
  const autoScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth;
      const containerWidth = scrollContainer.clientWidth;
      const maxScroll = scrollWidth - containerWidth;

      if (scrollDirection === "animate-scroll") {
        // Scroll left to right
        if (scrollContainer.scrollLeft >= maxScroll) {
          // Reached the end, reverse direction
          setScrollDirection("animate-scroll-reverse");
        } else {
          scrollContainer.scrollLeft += 2; // Adjust scroll speed
        }
      } else if (scrollDirection === "animate-scroll-reverse") {
        // Scroll right to left
        if (scrollContainer.scrollLeft <= 0) {
          // Reached the beginning, reverse direction
          setScrollDirection("animate-scroll");
        } else {
          scrollContainer.scrollLeft -= 2; // Adjust scroll speed
        }
      }
    }
  };

  // Start auto-scrolling when the component mounts
  useEffect(() => {
    autoScrollIntervalRef.current = setInterval(autoScroll, 20); // Adjust the speed of auto-scrolling (20ms)
    return () => {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    };
  }, [scrollDirection]);

  // Function to handle manual scrolling (left)
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 200; // Adjust scroll step
    }
    // Pause auto-scrolling temporarily and resume it after 500ms
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    setTimeout(() => {
      autoScrollIntervalRef.current = setInterval(autoScroll, 20);
    }, 500); // Restart auto-scrolling after 500ms
  };

  // Function to handle manual scrolling (right)
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200; // Adjust scroll step
    }
    // Pause auto-scrolling temporarily and resume it after 500ms
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    setTimeout(() => {
      autoScrollIntervalRef.current = setInterval(autoScroll, 20);
    }, 500); // Restart auto-scrolling after 500ms
  };

  return (
    <div className="relative">
      {/* Left Arrow Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white border-none p-2 opacity-60 hover:opacity-100"
      >
        ←
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white border-none p-2 opacity-60 hover:opacity-100"
      >
        →
      </button>

      <div
        ref={scrollContainerRef}
        className={`flex space-x-6 p-4 mt-2 lg:px-20 border-b ${scrollDirection}`}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto", // Enable horizontal scrolling
          scrollBehavior: "smooth", // Smooth scrolling effect
          justifyContent: "flex-start", // Start from the left side
          alignItems: "center", // Vertically center items
        }}
      >
        {homePage.homePageData?.gameCategories?.slice(0, 12).map((item, index) => (
          <PCGameCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PCGameCategory;
