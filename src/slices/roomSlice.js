import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiGetRoomList, apiRoomListByAddress } from "../api/roomAPI"

export const getRoomListDefault = createAsyncThunk("room/default", async () => {
   try {
      const data = await apiGetRoomList()
      return data
   } catch (error) {
      throw error.response?.data?.content
   }
})
export const getRoomListByAddress = createAsyncThunk("room/byAddress", async (maViTri) => {
   try {
      const data = await apiRoomListByAddress(maViTri)
      console.log(maViTri);
      return data
   } catch (error) {
      throw error.response?.data?.content
   }
})
const initialState = {
   roomList: null,
   isLoading: false,
   error: null,
   idViTri: null,

}
const roomSlice = createSlice({
   name: "room",
   initialState,
   reducers: {
      selectedAddress: (state, action) => {
         return { ...state, idViTri:action.payload }
      }
   },
   extraReducers: (build) => {
      //case for full room list
      build.addCase(getRoomListDefault.pending, (state) => {
         return { ...state, isLoading: true, error: null }
      })
         .addCase(getRoomListDefault.fulfilled, (state, action) => {
            return { ...state, isLoading: false, roomList: action.payload }
         })
         .addCase(getRoomListDefault.rejected, (state, action) => {
            return { ...state, isLoading: false, error: action.error.message }
         });
      //cafe  for room list by address
      build.addCase(getRoomListByAddress.pending, (state) => {
         return { ...state, isLoading: true, error: null }
      })
         .addCase(getRoomListByAddress.fulfilled, (state, action) => {
            return { ...state, isLoading: false, roomList: action.payload }
         })
         .addCase(getRoomListByAddress.rejected, (state, action) => {
            return { ...state, isLoading: false, error: action.error.message }
         });
   },
})
export const {selectedAddress} = roomSlice.actions
export default roomSlice.reducer