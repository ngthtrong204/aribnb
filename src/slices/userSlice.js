import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSignin, apiSignup } from "../api/authAPI";
import { apiGetUserById } from "../api/userAPI";

export const signup = createAsyncThunk("user/signup", async (values) => {
   try {
      const data = await apiSignup(values)
      return data?.content
   } catch (error) {
      throw error.response?.data?.content
   }
})
export const signin = createAsyncThunk("user/signin", async (values) => {
   try {
      const data = await apiSignin(values)
      localStorage.setItem("user", JSON.stringify(data.content.user))
      localStorage.setItem("token", JSON.stringify(data.content.token))
      return data?.content?.user
   } catch (error) {
      throw error.response?.data?.content
   }
})
export const getUser = createAsyncThunk("user/get", async (id) => {
   try {
      const data = await apiGetUserById(id)
      localStorage.setItem("user", JSON.stringify(data.content))
      return data?.content
   } catch (error) {
      throw error.response?.data?.content
   }
})
const initialState = {
   user: JSON.parse(localStorage.getItem("user")) || null,
   isLoading: false,
   error: null,
   signUpDone: false,
}
const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      signout: (state, action) => {
         localStorage.removeItem("user")
         localStorage.removeItem("token")
         return { ...state, user: null, signUpDone: false }
      }
   },
   extraReducers: (build) => {
      // case for sign up
      build.addCase(signup.pending, (state) => {
         return { ...state, isLoading: true, error: null, signUpDone: false }
      })
         .addCase(signup.fulfilled, (state, action) => {
            return { ...state, isLoading: false, signUpDone: true }
         })
         .addCase(signup.rejected, (state, action) => {
            return { ...state, isLoading: false, error: action.error.message }
         });
      // case for sign in
      build.addCase(signin.pending, (state) => {
         return { ...state, isLoading: true, error: null }
      })
         .addCase(signin.fulfilled, (state, action) => {
            return { ...state, isLoading: false, user: action.payload }
         })
         .addCase(signin.rejected, (state, action) => {
            return { ...state, isLoading: false, error: action.error.message }
         });
      build.addCase(getUser.pending, (state) => {
         return { ...state, isLoading: true, error: null }
      })
         .addCase(getUser.fulfilled, (state, action) => {
            return { ...state, isLoading: false, user: action.payload }
         })
         .addCase(getUser.rejected, (state, action) => {
            return { ...state, isLoading: false, error: action.error.message }
         });
   },
})
export const { signout } = userSlice.actions
export default userSlice.reducer