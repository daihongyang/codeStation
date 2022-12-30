import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,//是否登录 默认false未登录
    userInfo:{}//用户信息
  },
  reducers: {
    initUserInfo:(state,{payload})=>{
        state.userInfo = payload
    }
  },
})

export const { initUserInfo } = counterSlice.actions

export default counterSlice.reducer