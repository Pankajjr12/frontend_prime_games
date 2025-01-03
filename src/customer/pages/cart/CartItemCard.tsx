import React from "react";
import { Divider, Button, IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from '@mui/icons-material/Close';
import { CartItem } from "../../../types/cartTypes";
import { useAppDispatch } from "../../../state/store";
import { deleteCartItem, updateCartItem } from "../../../state/Customer/cartSlice";

interface CartItemProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (value: number) => {
    dispatch(
      updateCartItem({
        jwt: localStorage.getItem("jwt"),
        cartItemId: item.id,
        cartItem: { quantity: item.quantity + value },
      })
    );
  };

  const handleRemoveCartItem = () => {
    dispatch(
      deleteCartItem({
        jwt: localStorage.getItem("jwt") || "",
        cartItemId: item.id,
      })
    );
  };

  return (
    <div className="border rounded-md relative p-4 sm:p-5 md:p-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
        <div className="w-full sm:w-[160px] h-[120px] flex-shrink-0">
          <img
            className="w-full h-full object-cover rounded-md"
            src={item.product.images[0]}
            alt="product"
          />
        </div>

        <div className="space-y-2 sm:space-y-3 w-full">
          <h1 className="font-semibold text-lg">{item.product?.title}</h1>
          <span className="text-sm italic">({item.product?.seller?.businessDetails.businessName})</span>
          <p className="text-gray-600 font-medium text-sm line-clamp-2">
            {item.product?.description}
          </p>
          <p className="text-xs text-gray-400">
            <strong>Publisher</strong>
          </p>
          <p className="text-sm italic">Action-adventure</p>
          <p className="text-sm">
            <strong>Quantity: </strong>{item.quantity}
          </p>
        </div>
      </div>

      <Divider className="my-4" />

      <div className="flex justify-between mt-2 items-center flex-wrap">
        <div className="flex items-center gap-3">
          <Button
            className="border"
            disabled={item.quantity === 1}
            onClick={() => handleUpdateQuantity(-1)}
          >
            <RemoveCircleIcon />
          </Button>
          <span>{item.quantity}</span>
          <Button onClick={() => handleUpdateQuantity(1)}>
            <AddCircleIcon />
          </Button>
        </div>

        <div className="pr-3 sm:pr-5 mt-2 sm:mt-0">
          <p className="text-gray-700 font-medium">₹{item.sellingPrice.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
        <IconButton sx={{ color: "primary" }} onClick={handleRemoveCartItem}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItemCard;
