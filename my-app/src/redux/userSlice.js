import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateUserInfo } from '../api/user'
/**
 * 派发更新
 */
export const updateUserToNewInfo = createAsyncThunk('user/updateUserToNewInfo',
/**
 * 更新用户的仓库数据以及云端数据
 * @param {*} payload {userId:用户的id，newInfo:{key:value}}
 * @param {*} thunkApi 
 */  
async (payload, thunkApi) => {
    await updateUserInfo(payload.userId, payload.newInfo)
    thunkApi.dispatch(updateUser(payload.newInfo))
  }
)


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,//是否登录 默认false未登录
    userInfo: {}//当前用户信息
  },
  reducers: {
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload
    },
    /**
     * 更改用户登录状态的派发
     * @param {*} state 仓库数据
     * @param {Boolean} param1 true为登录 false为未登录 
     */
    changeUserStatus: (state, { payload }) => {
      state.isLogin = payload
    },
    updateUser: (state, { payload }) => {
      for (let key in payload) {
        state.userInfo[key] = payload[key]
      }
    }
  },
})

export const { initUserInfo, changeUserStatus, updateUser } = userSlice.actions

export default userSlice.reducer