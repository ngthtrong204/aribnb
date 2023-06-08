import React from 'react'
import style from './MainLayout.module.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
function MainLayout() {
   return (
      <div>
         <Header></Header>

         <Outlet></Outlet>
         
         <Footer></Footer>
      </div>
   )
}

export default MainLayout