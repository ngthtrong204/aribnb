import React from 'react'
import style from "./Loading.module.scss"
function Loading() {
   return (
      <div className={style.main}>
         <div className={`spinner-border text-danger ${style.item}`} role="status">
            <span className="visually-hidden"></span>
         </div>
      </div>

   )
}

export default Loading