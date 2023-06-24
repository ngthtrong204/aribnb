import React, { useEffect, useState } from 'react'
import style from "./Trip.module.scss"
import Icon from '../../../components/Icon/Icon'
import { apiBookedList, apiDeleteBooking } from '../../../api/booking'
import { useSelector } from 'react-redux'
import { apiGetRoomInfo } from '../../../api/roomAPI'
import dayjs from 'dayjs'
import { number } from 'yup'
function Trip() {
  const { user } = useSelector((state) => state.user)
  const [dataRoom, setDataRoom] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getBookedList = async (maNguoiDung) => {
    setIsLoading(true)
    const data = await apiBookedList(maNguoiDung)
    const dataRoom = await Promise.all(data.map(async (item) => {
      const dataRoomDetail = await apiGetRoomInfo(item.maPhong)
      return { ...item, ...dataRoomDetail, id: item.id }
    }))
    setDataRoom(dataRoom)
    setIsLoading(false)

  }
  //Hàm tính số đêm 
  const handleCalcNights = (ngayDen, ngayDi) => {
    const day1 = new Date(ngayDen)
    const day2 = new Date(ngayDi)
    const timeDiff = Math.abs(day1.getTime() - day2.getTime());
    const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return numberOfNights
  }
  const handleDeleteBooking = async (id) => {
    setIsLoading(true)
    const data = await apiDeleteBooking(id)
    getBookedList(user.id)
    setIsLoading(false)

  }
  useEffect(() => {
    setIsLoading(true)
    getBookedList(user.id)
    setIsLoading(false)
  }, [])
  if (isLoading) {
    return <h1 className='col-6'>Loading</h1>
  }
  return (
    <div className='col-6'>
      {dataRoom && dataRoom.map((item) => {
        const ngayDi = dayjs(item.ngayDi).format("DD/MM/YYYY")
        const ngayDen = dayjs(item.ngayDen).format("DD/MM/YYYY")
        const numberOfNights = handleCalcNights(item.ngayDen, item.ngayDi)
        return <div className={style.item}>
          <div className={style.img}>
            <img className='w-100 h-100' src={item.hinhAnh} alt="" />
          </div>
          <div className={style.info}>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='pe-2'>
                <h5>{item.tenPhong}</h5>
                <p className='m-0'>{ngayDen} - {ngayDi}</p>
              </div>
              <div>
                <p className='m-0'><span className={style.price}>{Number(item.giaTien) * Number(item.soLuongKhach) * numberOfNights + 50}$</span>/{numberOfNights}đêm</p>
                <p className='m-0'>{item.soLuongKhach} khách</p>
              </div>
            </div>
            <hr />
            <div className='d-flex align-items-center'>
              <button onClick={() => handleDeleteBooking(item.id)} className='btn btn-danger me-3'>Hủy</button>
              {item.wifi && <Icon className={style.myIcon} nameIcon="wifi" width={32} height={32} />}
              {item.dieuHoa && <Icon className={style.myIcon} nameIcon="air-conditioner" width={32} height={32} />}
              {item.doXe && <Icon className={style.myIcon} nameIcon="parking" width={32} height={32} />}
              {item.tivi && <Icon className={style.myIcon} nameIcon="tv" width={32} height={32} />}
              {item.hoBoi && <Icon className={style.myIcon} nameIcon="pool" width={32} height={32} />}
              {item.banUi && <Icon className={style.myIcon} nameIcon="iron" width={32} height={32} />}
              {item.bep && <Icon className={style.myIcon} nameIcon="kitchen" width={32} height={32} />}
            </div>
          </div>
        </div>
      })}



    </div>
  )
}

export default Trip