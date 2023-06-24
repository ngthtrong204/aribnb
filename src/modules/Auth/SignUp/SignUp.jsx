import React, { useRef, useState } from 'react'
import style from '../Sign.module.scss'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Form } from 'rsuite'
import { signup } from '../../../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const schema = yup.object({
   name: yup.string().required("Họ tên không được để trống"),
   phone: yup.string().required("SĐT không được để trống"),
   email: yup
      .string()
      .required("Email khoản không được để trống")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email không hợp lệ"),
   password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Mật khẩu phải có ít nhất 8 ký tự, 1 ký tự hoa, 1 ký tự thường, 1 ký tự số"),
})



function SignUp() {
   const dispatch =useDispatch()
   const navigate = useNavigate()
   //Lấy biến state của user từ store
   const { isLoading, error, signUpDone } = useSelector(state => state.user)
   //Biến chứa thông báo nhập lại mật khẩu
   const [rePwMessage, setRePwMessage] = useState(false)
   //Hàm chuyển hướng về trang đăng nhập
   const handleToSignIn = () => {
      navigate("/signin")
   }
   //Use Form
   const { register, handleSubmit, formState: { errors: variable } } = useForm({
      defaultValues: {
         name: "",
         phone: "",
         email: "",
         password: "",
         birthday: "",
         avatar: "",
      },
      mode: 'onTouched',
      resolver: yupResolver(schema)
   })
   //Hàm lưu giá trị password
   const rePassword = useRef()
   const onSubmit = (values) => {
      if (values.password === rePassword.current.value) {
         setRePwMessage(false)
         dispatch(signup(values));  
      } else {
         setRePwMessage(true)
      }
   }

   const onError = (errors) => {
      console.log(errors);
   }
   if (signUpDone) {
      return <Navigate to="/signin"></Navigate>
   }


   return (
      <div className={`${style.card} card`}>
         <div className={style.navbar}>
            <div onClick={()=>navigate("/")} className={style.imgBox}>
               <img  className='w-100 d-block' src="./img/navbar-logo.png" alt="logo" />
            </div>
            <h2>Đăng ký</h2>
         </div>
         <form className={style.form} onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={`input-group ${style.gr}`} >
               <span class={`input-group-text ${style.text} `}>Họ tên</span>
               <input  {...register("name")} className={`rounded-end form-control d-block  `} placeholder="Nhập họ tên" />
               {variable.name && <Form.ErrorMessage placement='rightEnd' show >*{variable.name.message}</Form.ErrorMessage>}
            </div>
            <div className={`input-group ${style.gr}`} >
               <span class={`input-group-text ${style.text} `}>Email</span>
               <input {...register("email")} type='email' className={`rounded-end form-control `} placeholder="Nhập email" />
               {variable.email && <Form.ErrorMessage placement='rightEnd' show >*{variable.email.message}</Form.ErrorMessage>}
               {error && <Form.ErrorMessage placement='rightEnd' show >*{error}</Form.ErrorMessage>}
            </div>
            <div className={`input-group ${style.gr}`} >
               <span class={`input-group-text ${style.text} `}>Số điện thoại</span>
               <input {...register("phone")} type='number' className={`rounded-end form-control `} placeholder="Nhập số điện thoại " />
               {variable.phone && <Form.ErrorMessage placement='rightEnd' show >*{variable.phone.message}</Form.ErrorMessage>}
            </div>
            <div className={`input-group  ${style.gr}`} >
               <input {...register("password")} type='password' className={`rounded-end form-control `} placeholder="Nhập mật khẩu" />
               {variable.password && <Form.ErrorMessage placement='rightEnd' show >*{variable.password.message}</Form.ErrorMessage>}
            </div>
            <div className={`input-group  ${style.gr}`} >
               <input ref={rePassword} type='password' className={`rounded-end form-control `} placeholder="Nhập lại mật khẩu" />
               {rePwMessage && <Form.ErrorMessage placement='rightEnd' show >*Mật khẩu chưa trùng khớp</Form.ErrorMessage>}
            </div>
            <button disabled={isLoading} className='btn ms-auto d-block '>Đăng ký</button>
         </form>
         <div className={style.navigate}>
            <p disabled={isLoading} onClick={handleToSignIn}>Bạn đã có tài khoản? Đăng nhập</p>
         </div>
      </div>
   )
}

export default SignUp