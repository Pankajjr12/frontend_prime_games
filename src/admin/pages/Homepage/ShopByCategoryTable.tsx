import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../state/store';

const ShopByCategoryTable = () => {
  const { homePage } = useAppSelector((store) => store);
  return (
    <div>
      <HomeCategoryTable categories={homePage.homePageData?.shopByCategories}/>
    </div>
  )
}

export default ShopByCategoryTable
