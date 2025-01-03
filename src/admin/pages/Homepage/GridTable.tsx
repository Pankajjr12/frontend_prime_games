import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../state/store';

const GridTable = () => {
  const { homePage } = useAppSelector((store) => store);
  return (
    <div>
      <HomeCategoryTable categories={homePage.homePageData?.grid} />
    </div>
  )
}

export default GridTable
