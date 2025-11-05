import React from 'react';
import ShopByCategoryCard from './ShopByCategoryCard';
import { useAppSelector } from '../../../../state/store';

const ShopByCategory = () => {
  const homePage = useAppSelector((state) => state.homePage);

  // 🔧 Normalize data (unwrap nested list if present)
  const rawCategories = homePage.homePageData?.shopByCategories;
  const shopByCategories =
    Array.isArray(rawCategories) && Array.isArray(rawCategories[1])
      ? rawCategories[1]
      : Array.isArray(rawCategories)
      ? rawCategories
      : [];

  if (!shopByCategories.length) {
    console.warn('⚠️ shopByCategories empty or misformatted:', rawCategories);
    return <div className="text-center py-6 text-gray-400">No categories found</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-5 px-5 md:grid-cols-3 lg:grid-cols-4">
      {shopByCategories.map((item: any) => (
        <ShopByCategoryCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default ShopByCategory;
