import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { teal } from "@mui/material/colors";
import {
  Divider,
  Button,
  Modal,
  Box,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import WalletIcon from "@mui/icons-material/Wallet";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import SimilarProduct from "./SimilarProduct";
import Alert from "@mui/material/Alert";
import ReviewCard from "../review/ReviewCard";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  fetchProductById,
  getAllProducts,
} from "../../../state/Customer/productSlice";
import ZoomableImage from "../product/ZoomableImage";
import { addItemToCart } from "../../../state/Customer/cartSlice";
import { fetchReviewsByProductId } from "../../../state/Customer/reviewSlice";
import RatingCard from "../review/RatingCard";
import { addProductToWishlist } from "../../../state/Customer/wishlistSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "100%",
  boxShadow: 24,
  outline: "none",
};

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { products, review } = useAppSelector((store) => store);
  const { productId, categoryId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // ✅ Loading State
  const [loading, setLoading] = useState(true);

  // ✅ Scroll to Top on page load and when productId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  useEffect(() => {
    if (productId) {
      setLoading(true);
      Promise.all([
        dispatch(fetchProductById(Number(productId))),
        dispatch(fetchReviewsByProductId({ productId: Number(productId) })),
      ]).finally(() => setLoading(false));
    }
  }, [productId]);

  useEffect(() => {
    dispatch(getAllProducts({ category: categoryId }));
  }, [categoryId]);

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const handleAddCart = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(
        addItemToCart({
          jwt,
          request: { productId: Number(productId), year: "2018", quantity },
        })
      );
      setSnackbarMessage("Item added to cart successfully!");
    } else {
      setSnackbarMessage("Please login first to add item to cart");
    }
    setOpenSnackbar(true);
  };

  const handleAddWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsFavorite((prev) => !prev);
      if (productId) {
        dispatch(addProductToWishlist({ productId: Number(productId) }));
      }
      setSnackbarMessage("Item added to wishlist successfully!");
    } else {
      setSnackbarMessage("Please login first to add item to wishlist");
    }
    setOpenSnackbar(true);
  };

  // ✅ Show Loader While Fetching Data
  if (loading || !products.product) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className="px-5 lg:px-20 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <section className="flex flex-col lg:flex-row gap-2">
            <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
              {products.product?.images.map((item, index) => (
                <img
                  key={item || index}
                  onClick={() => setSelectedImage(index)}
                  className="lg:w-full w-[50px] cursor-pointer rounded-md"
                  src={item}
                  alt=""
                />
              ))}
            </div>
            <div className="w-full lg:w-[85%]">
              <img
                onClick={handleOpen}
                className="w-full rounded-md cursor-zoom-out"
                src={products.product?.images[selectedImage]}
                alt=""
              />

              {/* <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary-color p-2 rounded-md"
            >
              <span className="text-white">&#8592;</span>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-color p-2 rounded-md"
            >
              <span className="text-white font-bold">&#8594;</span>
            </button> */}
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ZoomableImage
                  src={products.product?.images[selectedImage]}
                  alt=""
                />
              </Box>
            </Modal>
          </section>
          <section>
            <h1 className="font-bold text-lg lg:text-4xl  text-primary-color">
              {products.product?.title}
            </h1>
            <p className="text-gray-500 font-semibold">
              {products.product?.brand}
            </p>
            <div className="flex justify-between items-center gap-2 py-2 px-3 mt-5 border rounded-lg shadow-sm w-[240px] bg-white">
              {/* Ratings */}
              <div className="flex items-center gap-1">
                <span className="font-medium text-gray-700">
                  {products.product?.numRatings}
                </span>
                <StarIcon sx={{ color: teal[500], fontSize: "18px" }} />
              </div>

              <Divider
                orientation="vertical"
                flexItem
                className="border-gray-300"
              />

              {/* Platform */}
              <span
                className="text-gray-500 text-sm italic underline-animate truncate"
                style={{
                  color: products.product?.platform || "#650404", // fallback color if you want platform color
                }}
              >
                {products.product?.platform}
              </span>
            </div>

            <div>
              <div className="price flex items-center gap-3 mt-5 text-2xl">
                <span className="font-semibold text-gray-800">
                  ₹{products.product?.sellingPrice.toLocaleString("en-IN")}
                </span>
                <span className="font-thin line-through text-gray-400">
                  ₹{products.product?.mrpPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-primary-color font-semibold">
                  {products.product?.discountPercent}% off
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Inclusive of all taxes. Free Shipping above Rs 1500.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-4">
                <ShieldIcon sx={{ color: teal[500] }} />
                <p>Quality Product Assurance</p>
              </div>
              <div className="flex items-center gap-4">
                <WorkspacePremiumIcon sx={{ color: teal[500] }} />
                <p>100% money back guarantee</p>
              </div>
              <div className="flex items-center gap-4">
                <LocalShippingIcon sx={{ color: teal[500] }} />
                <p>Free Shipping & Returns</p>
              </div>
              <div className="flex items-center gap-4">
                <WalletIcon sx={{ color: teal[500] }} />
                <p>Pay on Delivery might be available</p>
              </div>
            </div>

            <div className="mt-6 space-y-2 ">
              <h1>QUANTITY</h1>
              <div className="flex items-center gap-2 w-[140px] justify-between">
                <Button
                  className="border"
                  disabled={quantity == 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  <RemoveCircleIcon />
                </Button>
                <span>{quantity}</span>
                <Button onClick={() => setQuantity(quantity + 1)}>
                  <AddCircleIcon />
                </Button>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-5">
              <Button
                variant="contained"
                fullWidth
                onClick={handleAddCart}
                startIcon={<ShoppingCartIcon />}
                sx={{
                  backgroundColor: "primary.main", // Use theme colors
                  color: "white", // Text color
                  "&:hover": {
                    backgroundColor: "primary.dark", // Darker shade on hover
                  },
                }}
              >
                Add To Cart
              </Button>

              <Button
                variant="outlined"
                onClick={handleAddWishlist}
                fullWidth
                startIcon={<FavoriteBorder />}
              >
                Wishlist
              </Button>
            </div>
            <div className="mt-5">
              <p>{products.product?.description}</p>
            </div>
            <div className="ratings w-full mt-10">
              <h1 className="font-semibold text-lg pb-4">Review & Ratings</h1>

              <RatingCard totalReview={review.reviews.length} />
              <div className="mt-10">
                <div className="space-y-5">
                  {review.reviews.map((item, i) => (
                    <div className="space-y-5" key={item.id}>
                      <ReviewCard item={item} />
                      <Divider />
                    </div>
                  ))}
                  <Button onClick={() => navigate(`/reviews/${productId}`)}>
                    View All {review.reviews.length} Reviews
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-20">
          <h1 className="text-2xl font-bold">Similar Product</h1>
          <div className="pt-5">
            {/* ✅ Refresh SimilarProduct when clicking new product */}
            <SimilarProduct
              currentProductId={Number(productId)}
              key={productId}
            />
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetails;
