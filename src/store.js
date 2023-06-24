import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.js'
import roomReducer from './slices/roomSlice.js'


const store = configureStore({
   reducer:{
      user:userReducer,
      room: roomReducer,
   }
})

export default store