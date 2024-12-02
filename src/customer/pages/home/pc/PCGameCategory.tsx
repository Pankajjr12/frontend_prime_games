import React, { useState, useEffect } from "react";
import PCGameCard from "../../../components/PCGameCard";

const PCGameCategory = () => {
  const [scrollDirection, setScrollDirection] = useState("animate-scroll");

  const handleScrollEnd = () => {
    setScrollDirection((prev) =>
      prev === "animate-scroll" ? "animate-scroll-reverse" : "animate-scroll"
    );
  };

  // Simulating end of scroll (you can improve this logic)
  useEffect(() => {
    const timeout = setTimeout(handleScrollEnd, 5000); // Change to match your animation duration
    return () => clearTimeout(timeout);
  }, [scrollDirection]);

  return (
    <div
      className={`flex justify-between ${scrollDirection}   p-4 lg:px-20 border-b`}
    >
      {[1, 2, 3,4,5].map((item) => (
        <PCGameCard key={item} /> // Ensure to add a unique key
      ))}
    </div>
  );
};

export default PCGameCategory;
