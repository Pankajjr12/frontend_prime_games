import React, { useEffect } from 'react'
import CouponTable from './CouponTable'
import { useAppDispatch } from '../../../state/store'
import { fetchAllCoupons } from '../../../state/Admin/adminCouponSlice'


const Coupon = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAllCoupons(localStorage.getItem("jwt") || ""))
    }, [])
    return (
        <div>
            <CouponTable />
        </div>
    )
}

export default Coupon