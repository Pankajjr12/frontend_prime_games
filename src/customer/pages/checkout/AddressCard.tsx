import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@mui/material";

const AddressCard = () => {
  const handleChange = (e: any) => {};
  return (
    <div className="p-5 border rounded-md">
      <div>
        <Radio checked={true} value="" name="radio" onChange={handleChange} />
      </div>

      <div className="space-y-3 pt-3">
        <p>Pankaj</p>
        <p className="w-[300px]">Opposite Partap Fuel Pump ,Allahabad,Hoshiarpur 146001</p>
        <p>Mobile : 987654321</p>
      </div>
    </div>
  );
};

export default AddressCard;
