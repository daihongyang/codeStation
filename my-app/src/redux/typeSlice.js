import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTypes } from '../api/type'
export const getTypeList = createAsyncThunk('type/getTypeList',
    async (_, thunkApi) => {
        const res = await getTypes()
        // console.log(res.data)
        thunkApi.dispatch(initTypeList(res.data))
    }
)
export const typeSlice = createSlice({
    name: 'type',
    initialState: {
        typeList: []//类型数组
    },
    reducers: {
        initTypeList:(state,{payload})=>{
            state.typeList = payload
        }
    }
})
export default typeSlice.reducer
export const {initTypeList}  = typeSlice.actions