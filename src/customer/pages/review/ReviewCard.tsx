import React from "react";
import { Avatar, Box, Grid2, IconButton, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Review } from "../../../types/reviewTypes";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { deleteReview } from "../../../state/Customer/reviewSlice";
import { red } from "@mui/material/colors";

interface ProductReviewCardProps {
  item: Review;
}
const ReviewCard = ({ item }: ProductReviewCardProps) => {
  const [value, setValue] = React.useState(4.5);
  const { auth, user } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const handleDeleteReview = () => {
    dispatch(
      deleteReview({
        reviewId: item.id,
        jwt: localStorage.getItem("jwt") || "",
      })
    );
  };


const formattedDate = new Date(item.createdAt).toLocaleString('en-IN', {
  weekday: 'long', // Day of the week (e.g., "Monday")
  year: 'numeric', // Full year (e.g., "2024")
  month: 'long', // Full month name (e.g., "December")
  day: 'numeric', // Day of the month (e.g., "29")
  hour: 'numeric', // Hour (e.g., "3")
  minute: 'numeric', // Minute (e.g., "04")
  second: 'numeric', // Second (e.g., "21")
});

console.log(formattedDate); // Output: "Sunday, 29 December 2024, 3:04:21 PM"

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        p: 2,
        borderBottom: "1px solid #e0e0e0",
        borderRadius: 1,
        boxShadow: 2, // Add shadow effect
        backgroundColor: "white",
        transition: "0.3s", // Smooth transition for hover effect
        "&:hover": {
          boxShadow: 4, // Increase shadow on hover
        },
      }}
    >
      <Grid2 container spacing={9}>
        <Grid2 size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
              alt={item.user?.fullName}
            >
              {item.user?.fullName[0].toUpperCase()}
            </Avatar>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 9 }}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{item.user?.fullName}</p>
              <p className="opacity-70">{formattedDate}</p>
            </div>
          </div>

          <Rating
            readOnly
            value={item.rating}
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
          />
          <p> {item.reviewText}</p>
          <div>
            {item.productImages.map((image) => (
              <img
                key={image}
                className="w-24 h-24 object-cover"
                src={image}
                alt=""
              />
            ))}
          </div>
        </Grid2>
      </Grid2>
      <div>
        {item.user.id === user.user?.id && (
          <div className="">
            <IconButton onClick={handleDeleteReview}>
              <DeleteIcon sx={{ color:'#ff000089' }} />
            </IconButton>
          </div>
        )}
      </div>
    </Box>
  );
};

export default ReviewCard;
