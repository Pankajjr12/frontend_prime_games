import React from "react";
import { Divider, Button, IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from '@mui/icons-material/Close';

const CartItem = () => {
  const handleUpdateQuantity = () => {};
  return (
    <div className="border rounded-md relative">
      <div className="p-55 flex gap-3">
        <div>
          <img
            className="w-[90px]"
            src="https://images.hdqwalls.com/download/lara-croft-rise-of-the-tomb-raider-2017-9j-1080x1920.jpg"
            alt="no"
          />
        </div>

        <div className="space-y-2">
          <h1 className="font-semibold text-lg">Lara</h1>
          <p className="text-gray-600 font-medium text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
          </p>
          <p className="txt-xs text-gray-400 ">
            <strong>Publisher</strong>
          </p>
          <p className="text-sm italic">Action-adventure</p>
          <p className="text-sm">
            <strong>Quantity : </strong>5
          </p>
        </div>

        <Divider />
      </div>
      <Divider />
      <div className="flex justify-between items-center">
        <div className="px-5 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2 w-[140px] justify-between">
            <Button className="border" disabled={true}>
              <RemoveCircleIcon />
            </Button>
            <span>{5}</span>
            <Button onClick={handleUpdateQuantity}>
              <AddCircleIcon />
            </Button>
          </div>
        </div>
        <div className="pr-5">
          <p className="text-gray-700 font-medium">788</p>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <IconButton sx={{color:"primary"}}>
          <CloseIcon />
        </IconButton>

      </div>
    </div>
  );
};

export default CartItem;
