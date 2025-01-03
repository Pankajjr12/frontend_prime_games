import React, { useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../state/Customer/productSlice";
import ReviewForm from "./ReviewForm";

const WritingReview = () => {
  const dispatch = useAppDispatch();
  const { products, review } = useAppSelector((store) => store);

  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
    }
  }, [productId]);
  return (
    <div className="flex lg:px-20 mx-5 pb-2 flex-col lg:flex-row gap-10">
      <section className="w-full md:w-1/2 lg:w-[30%]  space-y-2">
        <img src={products.product?.images[0]} alt="no" />
        <div>
          <div>
            <p className="font-bold text-xl">
              {products.product?.seller?.businessDetails.businessName}
            </p>
            <p className="text-lg text-gray-600 ">{products.product?.title}</p>
          </div>

          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-semibold text-gray-800">
                ₹{products.product?.sellingPrice.toLocaleString("en-IN")}
              </span>
              <span className="font-thin line-through text-gray-400">
                ₹{products.product?.mrpPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-primary-color font-semibold">
                {products.product?.discountPercent}% off
              </span>
            </div>
            {/* <p className="text-sm text-gray-400">
              Inclusive of all taxes. Free Shipping above Rs 1500.
            </p> */}
          </div>
        </div>
      </section>

      <section className="w-full md:w-1/2 lg:w-[70%]">
        <h1 className="font-semibold text-2xl pb-4 text-gray-700">
          Write Your Review & Give Ratings
        </h1>
        <ReviewForm />
      </section>
    </div>
  );
};

export default WritingReview;
