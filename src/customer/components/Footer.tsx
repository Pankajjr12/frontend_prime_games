import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scrolling down
      setShowFooter(true);
    } else {
      // Scrolling up
      setShowFooter(false);
    }
    
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Box
      className="bg-primary-color text-white py-4"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        transform: showFooter ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <Typography className="font-medium" variant="body2" align="center">
        &copy; {new Date().getFullYear()} Kumar Gaming Store.{" "}
        <span className="font-semibold">All rights reserved.</span>
      </Typography>
    </Box>
  );
};

export default Footer;
