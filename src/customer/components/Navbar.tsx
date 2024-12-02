import React, { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ListItemButton from "@mui/material/ListItemButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../../data/mainCategory";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowBottomSheet(true);

    // Close the drawer when an item is clicked
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  const handleBottomSheetItemClick = (item) => {
    console.log("Bottom sheet item clicked:", item);

    // Close the bottom sheet when an item is clicked
    setShowBottomSheet(false);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Add your search logic here (e.g., navigating to a search results page)
    console.log("Searching for:", searchQuery);
  };

  return (
    <Box
      className="sticky top-0 left-0 right-0 bg-white"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        height: isSmall ? "60px" : "70px", // Adjust height for small screens
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
                    setSelectedCategory(item.categoryId);
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
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <TextField
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                InputProps={{
                  startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
                }}
                sx={{ width: "200px" }} // Adjust width as needed
              />
            </form>
          )}
          {false ? (
            <Button
              className="flex  items-center gap-1"
              onClick={() => navigate("account/orders")}
            >
              <Avatar
                sx={{ width: 28, height: 28 }}
                src="https://randomuser.me/api/portraits/women/79.jpg"
              />
              {!isSmall && <span className="font-semibold">Pankaj</span>}
            </Button>
          ) : (
            <Button variant="contained">Login</Button>
          )}
          {isLarge && (
            <IconButton>
              <FavoriteBorder sx={{ fontSize: 28 }} />
            </IconButton>
          )}
          <IconButton onClick={() => navigate("/cart")}>
            <ShoppingCartIcon sx={{ fontSize: 28 }} />
          </IconButton>
          {isLarge && (
            <Button
              onClick={() => navigate("/become-seller")}
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
            height: "50%", // Adjust height as needed
          },
        }}
      >
        <Box>
          <h2 className="font-bold text-lg mb-4">
            Selected Category: {selectedCategory}
          </h2>
          {/* Pass closeBottomSheet function to CategorySheet */}
          <CategorySheet selectedCategory={selectedCategory} />
        </Box>
      </Drawer>

      {/* Drawer for Mobile Menu */}
      <Drawer
        className="pt-20"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <List sx={{ padding: 2 }}>
          {" "}
          {/* Adding padding to the List for better spacing */}
          <h1
            onClick={() => navigate("/")}
            className="logo cursor-pointer text-lg text-primary-color mb-2" // Added margin-bottom
          >
            Prime GameStore
          </h1>
          {mainCategory.map((item) => (
            <ListItemButton
              key={item.categoryId}
              onClick={() => {
                handleCategoryClick(item.categoryId);
                handleDrawerToggle(); // Close drawer on click
              }}
              sx={{ justifyContent: "flex-start", padding: "10px 16px" }} // Adjust padding for ListItemButton
            >
              {item.name}
            </ListItemButton>
          ))}
          <div className="flex justify-center mt-3">
            {" "}
            {/* Centering the search field */}
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <TextField
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "200px", margin: "0 auto" }} // Centering and controlling width
              />
            </form>
          </div>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
