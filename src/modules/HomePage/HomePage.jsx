import React, { useEffect } from 'react'
import style from './HomePage.module.scss'
import { Rate } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomListDefault, selectedAddress } from '../../slices/roomSlice'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //Biến state roomList từ store
  const { isLoading, roomList } = useSelector((state) => state.room)
  const handleOnClickItem = (id) => {
    dispatch(selectedAddress(null))
    navigate(`room/${id}`)
  }
  const { idViTri } = useSelector((state) => state.room)

  useEffect(() => {
    if (!idViTri) {

      dispatch(getRoomListDefault());
    }
  }, []);
  if (isLoading) {
    return <div style={{height:"60vh"}}>
      <Loading />
    </div>
  }
  return (
    <div className="container my-5">
      <div className='row '>

        {roomList && roomList.map((item) => {
          return <div key={item.id} className={`col-3 ${style.item}`}>
            <div onClick={() => handleOnClickItem(item.id)} className={`card ${style.myCard} `} style={{ width: '18rem' }}>
              <img className='img-card-top' src={item.hinhAnh} alt="" />
              <div className="card-body">
                <h5 className={`card-title ${style.title}`}>{item.tenPhong}</h5>
                <p className={`card-text ${style.moTa}`}>{item.moTa}</p>
                <div className={style.RaP}>
                  <Rate readOnly defaultValue={2.5} allowHalf></Rate>
                  <p className={`${style.price} m-0 `}>${item.giaTien}</p>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default HomePage