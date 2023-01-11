import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getIssueById } from '../api/issue'
import PageHeader from '../components/PageHeader'
import Recommend from '../components/Recommend'
import RankList from '../components/RankList'
import styles from '../styles/IssueDetail.module.css'
import {Avatar} from 'antd'
import { formatDate } from '../utils/tools'
import { getUserById } from '../api/user'
import Discuss from '../components/Discuss'
/**
 * 问答细节界面
 */
export default function IssueDetail() {
    const { id } = useParams()
    const [issueInfo,setIssueInfo] = useState(null)
    const [userInfo,setUserInfo] = useState(null)
    useEffect(() => {
        async function fetchData() {
            const {data} = await getIssueById(id)
            setIssueInfo(data)
            const res = await getUserById(data.userId)
            setUserInfo(res.data)
        }
        fetchData()
    }, [id])
    return (
        <div className={styles.container}>
            <PageHeader title="问题详情" />
            <div className={styles.detailContainer}>
                {/* 左侧 */}
                <div className={styles.leftSide}>
                    {/* 左上方：问答详情 */}
                    <div className={styles.question}>
                        {/* 标题 */}
                        <h1>{issueInfo?.issueTitle}</h1>
                        {/* 提问人信息：头像、昵称、提问时间 */}
                        <div className={styles.questioner}>
                            <Avatar size="small" src={userInfo?.avatar}/>
                            <span className={styles.user}>{userInfo?.nickname}</span>
                            <span>发布于：{formatDate(issueInfo?.issueDate)}</span>
                        </div>
                        {/* 问题详情 */}
                        <div className={styles.content}>
                            <div dangerouslySetInnerHTML={{ __html: issueInfo?.issueContent }}></div>
                        </div>
                    </div>
                    {/* 左下方：评论 */}
                    <Discuss issueId={issueInfo?._id} commentType={1} issueInfo={issueInfo}></Discuss>
                </div>
                {/* 右侧 */}
                <div className={styles.rightSide}>
                    <div style={{ marginBottom: 20 }}>
                        <Recommend />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <RankList />
                    </div>
                </div>
            </div>
        </div>
    )
}
