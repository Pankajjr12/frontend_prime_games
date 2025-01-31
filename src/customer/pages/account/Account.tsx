import React, { useState } from "react";
import { Divider, Button } from "@mui/material";
import { isTemplateExpression } from "typescript";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import UserDetails from "./UserDetails";
import Address from "./Address";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { performLogout } from "../../../state/Customer/authSlice";

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
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleLogout = () => {
    dispatch(performLogout());
    navigate("/");
  };

  const handleClick = (item: any) => {
    if (item.name === "Logout") {
      handleLogout();
    } else navigate(`${item.path}`);
  };
  return (
    <div className="px-5 lg:px-52 min-h-screen mt-10">
      <div>
        <h1 className="text-xl font-bold pb-5">{user.user?.fullName}</h1>
      </div>
      <Divider />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]">
        <section className="col-span-1 lg:border-r lg:pr-5 py-5 h-full">
        <div className="col-span-1 lg:border-r lg:pr-5 py-5 h-full  flex flex-row flex-wrap lg:flex-col gap-3">
            {menu.map((item, index) => (
              <div
                onClick={() => handleClick(item)}
                className={`${menu.length - 1 !== index ? "border-b" : ""} ${
                  item.path == location.pathname
                    ? "bg-primary-color text-white"
                    : ""
                } px-5 py-3 rounded-md cursor-pointer `}
              >
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="right lg:col-span-2 lg:pl-5 py-5">
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/order/:orderId/:orderItemId"
              element={<OrderDetails />}
            />
            <Route path="/" element={<UserDetails />} />
            <Route path="/addresses" element={<Address />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default Account;
