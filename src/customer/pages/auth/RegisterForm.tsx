import { Button, CircularProgress, Snackbar, Alert, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormikValues, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { sendLoginSignupOtp, signup } from "../../../state/Customer/authSlice";
import OtpInput from "../../components/OtpInput";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState<number>(30); // Timer state
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);

  // Snackbar states
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      name: "",
      mobile: "", // Changed countryCode and mobile to mobile
    },
    onSubmit: (values: any) => {
      // Handle form submission
      dispatch(
        signup({
          fullName: values.name,
          email: values.email,
          otp,
          mobile: values.mobile, // Send mobile with country code
          navigate,
        })
      );
    },
  });

  const handleOtpChange = (otp: any) => {
    setOtp(otp);
  };

  const handleResendOTP = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
    setTimer(30);
    setIsTimerActive(true);
  };

  const handleSentOtp = () => {
    setIsOtpSent(true);
    handleResendOTP();
  };

  const handleLogin = () => {
    formik.handleSubmit();
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Handle success/error messages from the auth state
  useEffect(() => {
    if (auth.loginSuccess) {
      setSnackbarMessage('Register Successfully! 👍');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      // Optionally reset loginSuccess if you don't want the message to persist
      setTimeout(() => {
          setOpenSnackbar(false);
      }, 6000);
  }

    if (auth.error) {
      setSnackbarMessage('Registration failed. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [auth]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 30; // Reset timer for next OTP request
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]);

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-5">Signup</h1>
      <form className="space-y-5">
        <TextField
          fullWidth
          name="email"
          label="Enter Your Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email ? formik.errors.email as string : undefined}
        />

        {auth.otpSent && (
          <div className="space-y-2">
            <p className="font-medium text-sm">* Enter OTP sent to your mobile number</p>
            <OtpInput length={6} onChange={handleOtpChange} error={false} />
            <p className="text-xs space-x-2">
              {isTimerActive ? (
                <span>Resend OTP in {timer} seconds</span>
              ) : (
                <>
                  Didn’t receive OTP?{" "}
                  <span
                    onClick={handleResendOTP}
                    className="text-teal-600 cursor-pointer hover:text-teal-800 font-semibold"
                  >
                    Resend OTP
                  </span>
                </>
              )}
            </p>
            {formik.touched.otp && formik.errors.otp && <p>{formik.errors.otp as string}</p>}
          </div>
        )}

        {auth.otpSent && (
          <TextField
            fullWidth
            name="name"
            label="Enter Your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name ? formik.errors.name as string : undefined}
          />
        )}

        {auth.otpSent && (
          <div>
            <Button
              disabled={auth.loading}
              onClick={handleLogin}
              fullWidth
              variant="contained"
              sx={{ py: "11px" }}
            >
              {auth.loading ? (
                <CircularProgress size="small" sx={{ width: "27px", height: "27px" }} />
              ) : (
                "Signup"
              )}
            </Button>
          </div>
        )}

        {!auth.otpSent && (
          <Button
            fullWidth
            variant="contained"
            onClick={handleSentOtp}
            disabled={auth.loading}
            sx={{ py: "11px" }}
          >
            {auth.loading ? (
              <CircularProgress size="small" sx={{ width: "27px", height: "27px" }} />
            ) : (
              "Send OTP"
            )}
          </Button>
        )}
      </form>

      {/* Snackbar Component */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterForm;
