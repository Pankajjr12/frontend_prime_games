import React from "react";

const SimilarProductCard = () => {
  return (
    <div className="flex -lg items-center justify-center p-4">
      <div className="group relative rounded-md border border-gray-300 shadow-md overflow-hidden">
        <div className="card rounded-md">
          <img
            className="object-cover w-full h-full" // Ensures the image covers the area
            alt=""
            src="https://gamefaqs.gamespot.com/a/box/6/9/3/734693_front.jpg"
          />
        </div>
        <div className="details p-2 space-y-1 group-hover:bg-gray-100 transition duration-200 rounded-md">
          <div className="name">
            <h1 className="text-lg font-semibold">Capcom</h1>
            <p className="text-sm text-gray-600">Resident Evil 3 Remake</p>
          </div>

          <div className="price flex items-center gap-3">
            <span className="font-semibold text-gray-800">Rs 1800</span>
            <span className="font-thin line-through text-gray-400">Rs 999</span>
            <span className="text-red-600 font-semibold">60%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
