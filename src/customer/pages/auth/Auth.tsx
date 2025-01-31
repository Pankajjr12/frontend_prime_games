import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Alert, Button, Snackbar } from "@mui/material";
import { useAppSelector } from "../../../state/store";

const footerImages = [
  {
    name: "",
    image: "https://i.ibb.co/tK91rdr/21.jpg",
  },
  {
    name: "Tomb Raider",
    image: "https://i.ibb.co/s1B8KqN/banner-tomb.jpg",
  },
  {
    name: "God of War",
    image: "https://i.ibb.co/gWhhdYn/banner-god.jpg",
  },
  {
    name: "Walking Dead",
    image: "https://i.ibb.co/vkKWcnq/banner-dead.jpg",
  },
  {
    name: "Creed",
    image: "https://i.ibb.co/y0Y95VR/banner-creed.jpg",
  },
];

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const handleCloseSnackbar = () => setSnackbarOpen(false);
  const { auth } = useAppSelector((store) => store);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % footerImages.length
        );
      }, 10000); // Change image every 10 seconds
  
      return () => clearInterval(intervalId);
    }, []);
  
    const img = footerImages[currentImageIndex].image;

  useEffect(() => {
    if (auth.otpSent || auth.error) {
      setSnackbarOpen(true);
      console.log("store ", auth.error);
    }
  }, [auth.otpSent, auth.error]);

  return (
    <div className="flex justify-center h-[90vh] items-center">
      <div className="max-w-md h-[85vh] rounded-md border shadow-lg ">
        <img className="w-full rounded-t-md" src={img} alt="" />
        <div className="mt-8 px-10">
          {isLoginPage ? <LoginForm /> : <RegisterForm />}

          <div className="flex items-center gap-1 justify-center mt-5">
            <p>{isLoginPage && "Don't"} have Account ?</p>
            <Button onClick={() => setIsLoginPage(!isLoginPage)} size="small">
              {isLoginPage ? "create account" : "login"}
            </Button>
          </div>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={auth.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {auth.error ? auth.error : " otp sent to your email!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Auth;
