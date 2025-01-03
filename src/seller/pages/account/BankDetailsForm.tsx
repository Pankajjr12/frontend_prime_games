import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateDetailsFormProps } from "./BusinessDetailsForm";
import { Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { updateSeller } from "../../../state/Seller/sellerSlice";

const BankDetailsForm = ({ onClose }: UpdateDetailsFormProps) => {
  const { sellers } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      accountHolderName: "",
      accountNumber: "",
      ifsCode: "",
    },
    validationSchema: Yup.object({
      accountHolderName: Yup.string().required(
        "Account Holder Name is required"
      ),
      accountNumber: Yup.string().required("Account Number is required"),
      ifsCode: Yup.string().required("IFSC Code is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        updateSeller({
          bankDetails: values,
         
        })
      );
      onClose();
    },
  });

  useEffect(() => {
    if (sellers.profile) {
      formik.setValues({
        accountHolderName: sellers.profile.bankDetails?.accountHolderName || "",
        accountNumber: sellers.profile.bankDetails?.accountNumber || "",
        ifsCode: sellers.profile.bankDetails?.ifsCode || "",
      });
    }
  }, [sellers.profile]);
  return (
    <>
      <h1 className="text-xl pb-5 text-center font-bold text-gray-600">
        Bank Details
      </h1>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="accountHolderName"
          name="accountHolderName"
          label="Account Holder Name"
          value={formik.values.accountHolderName}
          onChange={formik.handleChange}
          error={
            formik.touched.accountHolderName &&
            Boolean(formik.errors.accountHolderName)
          }
          helperText={
            formik.touched.accountHolderName && formik.errors.accountHolderName
          }
        />
        <TextField
          fullWidth
          id="accountNumber"
          name="accountNumber"
          label="Account Number"
          value={formik.values.accountNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.accountNumber && Boolean(formik.errors.accountNumber)
          }
          helperText={
            formik.touched.accountNumber && formik.errors.accountNumber
          }
        />
        <TextField
          fullWidth
          id="ifscCode"
          name="ifscCode"
          label="IFSC Code"
          value={formik.values.ifsCode}
          onChange={formik.handleChange}
          error={formik.touched.ifsCode && Boolean(formik.errors.ifsCode)}
          helperText={formik.touched.ifsCode && formik.errors.ifsCode}
        />
        <Button
          sx={{ py: ".9rem" }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default BankDetailsForm;
