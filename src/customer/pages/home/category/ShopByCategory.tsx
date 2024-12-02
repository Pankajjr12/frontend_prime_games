import React from 'react';
import ShopByCategoryCard from './ShopByCategoryCard';

const ShopByCategory = () => {
  return (
    <div className='grid grid-cols-2 gap-5 px-5 md:grid-cols-3 lg:grid-cols-4'>
      {[2, 3, 2, 3, 4, 4, 6, 5, 3, 2, 3, 54, 56, 3].map((item, index) => (
        <div key={index}>
          <ShopByCategoryCard />
        </div>
      ))}
    </div>
  );
}

export default ShopByCategory;
