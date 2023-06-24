import React from 'react'
import style from './Footer.module.scss'
function Footer() {
   return (
      <div className="bg-body-tertiary">
         <div className='container  mt-5 py-5' >
            <div className={`${style.main} row `}>
               <div className={`${style.section} col-sm-12 col-md-6 col-lg-3`}>
                  <h5>Hỗ trợ</h5>
                  <a>Trung tâm trợ giúp</a>
                  <a>Thông tin an toàn</a>
                  <a>Air cover</a>
                  <a>Hỗ trợ người khuyết tật</a>
                  <a>Các tùy chọn hủy</a>
                  <a>Biện pháp đối phú với COVID-19 của chúng tôi</a>
               </div>
               <div className={`${style.section} col-sm-12 col-md-6 col-lg-3`}>
                  <h5>Cộng đồng</h5>
                  <a>Airbnb.org: nhà ở cứu trợ</a>
                  <a>Hỗ trợ dân tị nạn</a>
               </div>
               <div className={`${style.section} col-sm-12 col-md-6 col-lg-3`}>
                  <h5>Đón tiếp khách hàng</h5>
                  <a>Air Cover cho chủ nhà</a>
                  <a>Thử đón tiếp khách hàng</a>
                  <a>Truy cập diễn đàn cộng đồng</a>
               </div>
               <div className={`${style.section} col-sm-12 col-md-6 col-lg-3`}>
                  <h5>Airbnb</h5>
                  <a>Trang tin tức</a>
                  <a>Tìm hiểu các tính năng mới</a>
                  <a>Thư ngỏ từ các nhà sáng lập</a>
                  <a>Cơ hội nghề nghiệp</a>
                  <a>Nhà đầu tư</a>
               </div>
            </div>
            <div className='d-flex justify-content-center text-secondary'>
               <p className='m-0'>Copyright © 2023 by ThanhWei</p>
            </div>


         </div>

      </div>
   )
}

export default Footer