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
        //类型数组
        typeList: [],
        bookType:'all',
        issueType:'all'
    },
    reducers: {
        initTypeList:(state,{payload})=>{
            state.typeList = payload
        },
        /**
         * 更改书籍或者问答的类型
         * @param {*} state 
         * @param {*} param1 payload:{type:bookType,value:'xxx'}
         */
        updateType:(state,{payload})=>{
            state[payload.type] = payload.value
        }
    }
})
export default typeSlice.reducer
export const {initTypeList,updateType}  = typeSlice.actions