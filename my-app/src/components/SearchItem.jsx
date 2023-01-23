import React, { useEffect } from 'react'
import IssueItem from './IssueItem'
import { useDispatch, useSelector } from 'react-redux'
import { getTypeList } from '../redux/typeSlice'
import BookSearch from './BookSearch'
//搜索组件
export default function SearchItem(props) {
    const dispatch = useDispatch()
    //仓库获取分类列表
    const { typeList } = useSelector((state) => {
        return state.type
    })
    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList())
        }
    }, [])
    // console.log(props.itemInfo, '123')
    let searchList = null
    if (props.itemInfo.bookTitle) {
        console.log('bookTitle')
        searchList = <BookSearch bookInfo={props.itemInfo}></BookSearch>


    }
    else if (props.itemInfo.issueTitle) {
        console.log('issueTitle')
        searchList = <IssueItem issueData={props.itemInfo} typeList={typeList}></IssueItem>
    }
    return (
        <div>
            {
                searchList
            }
        </div>
    )
}
