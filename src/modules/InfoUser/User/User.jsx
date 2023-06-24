import React, { useState } from 'react'
import style from './User.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { apiUploadAvatar } from '../../../api/userAPI'
import { getUser } from '../../../slices/userSlice'
import { useParams } from 'react-router-dom'
function User() {
   const [title, setTitle] = useState(null)
   const dispatch = useDispatch()
   const { userId } = useParams()
   const [fileAvt, setFileAvt] = useState(null)
   const { user } = useSelector((state) => state.user)
   console.log(user);
   const handleSelectFile = (event) => {
      event.preventDefault()
      const file = event.target.files[0]
      setFileAvt(file)
   }
   const handleUploadAvatar = async (fileAvt) => {
      try {
         const data = await apiUploadAvatar(fileAvt)
         dispatch(getUser(userId))
      } catch (error) {
         console.log(error);
      }
   }
   const handleShowModal = (title) => {
      switch (title) {
         case "name":
            setTitle("tên")
            break;
         case "email":
            setTitle("email")
            break;
         case "phone":
            setTitle("số điện thoại")
            break;
         case "birthDay":
            setTitle("ngày sinh")
            break;
         case "gender":
            setTitle("giới tính")
            break;
         default:
            break;
      }
   }





   if (!user) {
      return
   }
   return (
      <div className='col-6'>
         <div className={style.img}>
            {user.avatar ? <img src={user.avatar} alt="avatar" className="" /> : <img src="https://i.pinimg.com/originals/78/33/ff/7833ff86244afcffb7953982047ee1d3.jpg" alt="avatar" className="" />}
            <button className=' d-block my-3 btn-outline-dark btn mx-auto' data-bs-toggle="modal" data-bs-target="#exampleModal">Cập nhật ảnh</button>
            <div>
               {/* Modal */}
               <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h1 className="modal-title fs-5" id="exampleModalLabel">Upload File Avatar</h1>
                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                           <input type="file" onChange={handleSelectFile} />
                        </div>
                        <div className="modal-footer">
                           <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                           <button onClick={() => handleUploadAvatar(fileAvt)} type="button" className="btn btn-primary">Upload</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div>
            <table className='table'>
               <tbody>
                  <tr>
                     <td>
                        <h5>Tên</h5>
                        <p>{user.name}</p>
                     </td>
                     <td className=' text-end  '>
                        <button
                           onClick={() => { handleShowModal("name") }}
                           data-bs-toggle="modal"
                           data-bs-target="#inputUser"
                           className="my-auto btn-outline-dark btn"
                        >Cập nhật</button>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <h5>Email</h5>
                        <p>{user.email}</p>
                     </td>
                     <td className=' text-end  '>
                        <button
                           onClick={() => { handleShowModal("email") }}
                           data-bs-toggle="modal"
                           data-bs-target="#inputUser"
                           className="my-auto btn-outline-dark btn"
                        >Cập nhật</button>
                     </td>
                  </tr>
                  <tr>
                     <td >
                        <h5>Số điện thoại</h5>
                        <p>{user.phone}</p>
                     </td>
                     <td className=' text-end  '>
                        <button
                           onClick={() => { handleShowModal("phone") }}
                           data-bs-toggle="modal"
                           data-bs-target="#inputUser"
                           className="my-auto btn-outline-dark btn"
                        >Cập nhật</button>
                     </td>
                  </tr>
                  <tr>
                     <td >
                        <h5>Ngày sinh</h5>
                        <p>{user.birthday}</p>
                     </td>
                     <td className=' text-end  '>
                        <button
                           onClick={() => { handleShowModal("birthDay") }}
                           data-bs-toggle="modal"
                           data-bs-target="#inputUser"
                           className="my-auto btn-outline-dark btn"
                        >Cập nhật</button>
                     </td>
                  </tr>
                  <tr>
                     <td >
                        <h5>Giới tính</h5>
                        <p>Nam</p>
                     </td>
                     <td className=' text-end  '>
                        <button
                           onClick={() => { handleShowModal("gender") }}
                           data-bs-toggle="modal"
                           data-bs-target="#inputUser"
                           className="my-auto btn-outline-dark btn"
                        >Cập nhật</button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div>
            <div className="modal fade" id="inputUser" tabIndex={-1} aria-labelledby="inputUserLabel" aria-hidden="true">
               <div className="modal-dialog">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h1 className="modal-title fs-5" id="inputUserLabel">Nhập {title} mới </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                     </div>
                     <div className="modal-body">
                        <input type="text" />
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button  type="button" className="btn btn-primary">update</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default User