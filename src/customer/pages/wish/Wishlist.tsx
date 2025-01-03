import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";

import WishlistProductCard from "./WishlistProductCard";
import { getWishlistByUserId } from "../../../state/Customer/wishlistSlice";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlist, loading, error } = useAppSelector(
    (store) => store.wishlist
  ); // Assuming `wishlist` state is properly defined in the store

  // Dispatch the action when the component is mounted
  useEffect(() => {
    dispatch(getWishlistByUserId());
  }, [dispatch]);

  // Check if loading or error exists, and handle it accordingly
  if (loading) {
    return <div>Loading your wishlist...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="min-h-screen p-5 lg:p-20 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDVxeGtvMXduejJodGJ5NmU1bXVvYW54a2w0aXYxcXBhMWxmem85ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l658Uy0xSabZu/giphy.webp')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
      {wishlist?.products?.length ? (
        <section>
          <h1 className="space-x-2">
            <strong>My Wishlist</strong> <span className="p-2 bg-primary-color text-white rounded-lg">{wishlist.products.length} items</span>
          </h1>
          <div className="pt-10 flex flex-wrap gap-5">
            {wishlist.products.map((item) => (
              <WishlistProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : (
        <div className="h-full flex justify-center items-center flex-col">
          <div className="text-center py-5">
            <h1 className="text-lg font-medium">Hey, it feels so light!</h1>
            <p className="text-gray-500 text-sm">
              There is nothing in your wishlist, let's add some items.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
