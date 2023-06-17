import React from 'react'
import style from './AuthLayout.module.scss'
import { Outlet, useParams } from 'react-router-dom'
function AuthLayout() {
   const  test = useParams()
   console.log(test);
   return (
      <div className={`${style.main} bg-dark`}>
      
            
            <Outlet></Outlet>
         
      </div>
   )
}

export default AuthLayout