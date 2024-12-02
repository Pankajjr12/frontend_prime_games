import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";

const OrderItem = () => {
  return (
    <div className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer">
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: "#AE1438" }} />
        </div>
        <div>
          <h1 className="font-bold text-primary-color">PENDING</h1>
          <p>Arrival By Mon, 15 June</p>
        </div>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3">
        <div>
          <img
            className="w-[55px] h-[55px] rounded-full object-top object-cover"
            src="https://imagesv2.desimartini.com/images/202410/alia-bhatt-1729836640.jpeg"
          />
        </div>

        <div className="w-full space-y-2">
          <h1>Creed Assasins</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, dicta
            nobis optio aspernatur repellat officia velit fuga deleniti aliquam
            id voluptas? Qui, voluptate aspernatur eaque laboriosam sit
            molestiae sed sint.
          </p>
          <p>
            <strong>Publisher : </strong>
            Ubisoft
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
