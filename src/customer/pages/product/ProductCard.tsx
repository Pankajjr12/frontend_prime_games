import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Favorite from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

const images = [
  "https://assets.mycast.io/posters/resident-evil-a-nightmare-on-dulvey-fan-casting-poster-426731-large.jpg?1707090598",
  "https://apollo2.dl.playstation.net/cdn/EP0102/CUSA09473_00/YS4DidDlWvRfqWUCJezWpeNNpbkoq12B.png",
"https://th.bing.com/th/id/OIP.Rjk3mfFICWqQzvSN6CqKkwHaHa?w=1080&h=1080&rs=1&pid=ImgDetMain"
];
const ProductCard = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: any;

    if (isHovered) {
      const interval = window.setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, 6000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHovered, images.length]);

  return (
    <>
      <div className="group px-4 relative rounded-md">
        <div
          className="card rounded-md"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {images.map((item, index) => (
            <img
              className="card-media object-top"
              src={item}
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
            />
          ))}
          
          {isHovered &&
            <div className="indicator flex flex-col items-center space-y-2">
              <div className="flex gap-3">
                <Button variant="contained" color="secondary">
                  <Favorite sx={{ color: "white"  }} />
                </Button>

                <Button variant="contained" color="secondary">
                  <CommentIcon sx={{ color: "white" }} />
                </Button>
              </div>
            </div>
          }
        </div>
        <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
          <div className="name">
            <h1 className="outline-1 text-md">
            Resident Evil : Biohazard
            </h1>
            <p className="text-sm font-medium italic">
             Capcom
            </p>
          </div>

          <div className="price flex items-center gap-3 ">
            <span className="font-semibold text-gray-800">Rs 2500</span>
            <span className="font-thin line-through text-gray-400">Rs 1599</span>
            <span className="text-primary-color font-semibold">40% off</span>

          </div>

        </div>
      </div>
    </>
  );
};

export default ProductCard;
