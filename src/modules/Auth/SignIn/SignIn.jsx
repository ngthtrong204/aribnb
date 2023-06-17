import React from 'react'
import style from '../Sign.module.scss'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
function SignIn() {
      const navigate = useNavigate()
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
            console.log(values);
      }
      const onError = (error) => {
            console.log(error);
      }
      return (
            <div className={`${style.card} card`}>
                  <div className={style.navbar}>
                        <div className={style.imgBox}>
                              <img className='w-100 d-block' src="./img/navbar-logo.png" alt="logo" />
                        </div>
                        <h2>Đăng nhập</h2>
                  </div>
                  <form className={style.form} onSubmit={handleSubmit(onSubmit, onError)}>

                        <div className={`input-group ${style.gr}`} >
                              <span class={` input-group-text ${style.text}`}>Email</span>
                              <input {...register("email")} type='email' className={` rounded-end form-control `} placeholder="Nhập email" />
                        </div>

                        <div className={`input-group ${style.gr}`} >
                              <span class={`input-group-text ${style.text} `}>Mật khẩu</span>

                              <input {...register("password")} type='password' className={`rounded-end form-control `} placeholder="Nhập mật khẩu" />
                        </div>


                        <button className='btn ms-auto d-block '>Đăng nhập</button>
                  </form>









                  <div className={style.navigate}>
                        <p onClick={handleToSignUp}>Bạn chưa có tài khoản? Đăng ký</p>
                  </div>
            </div>
      )
}

export default SignIn