import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTypeList } from '../redux/typeSlice'
import { Tag } from 'antd'
import { updateType } from '../redux/typeSlice'
export default function TypeSelector() {
    //获取所有分类
    const { typeList } = useSelector(state => {
        return state.type
    })
    const dispatch = useDispatch()
    const colorArr = ["magenta", "red", "cyan", "green", "orange", "blue", "gold", "purple"]//颜色数组
    const [typeSelect, setTypeSelect] = useState([])
    /**
     * 标签点击处理函数
     * @param {*} typeId 点击的标签的id
     */
    function handleClick(typeId) {
        //如果当前的页面时issue页面
        if (window.location.pathname === '/issues') {
            dispatch(updateType({ type: 'issueType', value: typeId }))
        }
        //如果当前的页面时book页面
        if (window.location.pathname === '/book') {
            dispatch(updateType({ type: 'bookType', value: typeId }))
        }
    }
    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList())
        }
        if (typeList.length) {
            let arr = []
            arr.push(<Tag
                style={{ cursor: 'pointer' }}
                key='all'
                value='all'
                color='volcano'
                onClick={() => { handleClick('all') }}>
                全部
            </Tag>)
            for (let i = 0; i < typeList.length; i++) {
                arr.push(<Tag style={{ cursor: 'pointer' }}
                    key={typeList[i]._id} value={typeList[i]._id}
                    color={colorArr[typeList.indexOf(typeList[i]) % colorArr.length]}
                    onClick={() => {
                        handleClick(typeList[i]._id)
                    }}>
                    {typeList[i].typeName}
                </Tag>)
                // console.log(typeList[i])
            }
            setTypeSelect(arr)
        }
    }, [typeList.length, dispatch])
    return (
        <div>
            {typeSelect}
        </div>
    )
}
