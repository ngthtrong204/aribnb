import React, { useEffect, useState } from 'react'
import style from "./Header.module.scss"
import { DateRangePicker, SelectPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signout } from '../../slices/userSlice';
import { apiLayDanhSachViTri } from '../../api/roomAPI';
import { getRoomListByAddress, getRoomListDefault, selectedAddress } from '../../slices/roomSlice';
function Header() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   //Biến data vị trí
   const [dataVitri, setDataViTri] = useState([])
   const getDataViTri = async () => {
      try {
         const data = await apiLayDanhSachViTri()
         const newData = data.map((item) => {
            return { label: `${item.tenViTri}, ${item.tinhThanh}, ${item.quocGia}`, value: item.id }
         })
         setDataViTri(newData)
      } catch (error) {
         console.error(error);
      }
   }
   useEffect(() => {
      getDataViTri();
   }, []);
   //Hàm lấy id vị trí sau khi select
   const { idViTri } = useSelector((state) => state.room)
   const handSelectViTri = (idViTri) => {
      dispatch(selectedAddress(idViTri))
   }
   const handleSubmit = (idViTri) => {
      if (!idViTri) {
         dispatch(getRoomListDefault())
      } else {
         navigate("/")
         dispatch(getRoomListByAddress(idViTri))
      }
   }
   //Lấy biến state user từ store
   const { user } = useSelector((state) => state.user)
   //Hàm đăng xuất
   const handleSignOut = () => {
      dispatch(signout())
      navigate("/signin")
   }
   const [rangeWasPick, setRangeWasPick] = useState(null)
   const handleDateChange = (rangeWasPick) => {
      setRangeWasPick(rangeWasPick);
   };
   const { beforeToday } = DateRangePicker;
   return (
      <div className='container-fluid'>
         <nav className={`${style.myNavbar} navbar navbar-expand-lg bg-body-tertiary `} >
            <div className="container ">
               <a onClick={() => navigate("/")} className={` ${style.logo} navbar-brand`} href="#">
                  <img className='img-fluid m-0 p-0 d-block' src="../../../../img/navbar-logo.png" alt="" />
               </a>
               <div className={style.searchBox}>
                  <SelectPicker
                     className={` ${style.locationPicker} rounded-pill`}
                     label="Địa điểm"
                     appearance='subtle'
                     value={idViTri}
                     onSelect={handSelectViTri}
                     onClean={() => dispatch(selectedAddress(null))}
                     data={dataVitri}>
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
                  <button onClick={() => handleSubmit(idViTri)} className={`${style.submit} btn rounded-pill  pt-1`} >
                     Tìm kiếm <SearchIcon className='pb-0'></SearchIcon>
                  </button>
               </div>
               <div className={`${style.accountBox}`}>
                  <ul className="navbar-nav mb-2 mb-lg-0">
                     <li className={` ${style.button} nav-item dropdown ms-auto`} >
                        <a className={`${style.accountButton} btn nav-link px-2 rounded-pill `} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                           <span className="navbar-toggler-icon" />
                           <div className={`${style.imgBox} ms-1 `}>
                              {user?.avatar ? <img src={user.avatar} alt="avt" /> : <img src="https://i.pinimg.com/originals/78/33/ff/7833ff86244afcffb7953982047ee1d3.jpg" alt="avt" />}
                           </div>
                        </a>
                        <ul className={`dropdown-menu dropdown-menu-end position-absolute  `}>
                           {!user && <>
                              <li><a className="dropdown-item" href="#" onClick={() => navigate("/signin")}>Đăng nhập</a></li>
                              <li><hr className="dropdown-divider" /></li>
                              <li><a className="dropdown-item" href="#" onClick={() => navigate("/signup")} >Đăng ký</a></li>
                           </>}
                           {user && <>
                              <li><a onClick={() => navigate(`/user/${user.id}`)} className="dropdown-item" href="#">Thông tin cá nhân & Chuyến đi</a></li>
                              <li><hr className="dropdown-divider" /></li>
                              <li><a className="dropdown-item" onClick={handleSignOut}>Đăng xuất</a></li>
                           </>}
                        </ul>
                     </li>
                  </ul>
               </div>
            </div>
         </nav >
      </div >
   )
}

export default Header