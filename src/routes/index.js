import React from 'react'
import { Route, Routes } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import HomePages from '../pages/HomePages';
import DetailPages from '../pages/DetailPages';
import CheckoutCompletedPage from '../pages/CheckoutCompletedPage';
import CheckoutPages from '../pages/CheckoutPages'
import OrderPages from '../pages/OrderPages';
import BlankLayout from '../layouts/BlankLayout';
import LoginPages from '../pages/LoginPages';
import RegisterPages from '../pages/RegisterPage';
import NotFoundPages from '../pages/NotFoundPages';
import AuthRequire from './AuthRequire';


function Router() {
  return (
    <Routes>
        <Route path='/' element={
          <AuthRequire>
            <MainLayout/>
          </AuthRequire>
        }>
            <Route index element={<HomePages/>}/>
            <Route path='/products/:id' element={<DetailPages/>}/>
            <Route path="/checkout" element={<CheckoutPages />} />
            <Route path='checkout/completed' element={<CheckoutCompletedPage/>}/>
            <Route path='/orders' element={<OrderPages/>}/>
        </Route>
        <Route element={<BlankLayout/>}>
            <Route path='/login' element={<LoginPages/>}/>
            <Route path='/register' element={<RegisterPages/>}/>
            <Route path='*' element={<NotFoundPages/>}/>
        </Route>
    </Routes>

  )
}

export default Router