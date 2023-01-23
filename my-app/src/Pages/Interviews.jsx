import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTitles } from '../redux/interviewSlice'
import { getTypeList } from '../redux/typeSlice'
import PageHeader from '../components/PageHeader'
import styles from '../styles/Interview.module.css'
import { Tree, BackTop } from 'antd'
import { getInterviewById } from '../api/interview'
export default function Interviews() {
  const dispatch = useDispatch()
  const { interviewList } = useSelector((state) => {
    return state.interview
  })
  const { typeList } = useSelector((state) => {
    return state.type
  })
  const [treeData, setTreeData] = useState([])//分类树形结构
  const [interviewInfo, setInterviewInfo] = useState({})//面试题具体内容
  useEffect(() => {
    if (!interviewList.length) {
      //如果没有面试题标题数组
      dispatch(getTitles())
    }
    if (!typeList.length) {
      //如果没有分类数组
      dispatch(getTypeList())
    }
    /**
     * 标题点击函数
     * @param {*} id 面试题的id
     */
    async function handleTitleClick(id) {
      const res = await getInterviewById(id)
      console.log(res.data)
      setInterviewInfo(res.data)
    }

    if (typeList.length && interviewList.length) {
      let arr = []
      for (let i = 0; i < typeList.length; i++) {
        arr.push({
          title: <h3 >
            {typeList[i].typeName}
          </h3>,
          key: i
        })
      }

      for (let i = 0; i < interviewList.length; i++) {
        let childArr = []
        for (let j = 0; j < interviewList[i].length; j++) {
          childArr.push({
            title: <h4 onClick={() => {
              handleTitleClick(interviewList[i][j]._id)
            }}>
              {
                interviewList[i][j].interviewTitle
              }
            </h4>,
            key: `${i}-${j}`
          })
          // console.log(childArr,'children')
          arr[i].children = childArr
        }
      }
      if (arr.length) {
        setTreeData(arr)
      }

    }
  }, [typeList, interviewList])
  let interview = null
  if (interviewInfo) {
    //如果有内容
    interview = <div className={styles.content}>
      <h1 className={styles.interviewRightTitle}>{interviewInfo?.interviewTitle}</h1>
      <div className={styles.contentContainer}>
        <div dangerouslySetInnerHTML={{ __html: interviewInfo?.interviewContent }}></div>
      </div>
    </div>
  }
  else {
    interview = <div style={{
      textAlign: 'center',
      fontSize: '40px',
      fontWeight: '100',
      marginTop: '150px'
    }}>积极复习，冲击大厂!</div>
  }
  return (
    <div className={styles.container}>
      <PageHeader title='面试题大全'></PageHeader>
      <div className={styles.interviewContainer}>
        <div className={styles.leftSide}>
          {/* 左侧存放目录 */}
          <Tree treeData={treeData}></Tree>
        </div>
        <div className={styles.rightSide}>
          {/* 右侧存放具体面试题信息 */}
          {interview}
        </div>
        <BackTop/>
      </div>
    </div>
  )
}
