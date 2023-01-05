import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Popover, List, Avatar, message } from 'antd'
import styles from '../styles/LoginAvatar.module.css'
import { changeUserStatus, initUserInfo } from '../redux/userSlice'
export default function LoginAvatar(props) {
    const dispatch = useDispatch()
    const { isLogin, userInfo } = useSelector(state => {
        return state.user
    })//从仓库获得登录状态
    let showContent = null//最终要显示的内容
    function handleListClick(item) {
        if (item === '个人中心') {
            //进入个人中心
        }
        else {
            //退出登录
            localStorage.removeItem('userToken')
            // 清空
            dispatch(initUserInfo({}))
            dispatch(changeUserStatus(false))
            message.success('退出成功')
        }
    }
    if (isLogin) {
        const content = (<List
            dataSource={['个人中心', '退出登录']}
            size='large'
            renderItem={item => (
                <List.Item onClick={() => { handleListClick(item) }} style={{ cursor: 'pointer' }}>
                    {item}
                </List.Item>
            )}
        />)
        //如果登录了显示头像
        showContent = (<Popover content={content} placement='bottom' >
            <div className={styles.avatarContainer}>
                <Avatar src={userInfo?.avatar} size='large' style={{ cursor: 'pointer' }} />
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
