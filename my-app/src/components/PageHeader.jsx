import React from 'react'
import styles from '../styles/PageHeader.module.css'
export default function PageHeader(props) {
  

  return (
    <div className={styles.row}>
      {/* 标题 */}
      <div className={styles.pageHeader}>
        {props.title}
      </div>
      {/* 分类 */}
      {props.children}
    </div>
  )
}
