import React from 'react'
import styles from '../styles/IssueItem.module.css'
import { formatDate } from '../utils/tools'
import { Tag } from 'antd'
import { useEffect, useState } from 'react'
import { getUserById } from '../api/user'
//渲染问答列表的每一项的组件
export default function IssueItem(props) {
    const colorArr = ["magenta", "red", "cyan", "green", "orange", "blue", "gold", "purple"]//颜色数组
    const type = props.typeList.find(item => {
        return item._id === props.issueData.typeId
    })
    const [userInfo, setUserInfo] = useState({})
    //个人感觉这里有个性能优化点 可以把请求放到外层，减少请求数量
    useEffect(() => {
        async function fetchData(){
          const {data} = await getUserById(props.issueData.userId)
            setUserInfo(data)
        }
        fetchData()
    }, [])
    return (
        <div className={styles.container}>
            {/* 回答数 */}
            <div className={styles.issueNum}>
                <div>{props.issueData.commentNumber}</div>
                <div>回答</div>
            </div>
            {/* 浏览数 */}
            <div className={styles.issueNum}>
                <div>{props.issueData.scanNumber}</div>
                <div>浏览</div>
            </div>
            {/* 问题内容 */}
            <div className={styles.issueContainer}>
                <div className={styles.top}>{props.issueData.issueTitle}</div>
                <div className={styles.bottom}>
                    <div className={styles.left}>
                        <Tag color={colorArr[props.typeList.indexOf(type) % colorArr.length]}>{type?.typeName}</Tag>
                    </div>
                    <div className={styles.right}>
                        <Tag color='geekblue'>{userInfo?.nickname}</Tag>
                        <span>{formatDate(props.issueData.issueDate, 'year')}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
