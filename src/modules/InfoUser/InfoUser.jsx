import React from 'react'
import style from "./InfoUser.module.scss"
import User from './User/User'
import Trip from './Trip/Trip'
function InfoUser() {
   return (
      <div className=' container '>
         <div className="row">

            <User ></User>
            <Trip ></Trip>
         </div>
      </div>
   )
}

export default InfoUser