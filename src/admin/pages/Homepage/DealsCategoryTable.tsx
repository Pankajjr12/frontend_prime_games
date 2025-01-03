import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../state/store';

const DealsCategoryTable = () => {
  const { homePage} = useAppSelector((store) => store);

  return (
    <>
      <HomeCategoryTable categories={homePage.homePageData?.dealCategories}/>
    </>
  );
}

export default DealsCategoryTable
