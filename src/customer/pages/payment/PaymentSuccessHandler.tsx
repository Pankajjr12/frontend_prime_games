import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { paymentSuccess } from '../../../state/Customer/orderSlice';
import { Backdrop, Button, CircularProgress } from '@mui/material';

const PaymentSuccessHandler = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { orders } = useAppSelector(store => store)
    const navigate=useNavigate();

    const getQueryParam = (key: string): string | null => {
        const params = new URLSearchParams(location.search);
        return params.get(key);
    };
    const paymentId = getQueryParam("razorpay_payment_id");
    const paymentLinkId = getQueryParam("razorpay_payment_link_id");
    // const paymentId="cs_test_a1eU8pFuXZJlg3tiahN153QykvQl6LI5hLgSnUUh01alidIPrMU8KyDx67"

    useEffect(() => {
        if (paymentId) {
            dispatch(
                paymentSuccess({
                    paymentId,
                    paymentLinkId: paymentLinkId || "",
                    jwt: localStorage.getItem("jwt") || "",
                })
            );
        }
    }, [paymentId]);


    return (
        <div className="min-h-[90vh] flex justify-center items-center">
            {orders ? <div className="bg-primary-color text-white p-8 w-[90%] lg:w-[25%] border rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center">
                <h1 className="text-3xl font-semibold">Congratulations!</h1>
                <h1 className="text-2xl font-semibold">Your Order Get Success</h1>
                <div>
                    <Button onClick={()=>navigate("/")} color="secondary" variant="contained">Shopping More</Button>
                </div>

            </div> : <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            //   onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
           
        </div>
    );
};

export default PaymentSuccessHandler;