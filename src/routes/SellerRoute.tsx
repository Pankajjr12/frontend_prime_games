import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Payment from '../seller/pages/payyment/Payment'

import Orders from '../seller/pages/orders/Orders'
import AddProductForm from '../seller/pages/products/AddProductForm'
import Products from '../seller/pages/products/Products'
import TransactionTable from '../seller/pages/payyment/TransactionTable'
import UpdateProductForm from '../seller/pages/products/UpdateProductForm'
import HomePage from '../seller/pages/sellerDashboard/HomePage'
import Inventory from '../seller/pages/inventory/Inventory'
import Profile from '../seller/pages/account/Profile'


const SellerRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<Products/>} />
        <Route path='/add-product' element={<AddProductForm />} />
        <Route path='/update-product/:productId' element={<UpdateProductForm />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/invetory' element={<Inventory />} />
        <Route path='/account' element={<Profile />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/transaction' element={<TransactionTable/>} />
       </Routes>
  )
}

export default SellerRoute
