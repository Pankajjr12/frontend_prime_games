import React, { useEffect, useState } from "react";
import AdminDrawerList from "../../components/AdminDrawerList";
import AdminRoute from "../../../routes/AdminRoute";
import { Alert, Snackbar } from "@mui/material";
import { useAppSelector } from "../../../state/store";

const AdminDashboard = () => {
  const { deal,admin } = useAppSelector(store => store)
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }
  useEffect(() => {
    if (deal.dealCreated || deal.dealUpdated ||deal.error || admin.categoryUpdated) {
      setOpenSnackbar(true)
    }
  }, [deal.dealCreated, deal.dealUpdated, deal.error,admin.categoryUpdated])
  const toggleDrawer = () => {};
  return (
    <div>
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <AdminDrawerList toggleDrawer={toggleDrawer} />
        </section>
        <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
          <AdminRoute />
        </section>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen} autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={deal.error ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {deal.error ? deal.error : deal.dealCreated ? "Deal created successfully" : deal.dealUpdated ? "deal updated successfully" : admin.categoryUpdated?"Category Updated successfully": ""}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminDashboard;
