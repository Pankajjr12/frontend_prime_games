import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../state/store';

const ElectronicsTable = () => {
    const { homePage } = useAppSelector((store) => store);
  return (
    <div>
      <HomeCategoryTable categories={homePage.homePageData?.dealCategories}/>
    </div>
  )
}

export default ElectronicsTable
