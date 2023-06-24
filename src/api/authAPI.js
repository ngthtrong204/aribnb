import axiosClient from "./axiosClient";

export const apiSignup = async (values) => {
   const { data } = await axiosClient.post("auth/signup", values);
   return data;
};
export const apiSignin = async (values) => {
   const { data } = await axiosClient.post("auth/signin", values);
   return data;
};