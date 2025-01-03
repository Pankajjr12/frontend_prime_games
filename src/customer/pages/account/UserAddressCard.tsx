import { Radio } from '@mui/material';
import React from 'react'
import { Address } from '../../../types/userTypes';

const UserAddressCard= ({item}:{item: Address}) => {
    const handleChange = (e: any) => {};
    return (
      <div className='p-5 border rounded-md '>
     
  
      <div className='space-y-3'>
          <h1 className='font-semibold'>{item.name}</h1>
          <p className='w-[320px]'>
              {item.address},
              {item.locality},
              {item.city},
              {item.state} - {item.pinCode}</p>
          <p><strong>Mobile : </strong> {item.mobile}</p>
      </div>
  </div>
    )
}

export default UserAddressCard
