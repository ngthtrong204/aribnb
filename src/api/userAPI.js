import axiosClient from "./axiosClient";

export const apiUploadAvatar = async (fileAvt) => {
   const formData = new FormData();
   formData.append("avatar", fileAvt)
   const token = JSON.parse(localStorage.getItem("token"));
   const data = await axiosClient.post(`users/upload-avatar`, formData, {
      headers: {
         token,
      },
   })
   return data
}

export const apiGetUserById = async (id) => {
   const { data } = await axiosClient.get(`user/${id}`)
   return data.content
}