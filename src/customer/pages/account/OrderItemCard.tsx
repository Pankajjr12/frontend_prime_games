import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { Order, OrderItem } from "../../../types/orderType";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";

interface OrderItemCardProps {
  item: OrderItem;
  order: Order;
}
const OrderItemCard: React.FC<OrderItemCardProps> = ({ item, order }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/account/orders/${order.id}/${item.id}`)}
      className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer"
    >
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: "#AE1438" }}>
            <ElectricBoltIcon />
          </Avatar>
        </div>
        <div>
          <h1 className="font-bold text-primary-color">{order?.orderStatus}</h1>
          <p>Arriving by {formatDate(order.deliverDate)}</p>
        </div>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3">
        <div>
          <img
            className="w-[55px] h-[55px] rounded-full object-top object-cover"
            src={item.product.images[0]} alt="" 
          />
        </div>

        <div className="w-full space-y-2">
          <h1 className='font-bold'>{item.product.seller?.businessDetails.businessName}</h1>
          <p>
     
        {item.product.title}
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

export default OrderItemCard;
