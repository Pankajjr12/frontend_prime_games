import React from 'react';
import ShopByCategoryCard from './ShopByCategoryCard';
import { useAppSelector } from '../../../../state/store';

const ShopByCategory = () => {
  const { homePage} = useAppSelector((store) => store);
  return (
    <div className='grid grid-cols-2 gap-5 px-5 md:grid-cols-3 lg:grid-cols-4'>
       {homePage.homePageData?.shopByCategories.map((item)=><ShopByCategoryCard item={item}/>)}
    </div>
  );
}

export default ShopByCategory;
