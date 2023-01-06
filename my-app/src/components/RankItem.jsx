import React from 'react'
import styles from '../styles/ScoreItem.module.css'
import { Avatar } from 'antd'
export default function RankItem(props) {
    let rankNum = null
    switch (props.rank) {
        case 1:
            rankNum = (
                <div style={{ color: '#ffda23', fontSize: '22px' }} className='iconfont icon-jiangbei'></div>
            )
            break;
        case 2:
            rankNum = (
                <div style={{ color: '#c5c5c5', fontSize: '22px' }} className='iconfont icon-jiangbei'></div>
            )
            break;
        case 3:
            rankNum = (
                <div style={{ color: '#cd9a62', fontSize: '22px' }} className='iconfont icon-jiangbei'></div>
            )
            break
        default:
            rankNum = (<div className={styles.rank}>
                {props.rank}
            </div>)
            break;
    }

    return (
        <div className={styles.container}>
            {/* 排名头像昵称 */}
            <div className={styles.left}>
                {rankNum}
                <div className={styles.avatar}>
                    <Avatar size='small' src={props.rankInfo.avatar}></Avatar>
                </div>
                {props.rankInfo.nickname}
            </div>
            {/* 积分 */}
            <div className={styles.right}>
                {props.rankInfo.points}
            </div>
        </div>
    )
}
