import React from "react";
import { Divider, Button } from "@mui/material";
import { isTemplateExpression } from "typescript";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import UserDetails from "./UserDetails";
import Address from "./Address";

const menu = [
  {
    name: "Orders",
    path: "/account/orders",
  },
  {
    name: "Profile",
    path: "/account",
  },
  {
    name: "Saved Cards",
    path: "/account/saved-cards",
  },
  {
    name: "Addresses",
    path: "/account/addresses",
  },
  {
    name: "Logout",
    path: "/",
  },
];

const Account = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const handleClick = (item: any) => navigate(item.path);
  return (
    <div className="px-5 lg:px-52 min-h-screen mt-10">
      <div>
        <h1 className="text-xl font-bold pb-5">Pankaj</h1>
      </div>
      <Divider />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]">
      <section className="col-span-1 lg:border-r lg:pr-5 py-5 h-full">
  <ul className="space-y-5">
    {menu.map((item) => (
      <li key={item.name}>
        <div
          onClick={() => handleClick(item)}
          className={`${
            item.path === location.pathname
              ? "bg-primary-color text-white"
              : ""
          } py-3 text-sm cursor-pointer hover:text-white hover:bg-primary-color px-5 rounded-md border-b transition-all duration-200 ease-in-out`}
          style={{ height: '50px' }} // Optional: set a fixed height
        >
          <p>{item.name}</p>
        </div>
      </li>
    ))}
  </ul>
</section>

        <section className="right lg:col-span-2 lg:pl-5 py-5">
          <Routes>
            <Route path="/orders"  element={<Orders />} />
            <Route path="/order/:orderId/:orderItemId"  element={<OrderDetails />} />
            <Route path="/"  element={<UserDetails />} />
            <Route path="/addresses"  element={<Address />} />
          </Routes>
  

        
        </section>
      </div>
    </div>
  );
};

export default Account;
