import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItemButton,
  TextField,
  InputAdornment,
  Divider,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../../data/mainCategory";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/store";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategorySheet, setShowCategorySheet] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
const auth = useAppSelector((state) => state.auth);
const cart = useAppSelector((state) => state.cart);
const sellers = useAppSelector((state) => state.sellers);


  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (!user.user) {
      // User has logged out, or there is no user
      // Reset any state or UI changes related to the logged-out state here if necessary
    }
  }, [user.user]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowBottomSheet(true);
    if (drawerOpen) {
      setDrawerOpen(false);
    } else if (showBottomSheet) {
      setShowBottomSheet(false);
    }
  };

  const handleBottomSheetItemClick = (item) => {
    console.log("Bottom sheet item clicked:", item);
    setShowBottomSheet(false);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const becomeSellerClick = () => {
    if (sellers.profile?.id) {
      navigate("/seller");
    } else navigate("/become-seller");
  };
  const handleSearchSubmit = () => {
    navigate("/search-products");
    setDrawerOpen(false); // Close drawer on search
  };

  const handleWishlist = () => {
    navigate("/wishlist");
    setDrawerOpen(false); // Close drawer on search
  };


  return (
    <Box
      className="sticky top-0 left-0 right-0 bg-white"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        height: isSmall ? "60px" : "70px",
        zIndex: 1,
      }}
    >
      <div className="flex items-center lg:justify-between px-2 lg:px-10 h-full">
        <div className="flex items-center gap-2">
          {!isLarge && (
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          {isLarge && (
            <h1
              onClick={() => navigate("/")}
              className={`logo cursor-pointer ${
                isSmall ? "text-lg" : "text-2xl"
              } text-primary-color`}
            >
              Prime GameStore
            </h1>
          )}
          {isLarge && (
            <ul className="flex items-center font-medium text-gray-800">
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseLeave={() =>
                    !showCategorySheet && setShowCategorySheet(false)
                  }
                  onMouseEnter={() => {
                    setShowCategorySheet(true);
                    setSelectedCategory(item?.categoryId);
                  }}
                  className="mainCategory hover:text-primary-color cursor-pointer px-2 py-1 hover:border-b-2 flex items-center transition-all duration-300 ease-in-out"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex gap-2 items-center ml-auto">
          {isLarge && (
            <IconButton onClick={() => navigate("/search-products")}>
              <SearchIcon className="text-gray-700" sx={{ fontSize: 29 }} />
            </IconButton>
          )}

          {user.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2"
            >
              <Avatar
                sx={{ width: 30, height: 30 }}
                src="https://c.tenor.com/6pRZ6DfX7BMAAAAd/tenor.gif"
              />
              <h1 className="font-semibold hidden lg:block">
                {user.user?.fullName?.split(" ")[0]}
              </h1>
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AccountCircleIcon sx={{ fontSize: "12px" }} />}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}

          {isLarge && (
            <IconButton onClick={() => navigate("/wishlist")}>
              <FavoriteBorder sx={{ fontSize: 28 }} />
            </IconButton>
          )}
          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.cart?.cartItems.length} color="primary">
              <ShoppingCartIcon
                sx={{ fontSize: 29 }}
                className="text-gray-700"
              />
            </Badge>
          </IconButton>
          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon />}
              variant="outlined"
            >
              Seller
            </Button>
          )}
        </div>
      </div>

      {showCategorySheet && (
        <div
          onMouseLeave={() => setShowCategorySheet(false)}
          className={`categorySheet absolute top-[4.5rem] left-20 right-20 border ${
            showCategorySheet ? "show" : ""
          }`}
        >
          <CategorySheet selectedCategory={selectedCategory} />
        </div>
      )}

      <Drawer
        anchor="bottom"
        open={showBottomSheet}
        onClose={closeBottomSheet}
        sx={{
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 2,
            height: "60%",
          },
        }}
      >
        <Box>
          <h2 className="font-bold text-lg mb-4">
            Selected Category: {selectedCategory}
          </h2>
          <CategorySheet
            selectedCategory={selectedCategory}
            setShowSheet={showBottomSheet}
          />
        </Box>
      </Drawer>

      {/* Mobile Drawer with Search Field */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List sx={{ padding: 3, marginTop: 4 }}>
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="logo cursor-pointer text-xl sm:text-2xl text-primary-color mb-6 text-center sm:text-left"
          >
            Prime GameStore
          </h1>

          {/* Category List */}
          {mainCategory.map((item) => (
            <ListItemButton
              key={item.categoryId}
              onClick={() => {
                handleCategoryClick(item.categoryId);
                handleDrawerToggle();
              }}
              sx={{
                justifyContent: "flex-start",
                padding: "12px 20px", // Increased padding for better touch experience
                fontSize: "16px", // Improved font size for readability
                marginBottom: 1, // Added space between list items
              }}
            >
              {item.name}
            </ListItemButton>
          ))}

          {/* Divider after Categories */}
          <Divider sx={{ margin: "16px 0", borderColor: "#e0e0e0" }} />

          {/* Search Section */}
          <div className="flex flex-col mt-4 space-y-4 p-3">
            <p className="text-sm  text-gray-600" onClick={handleWishlist}>My Wishlist</p>

            {/* Search Box */}
            <div
              className="bg-slate-100 rounded-lg shadow-md cursor-pointer flex items-center p-3"
              onClick={handleSearchSubmit}
            >
              <SearchIcon className="mr-2 text-primary-color" />
              <span className="text-black text-sm sm:text-base">
                Search here !!
              </span>
            </div>
          </div>

          {/* Divider before Search */}
          <Divider sx={{ margin: "16px 0", borderColor: "#e0e0e0" }} />
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
