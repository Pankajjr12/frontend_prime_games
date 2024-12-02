import React, { useState } from "react";
import { Button, Card, Divider } from "@mui/material";
import TransactionTable from "./TransactionTable";
import Payouts from "./Payouts";

const tab = [
  { name: "Transaction" },
  // { name: "Payouts" }
]
const Payment = () => {

  const [activeTab, setActiveTab] = useState(tab[0].name);

  const handleActiveTab = (item:any) => {
      setActiveTab(item.name);
  }
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card className="col-span-1 p-5 rounded-md space-y-4">
          <h1 className="text-gray-600 font-medium">Total Earning</h1>
          <h1 className="font-bold text-xl pb-1">₹ 1123</h1>
          <Divider />
          <p className="text-gray-600 font-medium pt-1">
            Last Payment : <strong>₹0</strong>
          </p>
        </Card>
      </div>

      <div className="mt-20">
        <div className="flex gap-4">
          {tab.map((item) => (
            <Button
              onClick={() => handleActiveTab(item)}
              variant={activeTab === item.name ? "contained" : "outlined"}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div className="mt-5">
          {activeTab === "Transaction" ? <TransactionTable /> : <Payouts />}
        </div>
      </div>
    </div>
  );
};

export default Payment;
