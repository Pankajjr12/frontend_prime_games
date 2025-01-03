import { Avatar, Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ProfileCard from "../../../customer/components/ProfileCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PersonalDetailsForm from "./PersonalDetailsForm";
import BusinessDetailsForm from "./BusinessDetailsForm";
import PickupAddressForm from "./PickupAddressForm";
import BankDetailsForm from "./BankDetailsForm";
import { useAppSelector } from "../../../state/store";

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
  const { sellers } = useAppSelector((store) => store);
  const [selectedForm, setSelectedForm] = useState("persionalDetails");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

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

  useEffect(() => {
    if (sellers.profileUpdated || sellers.error) {
      setOpenSnackbar(true);
    }
  }, [sellers.profileUpdated]);

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
              value={sellers.profile?.sellerName}
            />
            <ProfileCard keys={"Seller Email"} value={sellers.profile?.email} />
            <ProfileCard
              keys={"Seller Mobile"}
              value={sellers.profile?.mobile}
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
            value={sellers.profile?.businessDetails?.businessName}
          />
          <Divider />
          <ProfileCard
            keys={"GSTIN"}
            value={sellers.profile?.gstin || "not provided"}
          />
          <Divider />
          <ProfileCard
            keys={"Account Status"}
            value={sellers.profile?.accountStatus}
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
              value={sellers.profile?.pickupAddress?.address}
            />
            <Divider />
            <ProfileCard
              keys={"City"}
              value={sellers.profile?.pickupAddress?.city || "not provided"}
            />
            <Divider />
            <ProfileCard
              keys={"State"}
              value={sellers.profile?.pickupAddress?.state}
            />
            <Divider />
            <ProfileCard
              keys={"Mobile"}
              value={sellers.profile?.pickupAddress?.mobile}
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
              value={sellers.profile?.bankDetails?.accountHolderName}
            />
            <Divider />
            <ProfileCard
              keys={"Account Number"}
              value={
                sellers.profile?.bankDetails?.accountNumber || "not provided"
              }
            />
            <Divider />
            <ProfileCard
              keys={"IFSC CODE"}
              value={sellers.profile?.bankDetails?.ifsCode}
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
