import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from '../styles/SearchPage.module.css'
import PageHeader from '../components/PageHeader'
import AddIssueBtn from '../components/AddIssueBtn'
import Recommend from '../components/Recommend'
import RankList from '../components/RankList'
import { getIssuesInfoByPage } from '../api/issue'
import { getBooksInfo } from '../api/book'
import SearchItem from '../components/SearchItem'
import { Empty } from 'antd'
/**
 * 查询页组件
 */
export default function SearchPage() {
    const location = useLocation()
    
    const [pageInfo, setPageInfo] = useState({
        current: 1,//当前页码数
        pageSize: 15,//当前显示几条数据
        total: 0//一共有几条数据
    })
   
    //存放搜索结果
    const [searchRes, setSearchRes] = useState([])
    useEffect(() => {
        // console.log(location.state)
        // setSearchRes([])
        async function fetchData(state) {
            let searchParams = {
                current: pageInfo.current,
                pageSize: pageInfo.pageSize,
                issueStatus: true
            }
            if (state.option === 'issues') {
                //搜索问答
                searchParams.issueTitle = state.val
                const res = await getIssuesInfoByPage(searchParams)
                // console.log(res)
                setSearchRes(res.data.data)
                setPageInfo(
                    {
                        current: res.data.currentPage,
                        pageSize: res.data.eachPage,
                        total: res.data.count
                    }
                )
            }
            else if (state.option === 'book') {
                //搜索书籍
                searchParams.bookTitle = state.val
                const res = await getBooksInfo(searchParams)
                // console.log(res)
                setSearchRes(res.data.data)
                setPageInfo(
                    {
                        current: res.data.currentPage,
                        pageSize: res.data.eachPage,
                        total: res.data.count
                    }
                )
            }
        }
        if (location.state) {
            fetchData(location.state)
        }
    }, [location.state, pageInfo.current, pageInfo.pageSize])

    return (
        <div>
            <PageHeader title='查询结果'></PageHeader>
            <div className={styles.searchPageContainer}>
                <div className={styles.leftSide}>
                    {searchRes.length!==0?searchRes.map((item,i) => {
                        return <SearchItem key={i} itemInfo={item}/>
                    }):<Empty style={{marginTop:'100px'}} description='有问题，就来codeStation!'/>}
                </div>
                <div className={styles.rightSide}>
                    <AddIssueBtn></AddIssueBtn>
                    <Recommend></Recommend>
                    <RankList></RankList>
                </div>
            </div>
        </div>
    )
}
