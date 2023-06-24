import React from 'react'
import style from '../Sign.module.scss'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../../../slices/userSlice'
function SignIn() {
      const dispatch = useDispatch()
      const navigate = useNavigate()
      //Lấy biến state user từ store
      const { isLoading, error, user } = useSelector((state) => state.user)
      //Hàm chuyển hướng về trang Sign up
      const handleToSignUp = () => {
            navigate("/signup")
      }
      //Use Form
      const { register, handleSubmit } = useForm({
            defaultValues: {
                  email: "",
                  password: "",
            },
            mode: 'onTouched',
      })
      const onSubmit = (values) => {
            dispatch(signin(values));
      }
      const onError = (error) => {
            console.log(error);
      }
      if (user) {
            return <Navigate to='/'></Navigate>
      }
      return (
            <div className={`${style.card} card`}>
                  <div className={style.navbar}>
                        <div onClick={()=>navigate("/")} className={style.imgBox}>
                              <img className='w-100 d-block' src="./img/navbar-logo.png" alt="logo" />
                        </div>
                        <h2>Đăng nhập</h2>
                  </div>
                  <form className={style.form} onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className={`input-group ${style.gr}`} >
                              <span className={` input-group-text ${style.text}`}>Email</span>
                              <input {...register("email")} type='email' className={` rounded-end form-control `} placeholder="Nhập email" />
                        </div>
                        <div className={`input-group ${style.gr}`} >
                              <span className={`input-group-text ${style.text} `}>Mật khẩu</span>
                              <input {...register("password")} type='password' className={`rounded-end form-control `} placeholder="Nhập mật khẩu" />
                        </div>
                        {error && <p className='alert alert-danger'>{error}</p>}
                        <button disabled={isLoading} className='btn ms-auto d-block '>Đăng nhập</button>
                  </form>
                  <div className={style.navigate}>
                        <p disabled={isLoading} onClick={handleToSignUp}>Bạn chưa có tài khoản? Đăng ký</p>
                  </div>
            </div>
      )
}

export default SignIn