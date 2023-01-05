import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,//是否登录 默认false未登录
    userInfo:{}//当前用户信息
  },
  reducers: {
    initUserInfo:(state,{payload})=>{
        state.userInfo = payload
    },
    /**
     * 更改用户登录状态的派发
     * @param {*} state 仓库数据
     * @param {Boolean} param1 true为登录 false为未登录 
     */
    changeUserStatus:(state,{payload})=>{
      state.isLogin = payload
    }
  },
})

export const { initUserInfo,changeUserStatus } = userSlice.actions

export default userSlice.reducer