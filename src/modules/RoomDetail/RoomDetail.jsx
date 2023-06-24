import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from "swiper";
import style from "./RoomDetail.module.scss"
import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Comment from './Comment/Comment';
import Icon from '../../components/Icon/Icon';
import { DateRangePicker } from 'rsuite';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetAddressById, apiGetRoomInfo } from '../../api/roomAPI';
import { useSelector } from 'react-redux';
import { apiBooking } from '../../api/booking';
import Loading from '../../components/Loading/Loading';
function RoomDetail() {

   const navigate = useNavigate()
   const [thumbsSwiper, setThumbsSwiper] = useState(null);
   const { beforeToday } = DateRangePicker;
   const [nightNumber, setNightNumber] = useState(0)
   const [tongTien, setTongTien] = useState(0)

   //lấy mã người dùng
   const { user } = useSelector((state) => state.user)
   //hàm lấy dữ liệu chi tiết phòng
   const { roomId } = useParams()
   const [roomDetail, setRoomDetail] = useState(null)
   const getRoomDetail = async (roomId) => {
      try {
         const data = await apiGetRoomInfo(roomId)
         const viTri = await apiGetAddressById(data.maViTri)
         const newData = { ...viTri, ...data }
         setRoomDetail(newData)
      } catch (error) {
         console.log(error);
      }
   }

   //state quản lý dữ liệu truyền lên khi đặt phòng
   const [values, setValues] = useState({
      maPhong: roomId,
      ngayDen: null,
      ngayDi: null,
      soLuongKhach: 0,
      maNguoiDung: user ? user.id : null,
   })

   const handleDateChange = (rangePicker) => {
      if (!rangePicker) {
         setNightNumber(0)
         return
      }
      setValues({ ...values, ngayDen: rangePicker[0], ngayDi: rangePicker[1] });
      const timeDiff = Math.abs(rangePicker[0].getTime() - rangePicker[1].getTime());
      const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setNightNumber(numberOfNights)
      if (numberOfNights === 0) {
         setNightNumber(1)
      }
   };
   const handleBooking = async (values) => {
      if (!localStorage.getItem("user")) {
         navigate("/signin")
      } else {
         const data = await apiBooking(values)
         if (data.message === "Thêm mới thành công!") {
            navigate(`/user/${user.id}`)
         }
      }
   }
   useEffect(() => {
      if (values.soLuongKhach && nightNumber) {
         const cal = Number(values.soLuongKhach) * Number(nightNumber) * Number(roomDetail.giaTien) + 50
         setTongTien(cal)
      } else setTongTien(0)
   }, [values.soLuongKhach, nightNumber])
   useEffect(() => {
      getRoomDetail(roomId)
   }, [])
   if (!roomDetail) {
      return <div style={{ hegith: "70vh" }}>
         <Loading />
      </div>
   }
   return (
      <div className={`${style.main} container`}>
         <div className={`d-flex justify-content-between `}>
            <div className={`${style.detail} `}>
               <div className={`${style.show} `}>
                  <div className={`w-100 `}>
                     <Swiper
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}>
                        <SwiperSlide><img className={style.img} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.img} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.img} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.img} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.img} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.img} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.img} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.img} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.img} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                     </Swiper>
                     <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={5}
                        watchSlidesProgress={true}
                        freeMode={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                     >
                        <SwiperSlide><img className={style.imgThumb} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.imgThumb} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.imgThumb} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.imgThumb} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.imgThumb} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.imgThumb} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.imgThumb} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.imgThumb} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                        <SwiperSlide><img className={style.imgThumb} src={roomDetail.hinhAnh} alt="" /> </SwiperSlide>
                     </Swiper>
                  </div>
               </div>
               <div className={`${style.info} `}>
                  <h4>Thông tin</h4>
                  <p>{roomDetail.phongNgu} phòng ngủ . {roomDetail.phongTam} phòng tắm . {roomDetail.khach} khách</p>
                  <p> <b>Địa chỉ:</b> {roomDetail.tenViTri}, {roomDetail.tinhThanh}, {roomDetail.quocGia}</p>
                  <p><b>Mô tả:</b> {roomDetail.moTa}</p>
                  <div className={`${style.utilities} `}>
                     <p className={style.title}><b>Tiện ích: </b></p>
                     {roomDetail.wifi && <div className={style.item}>
                        <Icon className={style.myIcon} nameIcon="wifi" width={32} height={32} />
                        <p>Wifi</p>
                     </div>}
                     {roomDetail.dieuHoa && <div className={style.item}>
                        <Icon className={style.myIcon} nameIcon="air-conditioner" width={32} height={32} />
                        <p>Điều hòa</p>
                     </div>}
                     {roomDetail.doXe && <div className={style.item}>
                        <Icon className={style.myIcon} nameIcon="parking" width={32} height={32} />
                        <p>Bãi đỗ xe</p>
                     </div>}
                     {roomDetail.tivi && <div className={style.item}>
                        <Icon className={style.myIcon} nameIcon="tv" width={32} height={32} />
                        <p>TV</p>
                     </div>}
                     {roomDetail.hoBoi && <div className={style.item}>
                        <Icon className={style.myIcon} nameIcon="pool" width={32} height={32} />
                        <p>Hồ bơi</p>
                     </div>}
                     {roomDetail.banUi && <div className={style.item}>
                        <Icon className={style.myIcon} nameIcon="iron" width={32} height={32} />
                        <p>Bàn là</p>
                     </div>}
                     {roomDetail.bep && <div className={style.item}>
                        <Icon className={style.myIcon} nameIcon="kitchen" width={32} height={32} />
                        <p>Bếp</p>
                     </div>}
                  </div>
               </div>
               <div className={`${style.cover} `}>
                  <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="" />
                  <p>Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ nhà hủy, thông tin nhà/phòng cho thuê không chính xác và những vấn đề khác như sự cố trong quá trình nhận phòng.</p>
                  <a className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'>Tìm hiểu thêm</a>
               </div>
            </div>
            <div className={`${style.booking} `}>
               <h3 className='mb-3'>{roomDetail.tenPhong}</h3>
               <p className='m-0'><b>Giá phòng: </b><span className={style.price}>{roomDetail.giaTien}</span>$/đêm</p>
               <p className='mt-3 mb-1'><b>Nhận phòng - Trả phòng: </b></p>
               <DateRangePicker
                  onClean={() => setValues({ ...values, ngayDi: null, ngayDen: null })}
                  className={`${style.datePicker} mb-4`}
                  appearance='subtle'
                  disabledDate={beforeToday()}
                  onChange={handleDateChange}
                  value={[values.ngayDi, values.ngayDen]}
                  placeholder="Check in ~ Check out"
                  format='dd/MM/yyyy' character=" ~ ">
               </DateRangePicker>
               <div className='d-flex  align-items-center'>
                  <p className=' me-4 mb-0 '><b>Số lượng khách: </b></p>
                  <button disabled={values.soLuongKhach === 0} onClick={() => setValues({ ...values, soLuongKhach: values.soLuongKhach - 1 })} type="button" class="px-3 ms-5 btn btn-outline-dark"><b>-</b></button>
                  <p className='mb-0 mx-4'>{values.soLuongKhach}</p>
                  <button disabled={values.soLuongKhach === 15} onClick={() => setValues({ ...values, soLuongKhach: values.soLuongKhach + 1 })} type="button" class=" px-3 btn btn-outline-dark"><b>+</b></button>
               </div>
               <button disabled={!tongTien} onClick={() => handleBooking(values)} className={` ${style.btn} btn w-100 my-4`} >Đặt phòng</button>
               <div className={`${style.total} row`}>
                  <div className="col-6">
                     <p>{roomDetail.giaTien}$ x {nightNumber}đêm</p>
                     <p>Số lượng khách</p>
                     <p>Phí dịch vụ</p>
                     <h4>Tổng:</h4>
                  </div>
                  <div className="col-6 text-end">
                     <p>{Number(roomDetail.giaTien) * Number(nightNumber)}$</p>
                     <p>{values.soLuongKhach} </p>
                     <p>50$</p>
                     <h4>{tongTien}$</h4>
                  </div>
               </div>
            </div>
         </div>
         <hr />
         {/* <Comment></Comment> */}
      </div >
   )
}

export default RoomDetail
