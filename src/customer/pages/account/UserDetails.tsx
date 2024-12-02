import React from "react";
import ProfileCard from "../../components/ProfileCard";
import { Divider } from "@mui/material";

const UserDetails = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Personal Details
          </h1>
        </div>

        <div className="">
          <ProfileCard keys="Name" value={"Pankaj"} />
          <Divider />
          <ProfileCard keys="Email" value={"Pankaj@gmail.com"} />
          <Divider />
          <ProfileCard keys="Mobile " value={"9876345672"} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
