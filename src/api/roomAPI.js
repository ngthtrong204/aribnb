import axiosClient from "./axiosClient"
//lấy danh sách vị trí
export const apiLayDanhSachViTri = async () => {
   const { data } = await axiosClient.get("vi-tri")
   return data.content
}
//lấy danh sách dữ liệu các phòng
export const apiGetRoomList = async () => {
   const { data } = await axiosClient.get("phong-thue")
   return data.content
}
//lấy danh sách phòng theo vị trí
export const apiRoomListByAddress = async (maViTri) => {
   const { data } = await axiosClient.get("phong-thue/lay-phong-theo-vi-tri", {
      params: {
         maViTri: maViTri,
      },
   })
   return data.content
}
// lấy dữ liệu chi tiết phòng theo id
export const apiGetRoomInfo = async (id) => {
   const { data } = await axiosClient.get(`phong-thue/${id}`)
   return data.content
}
// lấy dữ liệu vị trí theo id
export const apiGetAddressById = async (id) => {
   const { data } = await axiosClient.get(`vi-tri/${id}`)
   return data.content
}
//