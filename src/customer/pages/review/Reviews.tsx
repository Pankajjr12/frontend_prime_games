import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { Box, Divider, Grid, LinearProgress, Rating } from '@mui/material';

import RatingCard from './RatingCard';
import { fetchProductById } from '../../../state/Customer/productSlice';
import { fetchReviewsByProductId } from '../../../state/Customer/reviewSlice';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import ReviewCard from './ReviewCard';

const Reviews = () => {
    const dispatch = useAppDispatch();
    const { products, review } = useAppSelector(store => store)

    const { productId } = useParams()

    useEffect(() => {

        if (productId) {
            dispatch(fetchProductById(Number(productId)))
            dispatch(fetchReviewsByProductId({ productId: Number(productId) }))
        }

    }, [productId])

    return (
        <div className='p-5 lg:p-20 flex flex-col lg:flex-row gap-20'>
            <section className='w-full md:w-1/2 lg:w-[30%] space-y-2'>
                <img className='w-full' src={
                    products.product?.images[0]
                } alt="" />
                <div>
                    <div>
                        <p className='font-bold text-xl'> {products.product?.seller?.businessDetails.businessName}

                        </p>
                        <p className='text-lg text-gray-600'>{products.product?.title}</p>
                    </div>

                    <div className='price flex items-center gap-3 mt-5 text-lg'>
                        <span className='font-semibold text-gray-800' > ₹{products.product?.sellingPrice}</span>
                        <span className='text thin-line-through text-gray-400 '>₹{products.product?.mrpPrice}</span>
                        <span className='text-[#00927c] font-semibold'>{products.product?.discountPercent}% off</span>
                    </div>

                </div>
            </section>
            <section className="w-full md:w-1/2 lg:w-[70%]">
                <h1 className="font-semibold text-lg pb-4">
                    Review & Ratings
                </h1>

               <RatingCard/>
                <div className='mt-10'>
                    <div className="space-y-5">
                        {review.reviews.map((item, i) => (
                            <div className='space-y-5'>
                                <ReviewCard item={item} />
                                {review.reviews.length - 1 !== i && <Divider />}
                            </div>
                        ))}
                    </div>
                </div>



            </section>
        </div>
    )
}

export default Reviews