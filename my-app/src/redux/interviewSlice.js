import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getInterviewTitle } from '../api/interview'
export const getTitles = createAsyncThunk('interview/getInterviewTitle',
    async (_,thunkApi)=>{
        const res = await getInterviewTitle()
        // console.log(res.data)
        thunkApi.dispatch(initInterviewList(res.data))
    }
)
export const interviewSlice = createSlice({
    name:'interview',
    initialState:{
        interviewList:[]
    },
    reducers:{
        initInterviewList:(state,{payload})=>{
            state.interviewList = payload
        }
    }
})
export default interviewSlice.reducer
export const {initInterviewList} = interviewSlice.actions