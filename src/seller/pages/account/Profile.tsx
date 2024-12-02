import { Avatar, Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ProfileCard from "../../../customer/components/ProfileCard";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PersonalDetailsForm from "./PersonalDetailsForm";
import BusinessDetailsForm from "./BusinessDetailsForm";
import PickupAddressForm from "./PickupAddressForm";
import BankDetailsForm from "./BankDetailsForm";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 32px)", // Subtract margin from the total width
  maxWidth: 400, // Maintain a maximum width
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
 
  const [selectedForm, setSelectedForm] = useState("persionalDetails");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = (formName: string) => {
    setOpen(true);
    setSelectedForm(formName);
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "personalDetails":
        return <PersonalDetailsForm onClose={handleClose} />;
      case "businessDetails":
        return <BusinessDetailsForm onClose={handleClose} />;
      case "pickupAddress":
        return <PickupAddressForm onClose={handleClose} />;
      case "bankDetails":
        return <BankDetailsForm onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="lg:p-20 space-y-20">
      <div className="w-full lg:w-[70%]  ">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Persional Details
          </h1>
          <div>
            <Button
              onClick={() => handleOpen("personalDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
        <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src="https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_640.jpg"
          />
          <div>
          <ProfileCard
              keys={"Seller Name"}
              value={"Thor"}
            />
               <ProfileCard
              keys={"Seller Email"}
              value={"Thor123@gmail.com"}
            />
               <ProfileCard
              keys={"Seller Mobile"}
              value={"+91 7865432145"}
            />
            <Divider />
          </div>
        </div>
      </div>

      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Bussiness Details
          </h1>
          <div>
            <Button
              onClick={() => handleOpen("businessDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>

        <div className=" ">
          <ProfileCard
            keys={"Business Name/Brand Name"}
            value={"Kumar thor sons"}
          />
          <Divider />
          <ProfileCard
            keys={"GSTIN"}
            value={"gsdtin236"}
          />
          <Divider />
          <ProfileCard
            keys={"Account Status"}
            value={"PENDING"}
          />
        </div>
      </div>

      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">Pickup Address</h1>
          <div>
            <Button
              onClick={() => handleOpen("pickupAddress")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="">
            <ProfileCard
              keys={"Adress"}
              value={"001 house D block infocity"}
            />
            <Divider />
            <ProfileCard
              keys={"City"}
              value={"Gandhinagar"}
            />
            <Divider />
            <ProfileCard
              keys={"State"}
              value={"Gujarat"}
            />
            <Divider />
            <ProfileCard
              keys={"Mobile"}
              value={"+91 656789876"}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">Bank Details</h1>
          <div>
            <Button
              onClick={() => handleOpen("bankDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="">
            <ProfileCard
              keys={"Account Holder Name"}
              value={"Chris Hemisworth"}
            />
            <Divider />
            <ProfileCard
              keys={"Account Number"}
              value={"4325678932"
              }
            />
            <Divider />
            <ProfileCard
              keys={"IFSC CODE"}
              value={"SBI1232"}
            />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{renderSelectedForm()}</Box>
      </Modal>

    </div>
  );
};

export default Profile;
