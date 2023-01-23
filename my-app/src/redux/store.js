import { configureStore } from '@reduxjs/toolkit'
import typeSlice  from './typeSlice'
import userSlice from './userSlice'
import interviewSlice from './interviewSlice'
export default configureStore({
  reducer: {
    user: userSlice,//此处可通过useSelector获取
    type: typeSlice,
    interview: interviewSlice
  },
})