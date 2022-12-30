import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Popover, List, Avatar } from 'antd'
import styles from '../styles/LoginAvatar.module.css'
export default function LoginAvatar(props) {
    const { isLogin } = useSelector(state => {
        return state.user
    })//从仓库获得登录状态
    let showContent = null//最终要显示的内容
    if (isLogin) {
        const content = (<List
            dataSource={['个人中心', '退出登录']}
            size='large'
            renderItem={item => (
                <List.Item style={{ cursor: 'pointer' }}>
                    {item}
                </List.Item>
            )}
        />)
        //如果登录了显示头像
        showContent = (<Popover content={content} placement='bottom' >
            <div className={styles.avatarContainer}>
                <Avatar src='' size='large'/>
            </div>
        </Popover >)
    }
    else {
        //如果没登陆显示注册/登录的按钮
        showContent = (
            <Button type="primary" onClick={props.handleModal}>注册/登录</Button>
        )

    }
    return (
        <div>
            {showContent}
        </div>
    )
}
