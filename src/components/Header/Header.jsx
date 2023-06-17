import React, { useState } from 'react'
import style from "./Header.module.scss"
import { DateRangePicker, SelectPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search'
function Header() {
   const [rangeWasPick, setRangeWasPick] = useState(null)
   const handleDateChange = (rangeWasPick) => {
      setRangeWasPick(rangeWasPick);
   };
   const { beforeToday } = DateRangePicker;


   const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
      item => ({ label: item, value: item })
   );
   return (

      <div className='container-fluid'>
         <nav className={`${style.myNavbar} navbar navbar-expand-lg bg-body-tertiary `} >
            <div className="container ">
               <a className={` ${style.logo} navbar-brand`} href="#">
                  <img className='img-fluid m-0 p-0 d-block' src="./img/navbar-logo.png" alt="" />
               </a>




               <div className={style.searchBox}>
                  <SelectPicker
                     className={` ${style.locationPicker} rounded-pill`}
                     label="Địa điểm"
                     appearance='subtle'
                     data={data}>
                  </SelectPicker>


                  <DateRangePicker
                     className={`${style.datePicker} rounded-pill text-success mx-2`}
                     appearance='subtle'
                     disabledDate={beforeToday()}
                     onChange={handleDateChange}
                     value={rangeWasPick}
                     placeholder="Check in ~ Check out"
                     format='dd/MM/yyyy' character=" ~ ">
                  </DateRangePicker>

                  <button className={`${style.submit} btn rounded-pill  pt-1`} >
                     Tìm kiếm <SearchIcon className='pb-0'></SearchIcon>
                  </button>
               </div>





               <div className={`${style.accountBox}`}>
                  <ul className="navbar-nav mb-2 mb-lg-0">
                     <li className={` ${style.button} nav-item dropdown ms-auto`} >
                        <a className={`${style.accountButton} btn nav-link px-2 rounded-pill `} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                           <span className="navbar-toggler-icon" />
                           <div className={`${style.imgBox} ms-1 `}>
                              {/* nơi nhận src ảnh avt user */}
                              <img src="https://i.pinimg.com/564x/a0/c9/b2/a0c9b23b1c7bbdfe97272d5cbb8c124f.jpg" alt="avt" />
                           </div>
                        </a>
                        <ul className={`dropdown-menu dropdown-menu-end position-absolute  `}>
                           <li><a className="dropdown-item" href="#">Đăng nhập</a></li>
                           <li><a className="dropdown-item" href="#">Đăng ký</a></li>

                           <li><hr className="dropdown-divider" /></li>

                           <li><a className="dropdown-item" href="#">Chuyến đi</a></li>
                           <li><a className="dropdown-item" href="#">Thông tin cá nhân</a></li>
                           <li><hr className="dropdown-divider" /></li>
                           <li><a className="dropdown-item" href="#">Cho thuê nhà</a></li>
                           <li><hr className="dropdown-divider" /></li>
                           <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
                        </ul>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>



      </div>
   )
}

export default Header