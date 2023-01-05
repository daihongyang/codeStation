import React from 'react'
import { useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import styles from '../styles/Issue.module.css'
import { getIssuesInfoByPage } from '../api/issue'
import { useState } from 'react'
import IssueItem from '../components/IssueItem'
import { useDispatch, useSelector } from 'react-redux'
import { getTypeList } from '../redux/typeSlice'
export default function Issues() {
  const dispatch = useDispatch()
  //每一页的显示状态
  const [pageInfo, setPageInfo] = useState({
    current: 1,//当前页码数
    pageSize: 15,//当前显示几条数据
    total: 0//一共有几条数据
  })
  //每一页的具体显示信息数据
  const [issueData, setIssueData] = useState([])
  useEffect(() => {
    async function fetchData() {
      const { data } = await getIssuesInfoByPage({
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        issueStatus: true
      })
      setIssueData(data.data)//更改列表数据信息
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.totalPage
      })//更改显示状态
    }
    fetchData()
  }, [pageInfo.current, pageInfo.pageSize])
  const {typeList} = useSelector((state)=>{
    return state.type
  })
  useEffect(()=>{
    if(!typeList.length){
      dispatch(getTypeList())
  }
  },[])
  let issueList = []
  for (let i = 0; i < issueData.length; i++) {
    issueList.push(<IssueItem key={i} issueData={issueData[i]} typeList={typeList}></IssueItem>)

  }





  return (
    <div className={styles.container}>
      {/* 头部 */}
      <PageHeader title='问答列表'></PageHeader>
      <div className={styles.issueContainer}>

        {/* 左边区域--列表 */}
        <div className={styles.leftSide}>
          {/* 这里涉及到请求的数据 */}
          {issueList}
        </div>
        {/* 右边区域--杂项 */}
        <div className={styles.rightSide}></div>
      </div>
    </div>

  )
}
