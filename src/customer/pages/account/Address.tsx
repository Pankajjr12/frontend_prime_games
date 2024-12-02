import React from "react";
import UserAddressCard from "./UserAddressCard";

const Address = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 4, 5].map(() => (
        <UserAddressCard />
      ))}
    </div>
  );
};

export default Address;
