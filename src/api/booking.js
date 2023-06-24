import axiosClient from "./axiosClient";

export const apiBooking = async (values) => {
   const { data } = await axiosClient.post("dat-phong", values);
   return data
}
export const apiBookedList = async (maNguoiDung) => {
   const { data } = await axiosClient.get(`dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`)
   return data.content
}
export const apiDeleteBooking = async (id) => {
   const { data } = await axiosClient.delete(`dat-phong/${id}`)
   return data
}