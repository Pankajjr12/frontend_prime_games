import React from "react";
import { Avatar, Box, Grid2, IconButton, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ReviewCard = () => {
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
            ></Avatar>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 9 }}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">Pankaj</p>
              <p className="opacity-70">Pankajkhj</p>
            </div>
          </div>

          <Rating readOnly value={4.5} precision={0.5} />
          <p>Awesome game, great story, good to buy.</p>
          <div>
            <img
              className="w-24 h-24 object-cover"
              src="https://starsbiopedia.com/wp-content/uploads/2022/12/Liya-Silver-9-780x975.jpg"
              alt=""
            />
          </div>
        </Grid2>
      </Grid2>
      <div>
        <IconButton onClick={() => console.log("Delete action triggered")}>
          <DeleteIcon sx={{ color: "red" }} />
        </IconButton>
      </div>
    </Box>
  );
};

export default ReviewCard;
