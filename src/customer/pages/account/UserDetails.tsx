import React from "react";
import ProfileCard from "../../components/ProfileCard";
import { Divider } from "@mui/material";
import { useAppSelector } from "../../../state/store";

const UserDetails = () => {
  const { user } = useAppSelector((store) => store);
  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Personal Details
          </h1>
        </div>

        <div className="">
          <ProfileCard keys={"Name"} value={user.user?.fullName} />
          <Divider />
          <ProfileCard keys={"Email"} value={user.user?.email} />
          <Divider />
          <ProfileCard keys={"Mobile"} value={user.user?.mobile} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
