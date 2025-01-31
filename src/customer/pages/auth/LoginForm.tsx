import { Alert, Button, CircularProgress, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormikValues, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { sendLoginSignupOtp, signin } from '../../../state/Customer/authSlice';
import OtpInput from '../../components/OtpInput';

const LoginForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState<number>(30); // Timer state
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector(store => store);

  // Snackbar states
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    onSubmit: (values: any) => {
      // Handle form submission
      dispatch(signin({ email: values.email, otp, navigate }));
    },
  });

  const handleOtpChange = (otp: any) => {
    setOtp(otp);
  };

  const handleResendOTP = () => {
    // Implement OTP resend logic
    dispatch(sendLoginSignupOtp({ email: 'signing_' + formik.values.email }));
    console.log('Resend OTP');
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

  // Handle login success or failure
  useEffect(() => {
    if (auth.loginSuccess) {
      setSnackbarMessage('Login Successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      // Optionally reset loginSuccess if you don't want the message to persist
      setTimeout(() => {
          setOpenSnackbar(false);
      }, 6000);
  }

    if (auth.error) {
      setSnackbarMessage('Login failed. Please check your credentials.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [auth.loginSuccess]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer(prev => {
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
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">Login</h1>
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
          <div>
            <Button
              disabled={auth.loading}
              onClick={handleLogin}
              fullWidth
              variant="contained"
              sx={{ py: '11px' }}
            >
              {auth.loading ? <CircularProgress /> : 'Login'}
            </Button>
          </div>
        )}

        {!auth.otpSent && (
          <Button
            disabled={auth.loading}
            fullWidth
            variant="contained"
            onClick={handleSentOtp}
            sx={{ py: '11px' }}
          >
            {auth.loading ? <CircularProgress /> : 'Send OTP'}
          </Button>
        )}
      </form>

      {/* Snackbar Component */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginForm;
