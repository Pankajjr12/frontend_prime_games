import React, { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../../../state/store";
import PCGameCard from "../../../components/PCGameCard";

const PCGameCategory = () => {
  const homePage = useAppSelector((state) => state.homePage);
  const [scrollDirection, setScrollDirection] = useState("animate-scroll");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Normalize nested backend array
  const rawGames = homePage.homePageData?.gameCategories;
  const gameCategories =
    Array.isArray(rawGames) && Array.isArray(rawGames[1])
      ? rawGames[1]
      : Array.isArray(rawGames)
      ? rawGames
      : [];

  // Auto-scroll logic
  const autoScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth;
      const containerWidth = scrollContainer.clientWidth;
      const maxScroll = scrollWidth - containerWidth;

      if (scrollDirection === "animate-scroll") {
        if (scrollContainer.scrollLeft >= maxScroll) {
          setScrollDirection("animate-scroll-reverse");
        } else {
          scrollContainer.scrollLeft += 2;
        }
      } else {
        if (scrollContainer.scrollLeft <= 0) {
          setScrollDirection("animate-scroll");
        } else {
          scrollContainer.scrollLeft -= 2;
        }
      }
    }
  };

  useEffect(() => {
    autoScrollIntervalRef.current = setInterval(autoScroll, 20);
    return () => {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    };
  }, [scrollDirection]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 200;
    }
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    setTimeout(() => {
      autoScrollIntervalRef.current = setInterval(autoScroll, 20);
    }, 500);
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200;
    }
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    setTimeout(() => {
      autoScrollIntervalRef.current = setInterval(autoScroll, 20);
    }, 500);
  };

  if (!gameCategories.length) {
    console.warn("⚠️ gameCategories is empty or misformatted:", rawGames);
    return <div className="text-gray-400 text-center py-4">No game categories found.</div>;
  }

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white border-none p-2 opacity-60 hover:opacity-100"
      >
        ←
      </button>

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
          overflowX: "auto",
          scrollBehavior: "smooth",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {gameCategories.slice(0, 12).map((item, index) => (
          <PCGameCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PCGameCategory;
